import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";

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
import ThreeDIMS from "./pages/3DIMS/3DIMS";
import Shop from "./pages/shop/page";

import HealthReportPage from "./pages/HealthReportPage";
import { LocationProvider } from "./context/LocationContext";
import ShopForMarket from "./pages/shop/ShopForMarket";
import Items from "./pages/FarmerDasboard/Items";
import SoilAnalysis from "./pages/FarmerDasboard/SoilAnanlysis";
import UserLogin from "./pages/Auth/UserLogin";

export const BASE_URL =
  "https://live-merely-drum.ngrok-free.app";

export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxNTczODI4LCJpYXQiOjE3NDE0MDEwMjgsImp0aSI6Ijc2NTFmMWQzZTIzOTRhMWE5NTc0ZDNmYjBiMjcwODFmIiwidXNlcl9pZCI6MX0.ewHpDzOk_3xSnmjJ59iABGVcXYRg-flmzlZaGAvGYTI";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <LocationProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                {/* <Route path="/" element={<VintageCafeGame />} /> */}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/mp" element={<MarketplacesPage />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/farmers" element={<FarmersDirectoryPage />} />
                <Route
                  path="/search/marketplace"
                  element={<SearchFramersMarket />}
                />
              </Route>
              <Route path="/health-report" element={<HealthReportPage />} />
              <Route path="/onboarding" element={<OnboardingScreen />} />
              <Route
                path="/search/marketplace"
                element={<SearchFramersMarket />}
              />
              <Route
                path="/market/:marketId"
                element={<MarketplaceDetailPage />}
              />
              <Route path="/shop/:marketId" element={<ShopForMarket />} />
              <Route path="/farmers/:id" element={<FarmerProfileForUser />} />
              {/* <Route path="/pd/:productId" element={<ProductDetailScreen />} /> */}
              <Route
                path="/product/:productId"
                element={<FarmerProductListing />}
              />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="*" element={<div>page under construction</div>} />

              <Route path="farmer" element={<FarmerLayout />}>
                <Route index element={<AddItems />} />
                <Route path="/farmer/profile" element={<FarmerProfile />} />
              <Route path="/farmer/3d" element={<ThreeDIMS />} />

                <Route path="/farmer/items" element={<Items />} />
                <Route path="/farmer/soil" element={<SoilAnalysis />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;
