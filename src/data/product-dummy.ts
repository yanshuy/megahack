import { FarmerProduct } from "@/context/CartContext";

export const products: FarmerProduct[] = [
  {
    id: "1",
    name: "Alphonso Mangoes",
    description:
      "Experience the king of mangoes! Our Alphonso mangoes are grown in the sun-drenched orchards of Ratnagiri, Maharashtra, using time-honored techniques passed down through generations. These mangoes are known for their exquisite sweetness, rich aroma, and unparalleled flavor. Each bite is a burst of sunshine, perfect for enjoying fresh or using in your favorite desserts and smoothies.",
    price: 1200,
    unit: "1 dozen",
    images: [
      "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
      "https://placehold.co/600x400?text=Alphonso+Mangoes+2",
      "https://placehold.co/600x400?text=Alphonso+Mangoes+3",
    ],
    tasteProfile:
      "Sweet, aromatic, with notes of honey and saffron. The flesh is smooth and buttery, with minimal fiber.",
    growingPractices:
      "Our Alphonso mangoes are cultivated using organic and traditional farming methods. We prioritize natural fertilizers and pest control techniques to ensure the health of our trees and the environment. Our mangoes are hand-picked at the peak of ripeness to guarantee the best flavor and quality.",
    certifications: ["FSSAI", "India Organic"],
    category: "Fruits",
    farmer: {
      id: "farmer1",
      name: "Rajesh Patil",
      image: "https://placehold.co/600x400?text=Farmer+Rajesh+Patil",
      rating: 4.8,
    },
    availableQuantities: ["1 dozen", "2 dozen", "5 kg"],
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
  },
  {
    id: "2",
    name: "Gir Cow Ghee",

    description:
      "Indulge in the richness of pure Gir Cow Ghee! Our ghee is made from the milk of free-grazing Gir cows, known for their superior milk quality. We follow traditional methods to extract the ghee, ensuring its purity and authentic flavor. This golden elixir is packed with nutrients and adds a delectable touch to your meals.",
    price: 2500,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Gir+Cow+Ghee+1",
      "https://placehold.co/600x400?text=Gir+Cow+Ghee+2",
    ],
    video: "https://placehold.co/600x400?text=Ghee-Making+Process+Video",
    tasteProfile:
      "Rich, aromatic, with a slightly nutty flavor. It has a smooth, melt-in-your-mouth texture.",
    growingPractices:
      "Our Gir cows are raised on our family farm with ample space to roam and graze freely. They are fed a natural diet of grasses and herbs, resulting in milk that is rich in nutrients and flavor. We believe in ethical and sustainable farming practices that respect the well-being of our animals and the environment.",
    certifications: ["Organic India"],
    category: "Dairy",
    farmer: {
      id: "farmer2",
      name: "Suresh Kumar",
      image: "https://placehold.co/600x400?text=Farmer+Suresh+Kumar",
      rating: 4.5,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
  {
    id: "3",
    name: "Basmati Rice",

    description:
      "Savor the aroma and taste of our premium Basmati rice, cultivated in the fertile fields of Punjab. This long-grain rice is known for its delicate fragrance, fluffy texture, and exquisite taste. It's the perfect accompaniment to your favorite curries, biryanis, and pulaos.",
    price: 180,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Basmati+Rice+1",
      "https://placehold.co/600x400?text=Basmati+Rice+2",
      "https://placehold.co/600x400?text=Basmati+Rice+3",
      "https://placehold.co/600x400?text=Basmati+Rice+4",
    ],
    tasteProfile:
      "Long-grain, aromatic, with a slightly sweet flavor. It cooks up fluffy and separate, making it ideal for a variety of dishes.",
    growingPractices:
      "We employ sustainable farming practices to cultivate our Basmati rice, minimizing our impact on the environment. We use natural fertilizers and crop rotation techniques to maintain soil health and conserve water. Our commitment to quality ensures that you receive the finest Basmati rice with every purchase.",
    certifications: ["FSSAI", "ISO 22000"],
    category: "Grains",
    farmer: {
      id: "farmer3",
      name: "Harpreet Singh",
      image: "https://placehold.co/600x400?text=Farmer+Harpreet+Singh",
      rating: 4.7,
    },
    availableQuantities: ["1 kg", "5 kg", "10 kg", "25 kg"],
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
  },
  {
    id: "4",
    name: "Kashmiri Saffron",
    description:
      "Experience the luxury of pure Kashmiri Saffron, hand-picked from the pristine valleys of Kashmir. These delicate threads are renowned for their vibrant color, intense aroma, and unique flavor. Add a touch of magic to your culinary creations with this precious spice.",
    price: 45000,
    unit: "10 g",
    images: [
      "https://placehold.co/600x400?text=Kashmiri+Saffron+1",
      "https://placehold.co/600x400?text=Kashmiri+Saffron+2",
    ],
    tasteProfile:
      "Earthy, floral, with a slightly bitter and honeyed flavor. It imparts a warm, golden hue to dishes.",
    growingPractices:
      "Our saffron is cultivated in the high-altitude valleys of Kashmir, where the unique climate and soil conditions contribute to its exceptional quality. We follow traditional practices, including hand-picking the delicate saffron threads at dawn to preserve their flavor and aroma.",
    certifications: ["FSSAI", "Geographical Indication (GI)"],
    category: "Spices",
    farmer: {
      id: "farmer4",
      name: "Ghulam Nabi",
      image: "https://placehold.co/600x400?text=Farmer+Ghulam+Nabi",
      rating: 4.9,
    },
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    availableQuantities: ["1 g", "5 g", "10 g"],
  },
  {
    id: "5",
    name: "Shimla Apples",
    description:
      "Bite into the crisp freshness of our Shimla Apples, grown in the pristine orchards of Himachal Pradesh. These apples are renowned for their juicy sweetness, vibrant red color, and delightful crunch. Perfect for enjoying as a healthy snack or using in pies, salads, and juices.",
    price: 250,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Shimla+Apples+1",
      "https://placehold.co/600x400?text=Shimla+Apples+2",
    ],
    tasteProfile:
      "Sweet and slightly tart, with a crisp, juicy texture. The flavor is refreshing and well-balanced.",
    growingPractices:
      "Our apple orchards are located in the cool Himalayan foothills, where the climate is ideal for growing high-quality apples. We use sustainable farming practices, including natural pest control and water conservation methods, to protect the environment and ensure the health of our trees.",
    certifications: ["FSSAI"],
    category: "Fruits",
    farmer: {
      id: "farmer5",
      name: "Priya Sharma",
      image: "https://placehold.co/600x400?text=Farmer+Priya+Sharma",
      rating: 4.6,
    },
    availableQuantities: ["1 kg", "2 kg", "5 kg"],
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
  },
  {
    id: "6",
    name: "Darjeeling Tea",
    description:
      "Experience the exquisite aroma and flavor of our Darjeeling Tea, hand-plucked from the misty hills of Darjeeling. This premium tea is known for its delicate floral notes, smooth finish, and refreshing taste. Perfect for enjoying as a morning pick-me-up or a relaxing afternoon treat.",
    price: 1500,
    unit: "250 g",
    images: [
      "https://placehold.co/600x400?text=Darjeeling+Tea+1",
      "https://placehold.co/600x400?text=Darjeeling+Tea+2",
      "https://placehold.co/600x400?text=Darjeeling+Tea+3",
    ],
    tasteProfile:
      "Delicate, floral, with a slightly sweet and muscatel flavor. It has a smooth, refreshing finish.",
    growingPractices:
      "Our tea gardens are nestled in the high altitudes of Darjeeling, where the cool, misty climate and fertile soil create the perfect conditions for growing premium tea. We follow sustainable practices, including hand-plucking the tea leaves and using natural fertilizers, to preserve the environment and ensure the quality of our tea.",
    certifications: ["Organic India", "Fair Trade"],
    category: "Spices", // Updated category to a valid one
    farmer: {
      id: "farmer6",
      name: "Bimal Gurung",
      image: "https://placehold.co/600x400?text=Farmer+Bimal+Gurung",
      rating: 4.7,
    },
    availableQuantities: ["250 g", "500 g", "1 kg"],
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
  },
  {
    id: "7",
    name: "Moringa Powder",
    description:
      "Boost your health with our Moringa Powder, made from organically grown moringa leaves. This nutrient-packed superfood is a rich source of vitamins, minerals, and antioxidants. Add it to your smoothies, soups, or juices for a nutritional boost.",
    price: 800,
    unit: "250 g",
    images: [
      "https://placehold.co/600x400?text=Moringa+Powder+1",
      "https://placehold.co/600x400?text=Moringa+Powder+2",
    ],
    tasteProfile:
      "Slightly earthy and spinach-like with a hint of sweetness. It blends well with various flavors.",
    growingPractices:
      "Our moringa trees are grown organically in Tamil Nadu, using sustainable farming practices that prioritize soil health and water conservation. The leaves are carefully harvested and processed to retain their nutritional value.",
    certifications: ["Organic India", "FSSAI"],
    category: "Veggies", // Updated category to a valid one
    farmer: {
      id: "farmer7",
      name: "Lakshmi Krishnan",
      image: "https://placehold.co/600x400?text=Farmer+Lakshmi+Krishnan",
      rating: 4.4,
    },
    availableQuantities: ["250 g", "500 g", "1 kg"],
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
  },
  {
    id: "8",
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    name: "Organic Turmeric Powder",
    description:
      "Enhance your health and culinary creations with our Organic Turmeric Powder, sourced directly from the farms of Kerala. This vibrant yellow spice is known for its earthy flavor, numerous health benefits, and versatility in cooking. Add it to curries, smoothies, or golden milk for a warm and comforting experience.",
    price: 500,
    unit: "250 g",
    images: [
      "https://placehold.co/600x400?text=Turmeric+Powder+1",
      "https://placehold.co/600x400?text=Turmeric+Powder+2",
    ],
    tasteProfile:
      "Warm, earthy, slightly bitter with a hint of pepper. It adds a vibrant yellow color to dishes.",
    growingPractices:
      "Our turmeric is cultivated organically in Kerala, using sustainable farming practices that respect the environment and preserve the natural biodiversity of the region. We prioritize natural fertilizers and pest control methods to ensure the purity and quality of our turmeric.",
    certifications: ["Organic India", "FSSAI"],
    category: "Spices",
    farmer: {
      id: "farmer8",
      name: "Aravind Menon",
      image: "https://placehold.co/600x400?text=Farmer+Aravind+Menon",
      rating: 4.7,
    },
    availableQuantities: ["250 g", "500 g", "1 kg"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "9",
    name: "Fresh Green Peas",
    description:
      "Enjoy the sweetness and freshness of our Green Peas, harvested straight from the farms of Maharashtra. These tender peas are perfect for adding a burst of flavor and nutrition to your meals. Use them in stir-fries, salads, or soups for a delightful culinary experience.",
    price: 120,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Green+Peas+1",
      "https://placehold.co/600x400?text=Green+Peas+2",
    ],
    tasteProfile:
      "Sweet, delicate, and slightly grassy. They have a tender, crisp texture.",
    growingPractices:
      "Our green peas are grown using sustainable farming practices that prioritize soil health and water conservation. We use natural fertilizers and pest control methods to ensure the quality and safety of our produce.",
    certifications: ["FSSAI"],
    category: "Veggies",
    farmer: {
      id: "farmer9",
      name: "Jyoti Deshmukh",
      image: "https://placehold.co/600x400?text=Farmer+Jyoti+Deshmukh",
      rating: 4.5,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "10",
    name: "Raw Honey",
    description:
      "Taste the pure sweetness of our Raw Honey, collected from the forests of the Nilgiris. This unprocessed honey is packed with natural enzymes, antioxidants, and pollen, making it a healthy and delicious treat. Enjoy it on toast, in your tea, or simply by the spoonful.",
    price: 1200,
    unit: "500 g",
    images: [
      "https://placehold.co/600x400?text=Raw+Honey+1",
      "https://placehold.co/600x400?text=Raw+Honey+2",
    ],
    tasteProfile:
      "Varies depending on the floral source, but generally sweet, floral, and slightly tangy.",
    growingPractices:
      "Our honey is collected from wild bee colonies in the Nilgiris, using sustainable practices that respect the bees and their environment. We ensure that the honey is minimally processed to retain its natural goodness and flavor.",
    certifications: ["Organic India", "FSSAI"],
    category: "Dairy", // Categorized under Dairy as it's an animal product
    farmer: {
      id: "farmer10",
      name: "Muthu Kumar",
      image: "https://placehold.co/600x400?text=Farmer+Muthu+Kumar",
      rating: 4.6,
    },
    availableQuantities: ["500 g", "250 g", "1 kg"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "11",
    name: "Fresh Ginger",
    description:
      "Add a zesty kick to your dishes with our Fresh Ginger, grown in the fertile lands of Kerala. This aromatic rhizome is known for its pungent flavor and numerous health benefits. Use it in stir-fries, curries, teas, or juices for a warming and invigorating experience.",
    price: 200,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Fresh+Ginger+1",
      "https://placehold.co/600x400?text=Fresh+Ginger+2",
    ],
    tasteProfile: "Pungent, spicy, and slightly sweet with a warm aroma.",
    growingPractices:
      "Our ginger is cultivated organically in Kerala, using sustainable farming practices that promote soil health and water conservation. We harvest the ginger at its peak to ensure the best flavor and quality.",
    certifications: ["Organic India", "FSSAI"],
    category: "Spices",
    farmer: {
      id: "farmer11",
      name: "Maya Nair",
      image: "https://placehold.co/600x400?text=Farmer+Maya+Nair",
      rating: 4.4,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "12",
    name: "Organic Black Peppercorns",
    description:
      "Spice up your life with our Organic Black Peppercorns, grown in the lush hills of Wayanad, Kerala. These premium peppercorns are known for their bold flavor, pungent aroma, and versatility in cooking. Use them whole, crushed, or ground to add a kick to your favorite dishes.",
    price: 800,
    unit: "250 g",
    images: [
      "https://placehold.co/600x400?text=Black+Peppercorns+1",
      "https://placehold.co/600x400?text=Black+Peppercorns+2",
    ],
    tasteProfile:
      "Pungent, sharp, and slightly spicy with a warm, woody aroma.",
    growingPractices:
      "Our peppercorns are cultivated organically in Wayanad, using sustainable farming practices that preserve the natural ecosystem and promote biodiversity. We hand-pick the peppercorns at their peak ripeness to ensure the best flavor and quality.",
    certifications: ["Organic India", "FSSAI", "Fair Trade"],
    category: "Spices",
    farmer: {
      id: "farmer12",
      name: "Rajan Pillai",
      image: "https://placehold.co/600x400?text=Farmer+Rajan+Pillai",
      rating: 4.8,
    },
    availableQuantities: ["250 g", "500 g", "1 kg"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "13",
    name: "Red Onions",
    description:
      "Add a burst of flavor to your dishes with our Red Onions, grown in the rich soil of Nashik, Maharashtra. These onions are known for their vibrant color, pungent flavor, and versatility in cooking. Use them in salads, curries, sandwiches, or pizzas for a delightful culinary experience.",
    price: 80,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Red+Onions+1",
      "https://placehold.co/600x400?text=Red+Onions+2",
    ],
    tasteProfile: "Pungent, sharp, and slightly sweet with a crisp texture.",
    growingPractices:
      "Our red onions are cultivated using sustainable farming practices that prioritize soil health and water conservation. We use natural fertilizers and pest control methods to ensure the quality and safety of our produce.",
    certifications: ["FSSAI"],
    category: "Veggies",
    farmer: {
      id: "farmer13",
      name: "Anita Pawar",
      image: "https://placehold.co/600x400?text=Farmer+Anita+Pawar",
      rating: 4.3,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "14",
    name: "Fresh Tomatoes",
    description:
      "Enjoy the juicy sweetness of our Fresh Tomatoes, grown in the sunny fields of Karnataka. These vine-ripened tomatoes are bursting with flavor and perfect for adding a touch of freshness to your salads, sauces, and sandwiches.",
    price: 60,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Fresh+Tomatoes+1",
      "https://placehold.co/600x400?text=Fresh+Tomatoes+2",
    ],
    tasteProfile: "Sweet, slightly tart, and juicy with a vibrant red color.",
    growingPractices:
      "Our tomatoes are grown using sustainable farming practices that prioritize soil health and water conservation. We use natural fertilizers and pest control methods to ensure the quality and safety of our produce.",
    certifications: ["FSSAI"],
    category: "Veggies",
    farmer: {
      id: "farmer14",
      name: "Rahul Reddy",
      image: "https://placehold.co/600x400?text=Farmer+Rahul+Reddy",
      rating: 4.6,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "15",
    name: "Brown Eggs",
    description:
      "Start your day with our nutritious Brown Eggs, laid by healthy hens raised on our family farm. These eggs are a great source of protein and essential nutrients, perfect for enjoying boiled, scrambled, or in your favorite recipes.",
    price: 120,
    unit: "1 dozen",
    images: [
      "https://placehold.co/600x400?text=Brown+Eggs+1",
      "https://placehold.co/600x400?text=Brown+Eggs+2",
    ],
    tasteProfile: "Rich, creamy, and flavorful with a firm yolk.",
    growingPractices:
      "Our hens are raised in a free-range environment, where they can roam and forage freely. They are fed a natural diet of grains and seeds, resulting in eggs that are rich in nutrients and flavor. We believe in ethical and sustainable farming practices that respect the well-being of our animals.",
    certifications: ["FSSAI"],
    category: "Dairy", // Categorized under Dairy as it's an animal product
    farmer: {
      id: "farmer15",
      name: "Kavita Verma",
      image: "https://placehold.co/600x400?text=Farmer+Kavita+Verma",
      rating: 4.5,
    },
    availableQuantities: ["1 dozen", "2 dozen", "5 dozen"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "16",
    name: "Whole Wheat Flour",
    description:
      "Bake healthy and delicious treats with our Whole Wheat Flour, milled from organically grown wheat. This flour is packed with nutrients and fiber, making it a wholesome choice for your baking needs. Use it to make bread, roti, cakes, or cookies.",
    price: 80,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Whole+Wheat+Flour+1",
      "https://placehold.co/600x400?text=Whole+Wheat+Flour+2",
    ],
    tasteProfile: "Nutty and slightly sweet with a hearty texture.",
    growingPractices:
      "Our wheat is cultivated organically using sustainable farming practices that promote soil health and water conservation. We use natural fertilizers and pest control methods to ensure the quality and safety of our grains.",
    certifications: ["Organic India", "FSSAI"],
    category: "Grains",
    farmer: {
      id: "farmer16",
      name: "Sandeep Yadav",
      image: "https://placehold.co/600x400?text=Farmer+Sandeep+Yadav",
      rating: 4.7,
    },
    availableQuantities: ["1 kg", "5 kg", "10 kg"],
  },
  {
    video: "https://placehold.co/600x400?text=Alphonso+Mangoes+1",
    id: "17",
    name: "Fresh Green Chillies",
    description:
      "Add a fiery kick to your dishes with our Fresh Green Chillies, grown in the sunny fields of Andhra Pradesh. These chillies are known for their vibrant green color, intense heat, and versatility in cooking. Use them sparingly to add a punch of flavor to your curries, stir-fries, and sauces.",
    price: 100,
    unit: "1 kg",
    images: [
      "https://placehold.co/600x400?text=Green+Chillies+1",
      "https://placehold.co/600x400?text=Green+Chillies+2",
    ],
    tasteProfile: "Hot, pungent, and slightly bitter with a crisp texture.",
    growingPractices:
      "Our green chillies are cultivated using sustainable farming practices that prioritize soil health and water conservation. We use natural fertilizers and pest control methods to ensure the quality and safety of our produce.",
    certifications: ["FSSAI"],
    category: "Veggies",
    farmer: {
      id: "farmer17",
      name: "Priya Rao",
      image: "https://placehold.co/600x400?text=Farmer+Priya+Rao",
      rating: 4.4,
    },
    availableQuantities: ["1 kg", "500 g", "250 g"],
  },
];
