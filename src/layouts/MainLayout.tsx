import { Outlet } from "react-router-dom";
import MobileNavigation from "../components/Navigation/MobileNavigation";

export default function MainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <nav className="sticky bottom-0 z-50">
        <MobileNavigation />
      </nav>
    </>
  );
}
