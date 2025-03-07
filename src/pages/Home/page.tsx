import { products } from "@/data/product-dummy"
import { FarmerProduct, useCart } from "@/context/CartContext"
import { RupeeSymbol } from "@/utils/randomcolor"
import {
  Search,
  Menu,
  CarrotIcon,
  Cherry,
  Milk,
  Star,
  Bean,
  Flame,
  ChevronDown,
  MapPin,
  ArrowRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Map from "@/components/Map"
import { marketplaces } from "@/data/marketplaces"
import MarketplaceCard from "@/components/MarketplaceCard"

export const ProductCard: React.FC<{
  product: FarmerProduct
  onClick: () => void
  onAddToCart: () => void
}> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="relative min-w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-sm">
          <div className="flex items-center text-xs">
            <Star className="mr-0.5 h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{product.farmer.rating}</span>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-3" onClick={onClick}>
        <div className="mb-1 flex items-center">
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
            {product.category}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 h-8 font-medium">{product.name}</h3>
        <div className="mt-1 mb-2 flex items-center">
          <span className="text-xs text-gray-500">{product.farmer.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {RupeeSymbol}
            {product.price}/ {product.unit}
          </p>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        className="absolute right-3 bottom-3 rounded-full bg-green-700 px-3 py-1.5 text-sm text-white shadow-md transition-colors hover:bg-green-800"
        onClick={(e) => {
          e.stopPropagation()
          onAddToCart()
        }}
      >
        ADD
      </button>
    </div>
  )
}

