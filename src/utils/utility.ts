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
