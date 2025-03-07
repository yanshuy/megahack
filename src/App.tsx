import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";
import { VoiceCommandButton } from "./components/VoiceCommandButton"; // Import the component

import MainLayout from "./layouts/MainLayout";
import OnboardingScreen from "./pages/onboarding/page";
import CartScreen from "./pages/Cart/page";
import FarmerProductListing from "./pages/farmer-products/page";
import FarmersDirectoryPage from "./pages/farmers-directory/page";
import { FarmerProfileForUser } from "./pages/farmer-profile/page";
import MarketplacesPage from "./pages/marketplace-listing/page";
import MarketplaceDetailPage from "./pages/marketplace/page";
import HomeScreen from "./pages/Home/page";
import FarmerSidebar from "./components/FarmerSidebar";
import FarmerLayout from "./layouts/FarmerLayout";
import { AddOperation } from "three/src/constants.js";
import AddItems from "./pages/FarmerDasboard/AddItems";
import FarmerProfile from "./pages/FarmerDasboard/FarmerProfile";
import SearchFramersMarket from "./pages/SearchFramersMarket/SearchFramersMarket";

export const BASE_URL = "https://live-merely-drum.ngrok-free.app";

export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxNTM3ODM3LCJpYXQiOjE3NDEzNjUwMzcsImp0aSI6IjkyOTZhODEyZTIwNjRjYmM4ZmU3NmYyMTA5YWEwZGZmIiwidXNlcl9pZCI6MX0.EL6XtlBDcqdQRhy4ExgqlVKEAmCjbHY6Ne96Udcea-c";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <BrowserRouter>
          {/* Voice command button that appears on all pages */}
          <VoiceCommandButton />
          <Routes>
            <Route element={<MainLayout />}>
              {/* <Route path="/" element={<VintageCafeGame />} /> */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/mp" element={<MarketplacesPage />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/farmers" element={<FarmersDirectoryPage />} />
              <Route path="/search/marketplace" element={<SearchFramersMarket/>} />
          </Route>
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route
              path="/market/:marketId"
              element={<MarketplaceDetailPage />}
            />
              <Route path="/farmers/:id" element={<FarmerProfileForUser />} />
            {/* <Route path="/pd/:productId" element={<ProductDetailScreen />} /> */}
            <Route
              path="/product/:productId"
              element={<FarmerProductListing />}
            />
            {/* <Route path="/3d" element={<ThreeD />} /> */}
            <Route path="*" element={<div>page under construction</div>} />
  


           <Route path="farmer" element={<FarmerLayout />}>
            <Route index element={<AddItems/>} />
            <Route path="/farmer/profile" element={<FarmerProfile/>} />
            
            
          </Route>
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;