const HomeScreen = () => {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<string>("")
  const [isLocationExpanded, setIsLocationExpanded] = useState(false)
  const navigate = useNavigate()

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  "User-Agent": "ParkEase App (your@email.com)", // Replace with your contact
                },
              }
            )
            const data = await response.json()
            setUserLocation(data.display_name)
            console.log(data)
          } catch (error) {
            setUserLocation("")
            console.error("Error fetching location:", error)
          }
        },
        (error) => {
          setUserLocation("")
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  const truncateLocation = (location: string) => {
    const words = location.split(" ")
    if (words.length <= 2) return location
    return words.slice(0, 2).join(" ") + "..."
  }

  const handleLocationClick = () => {
    setIsLocationExpanded(!isLocationExpanded)
  }

  const handleAddToCart = (product: FarmerProduct) => {
    addToCart(product, 1, product.unit)
  }

  const [selectedCategory, setSelectedCategory] =
    useState<Pick<FarmerProduct, "category">>("Veggies")

  // Update the handleSearch function in Home.tsx
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate("/searchparkingspot", { state: { searchQuery } })
    }
  }

  return (
    <>
      <div className="flex h-full min-h-screen flex-col bg-(--bg-neutral) pb-[11vh]">
        <div className="flex items-center p-4">
          <div className="flex flex-grow items-center">
            <div className="flex items-center">
              <img
                src="https://placehold.co/600x400/teal/gold/"
                alt="Profile"
                className="mr-2 h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">Vinayak Sharma</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mt-1">📍</span>
                  <span>Los Angeles</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="rounded-full border p-3">
              <Search className="size-6 text-gray-700" />
            </div>
            <div className="rounded-full border p-3">
              <Menu className="size-6 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="relative h-[50vh] overflow-hidden">
          <Map onlyMap={true} />
          <div className="absolute inset-0 z-[10] bg-blue-950/50 flex flex-col justify-between h-full p-6">
            <div className="text-white mb-8 flex flex-col justify-between h-full">
              <div className="relative">
                <button
                  onClick={handleLocationClick}
                  className="flex flex-col gap-2 hover:bg-white/10 rounded-lg p-3 transition-all duration-200 w-full"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-100">Your location</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200
                    ${isLocationExpanded ? "rotate-180" : ""} ${
                        window.innerWidth > 768 ? "hidden" : ""
                      }`}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <p className="text-sm text-start font-medium">
                        {!isLocationExpanded && window.innerWidth < 768
                          ? userLocation
                            ? truncateLocation(userLocation)
                            : "Loading location..."
                          : userLocation}
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col">
                <h1 className="text-4xl font-semibold mb-4">
                  Let's find some Farmer's Markets
                </h1>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for parking spots..."
                    className="md:w-1/2 w-full px-4 py-3 pl-12 rounded-lg bg-transparent border 
                    text-white placeholder-white focus:outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Spots Section */}
        <div className="px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Nearby Farmer's Markets</h2>
              <p className="text-gray-500 mb-5">The best farmer's markets near you</p>
            </div>
            <Link to={"/"} className="max-md:hidden">
              <button className="bg-violet-500 text-white px-4 py-2 rounded-lg w-full flex justify-center items-center gap-3 text-center cursor-pointer">
                View More <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketplaces.slice(0, window.innerWidth > 1023 ? 3 : 2).map((marketplace) => (
              <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
            ))}
          </div>
          <Link to={"/"} className="md:hidden ">
            <button className="bg-green-700 text-white px-4 py-2 mt-4 rounded-lg w-full flex justify-center items-center gap-3 text-center cursor-pointer">
              View More <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        <div className="flex-grow overflow-y-auto pt-4">
          <h2 className="mb-4 px-4 text-xl font-bold">Shop By Categories</h2>

          <div className="no-scrollbar mb-2 flex space-x-2 overflow-x-auto px-4 pb-2">
            {[
              {
                icon: CarrotIcon,
                name: "Veggies",
              },
              {
                icon: Cherry,
                name: "Fruits",
              },
              {
                icon: Milk,
                name: "Dairy",
              },

              {
                icon: Bean,
                name: "Grains",
              },

              {
                icon: Flame,
                name: "Spices",
              },
            ].map((item) => (
              <button
                className={`flex items-center gap-2 rounded-full ${
                  selectedCategory == item.name
                    ? "bg-green-700 text-white"
                    : "border bg-white"
                } px-4 py-3 font-medium whitespace-nowrap`}
                onClick={() => setSelectedCategory(item.name)}
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pt-1">
            {products
              .filter((product) => {
                if (product.category == selectedCategory) return true
                return false
              })
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between px-4">
              <h2 className="text-xl font-bold">Best Farmers</h2>
              <a href="#" className="text-sm font-medium text-green-600">
                View all
              </a>
            </div>
            <div className="no-scrollbar flex space-x-3 overflow-x-auto px-4 pt-2 pb-4">
              {[
                {
                  img: "https://media.gettyimages.com/id/538620640/photo/indian-farmer-holding-freshly-picked-capsicums.jpg?s=612x612&w=0&k=20&c=8dUyuHwUU545sCtgFbdnpujNxP50PxrcEzDoO7IxLi0=",
                  name: "S. Anant",
                  review: "4.9",
                },
                {
                  img: "https://media.gettyimages.com/id/1313437484/photo/farmer-with-arms-crossed-in-agriculture-field.jpg?s=612x612&w=0&k=20&c=EOmZnOHSFxn3ffF1QLKKZDKiGMnpfuuLSIlPsSXfLQ8=",
                  name: "A. Prakash",
                  review: "4.9",
                },
                {
                  img: "https://media.gettyimages.com/id/1186928936/photo/wheat-grains-in-man-hand-stock-photo.jpg?s=612x612&w=0&k=20&c=ALHedSbQ9QKD3Mgz4FutPqTvZu14Y6OxIKLb7xq9HLA=",
                  name: "D. Singh",
                  review: "4.8",
                },
                {
                  img: "https://media.gettyimages.com/id/1524726433/photo/farmer-woman-holding-crop-at-green-agricultural-field.jpg?s=612x612&w=0&k=20&c=6C7a03yrQ5Z8LGnA1JvPKkitD9s156_fwjHVikL-z2k=",
                  name: "Kutu Tai",
                  review: "4.8",
                },
                {
                  img: "https://media.gettyimages.com/id/1205325344/photo/farmer-in-agricultural-field.jpg?s=612x612&w=0&k=20&c=krsRk4T2MsmMy6PmrpPDR0i_1ja3_jQaNl80fBejWck=",
                  name: "Birju",
                  review: "4.8",
                },
              ].map((farmer) => (
                <div className="flex flex-col items-center">
                  <img
                    src={farmer.img}
                    alt="Farmer"
                    className="mb-1 size-20 min-w-20 rounded-full object-cover"
                  />
                  <p className="text-xs font-medium">{farmer.name}</p>
                  <div className="mt-1 flex items-center rounded-full bg-white px-2 py-0.5 text-xs">
                    <span className="mr-1 text-yellow-500">★</span>
                    <span>{farmer.review}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 mb-4 flex items-center justify-between px-4">
            <h2 className="text-xl font-bold">Recently Listed</h2>
            <a href="#" className="text-sm font-medium text-green-600">
              View all
            </a>
          </div>
          <div className="no-scrollbar mb-6 flex gap-4 overflow-x-auto p-4 pt-1">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.id}`)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeScreen