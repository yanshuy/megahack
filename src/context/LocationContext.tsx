import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [text, setText] = useState("0");

  const updateText = (newText)=>{
    setText(newText);
  }
  
  
  const updateLatitude = (newLat) => {
    setLatitude(newLat);
  };
  
  const updateLongitude = (newLng) => {
    setLongitude(newLng);
  };
  
  const updateCoordinates = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };
  
  const value = {
    latitude,
    longitude,
    text,
    updateLatitude,
    updateLongitude,
    updateCoordinates,
    updateText
  };
  
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): { latitude: any; longitude: any; updateLatitude: (lat: any) => void; updateLongitude: (lng: any) => void; updateCoordinates: (lat: any, lng: any) => void } => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};