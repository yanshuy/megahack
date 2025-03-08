import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, FileVideo, Image, Trash2, Mic, Send, MicOff, Sprout, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, CloudRain, Thermometer, Wind, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SoilAnalysis = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [soilDescription, setSoilDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [soilAnalysisResult, setSoilAnalysisResult] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [waterRetention, setWaterRetention] = useState("");
  const [soilColor, setSoilColor] = useState("");
  const [soilTexture, setSoilTexture] = useState("");
  const [organicMatter, setOrganicMatter] = useState("");
  const [soilImage, setSoilImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get user's location
  const getLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation features.",
        variant: "destructive",
      });
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getLocationName(latitude, longitude);
        getWeatherData(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        toast({
          title: "Location error",
          description: `Failed to get your location: ${error.message}`,
          variant: "destructive",
        });
        setLoadingLocation(false);
      }
    );
  };

  // Get location name from coordinates
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setLocation(prev => ({
          ...prev,
          name: data.display_name,
          city: data.address.city || data.address.town || data.address.village || data.address.state,
          state: data.address.state,
          country: data.address.country
        }));
      }
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

  // Get weather data
  const getWeatherData = async (latitude, longitude) => {
    setLoadingWeather(true);
    try {
      // Using OpenWeatherMap API (you'll need to sign up for a free API key)
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY || ""; // Add your API key to .env file
      if (!apiKey) {
        toast({
          title: "API Key Missing",
          description: "Weather API key is not configured",
          variant: "destructive",
        });
        setLoadingWeather(false);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        rainfall: data.rain ? data.rain["1h"] || 0 : 0,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast({
        title: "Weather data error",
        description: "Failed to fetch current weather conditions",
        variant: "destructive",
      });
    } finally {
      setLoadingWeather(false);
    }
  };

  // Analyze soil using Gemini API
// Modify the analyzeSoil function to include the image
const analyzeSoil = async () => {
  if (!location) {
    toast({
      title: "Location required",
      description: "Please allow access to your location first",
      variant: "destructive",
    });
    return;
  }

  if (!soilDescription && !soilColor && !soilTexture && !waterRetention && !organicMatter && !soilImage) {
    toast({
      title: "Information needed",
      description: "Please provide soil information or upload an image",
      variant: "destructive",
    });
    return;
  }

  setIsAnalyzing(true);
  
  try {
    const geminiApiKey = import.meta.env.VITE_GEMINI_KEY || "";
    if (!geminiApiKey) {
      throw new Error("Gemini API key is not configured");
    }

    let imageContent = null;
    
    // If there's an image, convert it to base64 and prepare for Gemini
    if (soilImage) {
      const reader = new FileReader();
      const imagePromise = new Promise((resolve, reject) => {
        reader.onloadend = () => {
          // Remove the data URL prefix
          const base64 = reader.result.toString().split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(soilImage);
      });
      
      const base64 = await imagePromise;
      
      // Only add image if we successfully converted it
      if (base64) {
        imageContent = {
          inlineData: {
            data: base64,
            mimeType: soilImage.type
          }
        };
      }
    }

    // Prepare the prompt for Gemini
    const textPrompt = `
As an agricultural soil expert, analyze the soil based on the following information:

${soilDescription ? `Farmer's description: ${soilDescription}` : ''}
${soilColor ? `Soil color: ${soilColor}` : ''}
${soilTexture ? `Soil texture: ${soilTexture}` : ''}
${waterRetention ? `Water retention: ${waterRetention}` : ''}
${organicMatter ? `Organic matter content: ${organicMatter}` : ''}
${soilImage ? '**An image of the soil has been provided for visual analysis**' : ''}

Location information:
- Geographic location: ${location.name || `${location.latitude}, ${location.longitude}`}
- Region: ${location.city || ''}, ${location.state || ''}, ${location.country || ''}

Weather conditions:
${weather ? `
- Temperature: ${weather.temperature}°C
- Humidity: ${weather.humidity}%
- Weather description: ${weather.description}
- Wind speed: ${weather.windSpeed} m/s
- Rainfall (last hour): ${weather.rainfall} mm
` : 'Weather data not available'}

Based on this information, please:
1. Identify the soil type (clay, sandy, silt, loamy, peat, black, alluvial, chalky, etc.)
2. Explain the characteristics of this soil type
3. List 3-5 crops that would grow well in this soil type
4. Provide 2-3 recommendations for improving soil health or fertility
5. Suggest any specific considerations for farming in this location

Format your response as a JSON object with the following structure:
{
  "soilType": "Type of soil",
  "characteristics": ["characteristic 1", "characteristic 2", "characteristic 3"],
  "suitableCrops": ["crop 1", "crop 2", "crop 3"],
  "improvementRecommendations": ["recommendation 1", "recommendation 2"],
  "locationConsiderations": ["consideration 1", "consideration 2"]
}`;

    // Set up the request body based on whether we have an image
    const requestBody = {
      contents: [{
        parts: imageContent 
          ? [{ text: textPrompt }, imageContent] 
          : [{ text: textPrompt }]
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1000,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || "Error analyzing soil");
    }

    // Extract the JSON response from the text
    const responseText = data.candidates[0].content.parts[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      setSoilAnalysisResult(parsedResponse);
    } else {
      throw new Error("Failed to parse analysis results");
    }
    
    toast({
      title: "Analysis complete",
      description: "Soil analysis has been completed successfully",
    });
  } catch (error) {
    console.error("Error analyzing soil:", error);
    toast({
      title: "Analysis error",
      description: error.message || "Failed to analyze soil data",
      variant: "destructive",
    });
  } finally {
    setIsAnalyzing(false);
  }
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSoilImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSoilImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container  mx-auto max-w-7xl pt-6 pb-20">
      
      
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <CardTitle className="text-2xl font-bold text-green-800">Soil Analysis</CardTitle>
          <CardDescription>
            Analyze your soil type and get recommendations for optimal farming
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {!soilAnalysisResult ? (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Location & Weather</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-700 mr-2" />
                      <h4 className="font-medium">Your Location</h4>
                    </div>
                    
                    {location ? (
                      <div className="ml-7 text-gray-700">
                        <p>{location.name || `${location.latitude}, ${location.longitude}`}</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={getLocation} 
                        className="ml-7 bg-green-700 hover:bg-green-800 text-white"
                        disabled={loadingLocation}
                      >
                        {loadingLocation ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Getting location...
                          </>
                        ) : (
                          "Get Current Location"
                        )}
                      </Button>
                    )}
                  </div>

                  {location && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <CloudRain className="h-5 w-5 text-green-700 mr-2" />
                        <h4 className="font-medium">Weather Conditions</h4>
                      </div>
                      
                      {weather ? (
                        <div className="ml-7 grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-gray-700">{weather.temperature}°C</span>
                          </div>
                          <div className="flex items-center">
                            <CloudRain className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-gray-700">{weather.humidity}% humidity</span>
                          </div>
                          <div className="flex items-center">
                            <Wind className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-gray-700">{weather.windSpeed} m/s</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 text-gray-600 mr-1">💧</div>
                            <span className="text-gray-700">
                              {weather.rainfall > 0 ? `${weather.rainfall} mm rain` : "No recent rain"}
                            </span>
                          </div>
                          <div className="col-span-2 text-gray-700">
                            {weather.description}
                          </div>
                        </div>
                      ) : loadingWeather ? (
                        <div className="ml-7 flex items-center text-gray-600">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading weather data...
                        </div>
                      ) : (
                        <Button 
                          onClick={() => location && getWeatherData(location.latitude, location.longitude)} 
                          className="ml-7 bg-green-700 hover:bg-green-800 text-white"
                        >
                          Load Weather Data
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Soil Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="soilDescription">Describe your soil and farming conditions</Label>
                    <Textarea
                      id="soilDescription"
                      placeholder="Example: My soil feels sticky when wet and has clumps. It dries very hard and cracks during summer."
                      value={soilDescription}
                      onChange={(e) => setSoilDescription(e.target.value)}
                      className="mt-1 h-24"
                    />
                  </div>
                  
                  {/* Image upload section */}
                  <div>
                    <Label className="mb-2 block">Upload Soil Image (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 transition-all">
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Soil preview" 
                            className="w-full h-40 object-cover rounded-md" 
                          />
                          <button 
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            onClick={removeImage}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className="mt-2 text-xs text-gray-500 text-center">
                            {soilImage?.name} ({(soilImage?.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      ) : (
                        <div 
                          className="flex flex-col items-center justify-center py-4 cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-center">Click to upload a photo of your soil</p>
                          <p className="text-xs text-gray-500 text-center mt-1">
                            JPG, PNG or WEBP (max. 5MB)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            ref={fileInputRef}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="soilColor">Soil Color</Label>
                      <Select value={soilColor} onValueChange={setSoilColor}>
                        <SelectTrigger id="soilColor" className="w-full">
                          <SelectValue placeholder="Select soil color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="dark brown">Dark Brown</SelectItem>
                          <SelectItem value="brown">Brown</SelectItem>
                          <SelectItem value="light brown">Light Brown</SelectItem>
                          <SelectItem value="red">Red/Reddish</SelectItem>
                          <SelectItem value="gray">Gray</SelectItem>
                          <SelectItem value="yellow">Yellow</SelectItem>
                          <SelectItem value="white">White/Light Gray</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="soilTexture">Soil Texture</Label>
                      <Select value={soilTexture} onValueChange={setSoilTexture}>
                        <SelectTrigger id="soilTexture" className="w-full">
                          <SelectValue placeholder="Select texture" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sticky">Sticky when wet</SelectItem>
                          <SelectItem value="gritty">Gritty/Sandy</SelectItem>
                          <SelectItem value="silky">Silky/Smooth</SelectItem>
                          <SelectItem value="crumbly">Crumbly</SelectItem>
                          <SelectItem value="hard">Hard/Compact</SelectItem>
                          <SelectItem value="powdery">Powdery when dry</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="waterRetention">Water Retention</Label>
                      <Select value={waterRetention} onValueChange={setWaterRetention}>
                        <SelectTrigger id="waterRetention" className="w-full">
                          <SelectValue placeholder="How does it hold water?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent (stays moist)</SelectItem>
                          <SelectItem value="good">Good (drains slowly)</SelectItem>
                          <SelectItem value="medium">Medium (drains moderately)</SelectItem>
                          <SelectItem value="poor">Poor (drains quickly)</SelectItem>
                          <SelectItem value="very poor">Very Poor (water runs off)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="organicMatter">Organic Matter</Label>
                      <Select value={organicMatter} onValueChange={setOrganicMatter}>
                        <SelectTrigger id="organicMatter" className="w-full">
                          <SelectValue placeholder="Amount of organic matter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High (dark, rich soil)</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="very low">Very Low (light colored)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={analyzeSoil} 
                className="w-full bg-green-700 hover:bg-green-800 text-white py-5 mb-8 text-lg"
                disabled={isAnalyzing || !location}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Soil...
                  </>
                ) : (
                  "Analyze Soil"
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="mr-4 rounded-full bg-green-100 p-3">
                  <div className="text-2xl">🌱</div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Soil Type: {soilAnalysisResult.soilType}</h3>
                  <p className="text-gray-600 text-sm">Based on your location and soil information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Characteristics</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
                    {soilAnalysisResult.characteristics.map((characteristic, index) => (
                      <li key={index}>{characteristic}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Suitable Crops</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {soilAnalysisResult.suitableCrops.map((crop, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Improvement Recommendations</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
                    {soilAnalysisResult.improvementRecommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Location Considerations</h3>
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
                    {soilAnalysisResult.locationConsiderations.map((consideration, index) => (
                      <li key={index}>{consideration}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setSoilAnalysisResult(null)}
                  variant="outline" 
                  className="flex-1"
                >
                  Start New Analysis
                </Button>
                <Button 
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                  onClick={() => {
                    // Here you could add functionality to save the analysis
                    toast({
                      title: "Analysis saved",
                      description: "Soil analysis has been saved to your profile",
                    });
                  }}
                >
                  Save Analysis
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilAnalysis;