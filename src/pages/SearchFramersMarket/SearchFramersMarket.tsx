import React, { useState, useRef, useEffect } from 'react';
import Drawer from '../../components/Drawer';

// TypeScript interfaces
interface Location {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  apiKey: string;
  defaultCenter?: Location;
  defaultZoom?: number;
}

interface PlacePrediction {
  place: string;
  placeId: string;
  text: {
    text: string;
  };
  structuredFormat?: {
    mainText: {
      text: string;
    };
    secondaryText: {
      text: string;
    };
  };
}

interface AutocompleteSuggestion {
  placePrediction?: PlacePrediction;
}

interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
}

const SearchFramersMarket: React.FC<MapComponentProps> = ({
  apiKey,
  defaultCenter = { lat: 37.7749, lng: -122.4194 }, // San Francisco as default
  defaultZoom = 13
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_MAPS_API_KEY as string || "";

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    return loadGoogleMapsScript();
  }, [googleMapsApiKey]);

  // Initialize the map
  const initializeMap = () => {
    if (mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center: defaultCenter,
        zoom: defaultZoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      };

      const newMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Create initial marker at default center
      const newMarker = new google.maps.Marker({
        position: defaultCenter,
        map: newMap,
        animation: google.maps.Animation.DROP,
      });
      setMarker(newMarker);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setShowSuggestions(true);

    // Debounce the API call
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.length > 1) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchAutocompleteResults(value);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  // Fetch autocomplete suggestions
  const fetchAutocompleteResults = async (input: string) => {
    if (!map) return;
    
    setIsLoading(true);
    
    try {
      const center = map.getCenter();
      if (!center) return;
      
      const lat = center.lat();
      const lng = center.lng();
      
      const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': googleMapsApiKey,
        },
        body: JSON.stringify({
          input,
          locationBias: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng
              },
              radius: 5000.0
            }
          }
        })
      });

      const data: AutocompleteResponse = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle place selection
  const handlePlaceSelect = async (placeId: string) => {
    if (!map) return;
    
    try {
      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        method: 'GET',
        headers: {
          'X-Goog-Api-Key': googleMapsApiKey,
          'X-Goog-FieldMask': 'name,formattedAddress,location'
        }
      });

      const placeData = await response.json();
      
      if (placeData.location) {
        const position = {
          lat: placeData.location.latitude,
          lng: placeData.location.longitude
        };
        
        // Center map on the selected location
        map.setCenter(position);
        map.setZoom(16);
        
        // Update or create a marker
        if (marker) {
          marker.setPosition(position);
        } else {
          const newMarker = new google.maps.Marker({
            position,
            map,
            animation: google.maps.Animation.DROP,
          });
          setMarker(newMarker);
        }
        
        setSelectedPlace(placeData.formattedAddress || placeData.name);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="p-4 bg-white shadow-md z-10 absolute top-4 left-4 w-96 rounded-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a place..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            onFocus={() => setShowSuggestions(true)}
          />
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => {
              if (!suggestion.placePrediction) return null;
              
              const { placeId, text, structuredFormat } = suggestion.placePrediction;
              const displayText = structuredFormat 
                ? `${structuredFormat.mainText.text}, ${structuredFormat.secondaryText.text}` 
                : text.text;
              
              return (
                <li 
                  key={placeId + index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlePlaceSelect(placeId)}
                >
                  {displayText}
                </li>
              );
            })}
          </ul>
        )}
        
        {selectedPlace && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm font-medium">Selected Location:</p>
            <p className="text-sm">{selectedPlace}</p>
          </div>
        )}
      </div>
      
      <div 
        ref={mapRef}
        className="w-full h-full min-h-screen"
      />
       {/* <Drawer/> */}
    </div>

   
  );
};

export default SearchFramersMarket;

// Usage Example:
// <SearchFramersMarket 
//   apiKey="YOUR_GOOGLE_API_KEY" 
//   defaultCenter={{ lat: 37.7749, lng: -122.4194 }} 
//   defaultZoom={13} 
// />