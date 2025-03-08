import { BASE_URL } from "@/App";

export const getProductBadgeStyle = (product: string) => {
  switch (product) {
    case "Vegetables":
      return "bg-green-100 text-green-800";
    case "Veggies":
      return "bg-green-100 text-green-800";
    case "Fruits":
      return "bg-orange-100 text-orange-800";
    case "Dairy":
      return "bg-blue-100 text-blue-800";
    case "Spices":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const RupeeSymbol = "₹" as const;

export const changeLanguage = (lang: string) => {
  // Use a small delay to ensure the widget has loaded
  const interval = setInterval(() => {
    console.log("hi", lang);

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
      clearInterval(interval);
    }
  }, 500);

  return interval;
};

export const uFetch = async (
  url: string,
  method: string = "GET",
  body?: string,
) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "ngrok-skip-browser-warning": "69420",
    },
    body: body ? body : undefined,
  });
  return res.json();
};
