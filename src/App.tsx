import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import VintageCafeGame from "./pages/minigames/VintageCafeGame";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout";
import ThreeD from "./pages/3DIMS/3DIMS";

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
            <Route path="/" element={<VintageCafeGame />} />
            <Route path="/3d" element={<ThreeD />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
