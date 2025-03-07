import { Link, useLocation } from "react-router-dom";
import { Home, Search, Users, ShoppingCart, Plus } from "lucide-react";

const MobileNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home, color: "text-green-700" },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "Add", path: "/add", icon: Plus, special: true },
    { name: "Farmers", path: "/farmers", icon: Users },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
  ];

  if (true) {
    return
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between bg-white px-2 pt-1 pb-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex flex-col items-center justify-center px-3 pb-1"
        >
          {item.special ? (
            <div className="relative -top-10 rounded-full ring-[10px] ring-(--bg-neutral)">
              <div className="inset-0 flex size-14 items-center justify-center rounded-full bg-green-700">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <span
                className={`absolute left-1/2 mt-1 -translate-x-1/2 translate-y-[15px] text-xs font-medium ${
                  isActive(item.path)
                    ? item.color || "text-black"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
              <div className="absolute top-[35px] -left-[1.15rem] size-3 -rotate-6 rounded-tr-full bg-white shadow-[4px_-4px__0px_-1px_#eef1f1]"></div>
              <div className="absolute top-[35px] -right-[1.15rem] size-3 rotate-6 rounded-tl-full bg-white shadow-[-4px_-4px__0px_-1px_#eef1f1]"></div>
            </div>
          ) : (
            <>
              <item.icon
                className={`h-6 w-6 ${
                  isActive(item.path)
                    ? item.color || "text-black"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive(item.path)
                    ? item.color || "text-black"
                    : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
