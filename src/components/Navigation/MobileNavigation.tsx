import {
  CircleCheckBig,
  Coffee,
  Gamepad,
  Gamepad2,
  Gamepad2Icon,
  Home,
  HomeIcon,
  ListChecks,
  LucideGamepad,
  Menu,
  Package,
  Projector,
  ShoppingBag,
  ShoppingBasket,
  Stamp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobileNavigation() {
  const navigate = useNavigate();
  return (
    <div className="w-screen bg-white">
      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pt-3 pb-4">
        <button
          className="flex flex-col items-center text-gray-500"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
          <span className="mt-1 text-xs">Home</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-500"
          onClick={() => {
            navigate("/minigame");
          }}
        >
          <Gamepad2Icon className="h-6 w-6" />
          <span className="mt-1 text-xs">Play</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-500"
          onClick={() => navigate("/cart/1")}
        >
          <span className="-mt-8 rounded-full border-[2px] border-white bg-(--accent-dark-blue) p-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#fcfcfc"
              className="size-7"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H13M19 15.5H17"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                ></path>{" "}
                <path
                  d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                ></path>{" "}
                <path
                  d="M5 6H8M5.5 13H16.0218C16.9812 13 17.4609 13 17.8366 12.7523C18.2123 12.5045 18.4013 12.0636 18.7792 11.1818L19.2078 10.1818C20.0173 8.29294 20.4221 7.34853 19.9775 6.67426C19.5328 6 18.5054 6 16.4504 6H12"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
              </g>
            </svg>
          </span>

          <span className="mt-1.5 text-xs">Your Order</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-500"
          onClick={() => navigate("/track")}
        >
          <ListChecks className="h-6 w-6" />
          <span className="mt-1 text-xs">Track</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Coffee className="h-6 w-6" />
          <span className="mt-1 text-xs">Orders</span>
        </button>
      </div>
    </div>
  );
}
