import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import VintageCafeGame from "./pages/minigames/VintageCafeGame";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout";
import OnboardingScreen from "./pages/Onboarding/page";
import MarketplaceScreen from "./pages/Marketplace/page";
import ProductDetailScreen from "./pages/ProductDetails/page";
import FarmerSidebar from "./components/FarmerSidebar";
import FarmerLayout from "./layouts/FarmerLayout";
import { AddOperation } from "three/src/constants.js";
import AddItems from "./pages/FarmerDasboard/AddItems";
import FarmerProfile from "./pages/FarmerDasboard/FarmerProfile";
import SearchFramersMarket from "./pages/SearchFramersMarket/SearchFramersMarket";

export const BASE_URL = "https://natural-ape-severely.ngrok-free.app";

export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwNDE4MDA3LCJpYXQiOjE3NDAyNDUyMDcsImp0aSI6IjAyODdkNzBjMmNhMjQ3NzFiN2Q4NDc5NzFjNWEzZjlmIiwidXNlcl9pZCI6NX0.eHOoZC-nRCIEIa1W7FqiXm3uRf6c0wDkHjEot6gbVOI";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* <Route path="/" element={<VintageCafeGame />} /> */}
            <Route path="/marketplace" element={<MarketplaceScreen />} />
            <Route path="/search/marketplace" element={<SearchFramersMarket/>} />
          </Route>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/pd/:productId" element={<ProductDetailScreen />} />



           <Route path="farmer" element={<FarmerLayout />}>
            <Route index element={<AddItems/>} />
            <Route path="/farmer/profile" element={<FarmerProfile/>} />
            
            
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
