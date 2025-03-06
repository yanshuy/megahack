import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";

import VintageCafeGame from "./pages/minigames/VintageCafeGame";
import MainLayout from "./layouts/MainLayout";
import OnboardingScreen from "./pages/Onboarding/page";
import ProductDetailScreen from "./pages/ProductDetails/page";
import HomeScreen from "./pages/Home/page";
import CartScreen from "./pages/Cart/page";

export const BASE_URL = "https://natural-ape-severely.ngrok-free.app";

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
            </Route>
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/pd/:productId" element={<ProductDetailScreen />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
