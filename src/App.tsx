import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";

import MainLayout from "./layouts/MainLayout";
import OnboardingScreen from "./pages/onboarding/page";
import HomeScreen from "./pages/Home/page";
import CartScreen from "./pages/Cart/page";
import FarmerProductListing from "./pages/farmer-products/page";
import FarmersDirectoryPage from "./pages/farmers-directory/page";
import { FarmerProfile } from "./pages/farmer-profile/page";

export const BASE_URL = "https://toucan-driven-admittedly.ngrok-free.app";

export const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwNDE4MDA3LCJpYXQiOjE3NDAyNDUyMDcsImp0aSI6IjAyODdkNzBjMmNhMjQ3NzFiN2Q4NDc5NzFjNWEzZjlmIiwidXNlcl9pZCI6NX0.eHOoZC-nRCIEIa1W7FqiXm3uRf6c0wDkHjEot6gbVOI";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              {/* <Route path="/" element={<VintageCafeGame />} /> */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/farmers" element={<FarmersDirectoryPage />} />
              <Route path="/farmers/:id" element={<FarmerProfile />} />
            </Route>
            <Route path="/onboarding" element={<OnboardingScreen />} />
            {/* <Route path="/pd/:productId" element={<ProductDetailScreen />} /> */}
            <Route
              path="/product/:productId"
              element={<FarmerProductListing />}
            />
            {/* <Route path="/3d" element={<ThreeD />} /> */}
            <Route path="*" element={<div>page under construction</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
