import { Link, useLocation } from "react-router-dom";
import { Home, Search, Users, ShoppingCart, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { VoiceCommandButton } from "../VoiceCommandButton";

const MobileNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "", path: "" },

    { name: "Farmers", path: "/farmers", icon: Users },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
  ];

  const { cart } = useCart();
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed right-0 bottom-0 left-0">
      <div className="relative -top-8 left-1/2 grid max-w-fit -translate-x-1/2">
        <div className="absolute top-8 z-20 h-[33px] w-[70px] -translate-x-1/2 rounded-b-full bg-(--bg-neutral) [grid-area:1/1]"></div>

        <div className="absolute z-30 flex size-14 -translate-x-1/2 items-center justify-center rounded-full [grid-area:1/1]">
          <VoiceCommandButton />
        </div>
        <span
          className={`absolute top-[4.25rem] left-1/2 mt-1 -translate-x-1/2 text-xs font-medium text-gray-500`}
        >
          Quick
        </span>
        <div className="absolute top-[31px] -left-[46.5px] z-30 size-3 -rotate-6 rounded-tr-full bg-white shadow-[4px_-2px__0px_-1px_#eef1f1]"></div>
        <div className="absolute top-[31px] -right-[46.5px] z-30 size-3 rotate-6 rounded-tl-full bg-white shadow-[-4px_-2px__0px_-1px_#eef1f1]"></div>
      </div>

      <div className="z-50 flex items-center justify-between bg-white px-2 pt-3 pb-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative flex flex-col items-center justify-center px-3 pb-1"
          >
            {item.icon ? (
              <item.icon
                className={`h-6 w-6 ${
                  isActive(item.path) ? "text-green-700" : "text-gray-500"
                }`}
              />
            ) : (
              <div className="size-6"></div>
            )}

            {item.name == "Cart" && totalItems > 0 && (
              <span className="absolute -top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}

            <span
              className={`mt-1 text-xs font-medium ${
                isActive(item.path) ? "text-green-700" : "text-gray-500"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
