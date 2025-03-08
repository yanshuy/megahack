import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import Drawer from '../../components/Drawer';
import { Link } from 'react-router-dom';
import MarketplaceCard from '@/components/MarketplaceCard';
import { marketplaces } from '@/data/marketplaces';
import { useLocation } from '@/context/LocationContext';
import { accessToken, BASE_URL } from '@/App';


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

interface Marketplace {
  id: string;
  name: string;
  // Add other properties from your marketplace type
}

const SearchFramersMarket: React.FC<MapComponentProps> = ({
  apiKey,
  defaultCenter = { lat: 19.6967, lng: 72.7699 }, // San Francisco as default
  defaultZoom = 13,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [coordinates, setCoordinates] = useState<Location | null>(null);
  const [nearbyMarketplaces, setNearbyMarketplaces] = useState<Marketplace[]>([]);
  const [isLoadingMarketplaces, setIsLoadingMarketplaces] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const googleMapsApiKey = import.meta.env.VITE_MAPS_API_KEY as string || '';

  const {latitude, longitude, text} = useLocation();
  console.log([latitude, longitude, text]);

  // Fetch nearby marketplaces when coordinates change
  useEffect(() => {
    if (coordinates && coordinates.lat !== 0 && coordinates.lng !== 0) {
      fetchNearbyMarketplaces(coordinates);
    }
  }, [coordinates]);

  // Fetch nearby marketplaces function
  const fetchNearbyMarketplaces = async (position: Location) => {
    if (position.lat === 0 && position.lng === 0) return;
    
    setIsLoadingMarketplaces(true);
    try {
      const response = await fetch(`${BASE_URL}/api/markets/nearby/?lat=${position.lat}&lng=${position.lng}`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'ngrok-skip-browser-warning': 'true'  // Add this header to skip the Ngrok browser warning
    }
});
      
      if (!response.ok) {
        throw new Error('Failed to fetch nearby marketplaces');
      }
      
      const data = await response.json();
      setNearbyMarketplaces(data);
    } catch (error) {
      console.error('Error fetching nearby marketplaces:', error);
      // Fallback to static data in case of error
      setNearbyMarketplaces(marketplaces);
    } finally {
      setIsLoadingMarketplaces(false);
    }
  };

  // Load Google Maps script - prevent multiple script loading
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if the script is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return () => {}; // Return empty cleanup function
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);

      return () => {
        // Only remove if it's our script
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.includes('maps.googleapis.com/maps/api/js')) {
            document.head.removeChild(scripts[i]);
            break;
          }
        }
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
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
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
      
      // Apply location from context if available (moved from useEffect)
      if (text !== "0" && latitude && longitude && latitude !== 0 && longitude !== 0) {
        const position = { lat: latitude, lng: longitude };
        newMap.setCenter(position);
        setCoordinates(position);
        newMap.setZoom(16);
        setSearchInput(text);
        
        // Update marker position
        newMarker.setPosition(position);
        
        // Fetch nearby marketplaces
        fetchNearbyMarketplaces(position);
      }
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
                longitude: lng,
              },
              radius: 5000.0,
            },
          },
        }),
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
  const handlePlaceSelect = async (placeId: string, displayText: string) => {
    if (!map) return;

    try {
      const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        method: 'GET',
        headers: {
          'X-Goog-Api-Key': googleMapsApiKey,
          'X-Goog-FieldMask': 'name,formattedAddress,location',
        },
      });

      const placeData = await response.json();

      if (placeData.location) {
        const position = {
          lat: placeData.location.latitude,
          lng: placeData.location.longitude,
        };

        // Center map on the selected location
        map.setCenter(position);
        setCoordinates(position);
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
        setSearchInput(displayText); // Fill input with selected value
        setShowSuggestions(false);
        
        // Fetch nearby marketplaces for the selected location
        fetchNearbyMarketplaces(position);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="px-1 py-2 outline-none border-none bg-white shadow-md z-10 absolute top-4 left-4 w-[22rem] rounded-4xl">
        <div className="flex items-center gap-2 relative">
          <Search className="ml-2" />
          <input
            type="text"
            placeholder="Search For Farmers Market Place..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full p-2 border outline-none border-none rounded-md"
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
                  onClick={() => handlePlaceSelect(placeId, displayText)}
                >
                  {displayText}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div ref={mapRef} className="w-full h-full min-h-screen" />
      <div className="drawer">
        <Drawer
          initialHeight={400}
          minHeight={40}
          maxHeight={window.innerHeight * 0.9}
        >
          <div className="fixed bg-white top-7 px-4 z-50 w-full py-1 font-semibold">
            Nearby Farmers' Market
          </div>
          <div className="space-y-4 pt-2.5 px-4 relative">
            {isLoadingMarketplaces ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : nearbyMarketplaces.length > 0 ? (
              nearbyMarketplaces.map((marketplace) => (
                <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No farmers markets found in this area
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default SearchFramersMarket;