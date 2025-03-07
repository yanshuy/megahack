import { Farmer } from "@/data/farmer-dummy"
import { ArrowLeft, ChevronLast, ChevronLeft, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface FarmerHeaderProps {
  farmer: Farmer
}

export const FarmerHeader = ({ farmer }: FarmerHeaderProps) => {

  const navigate = useNavigate()

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-4 flex justify-center items-center p-1 bg-gray-50 z-10 rounded-full" onClick={() => navigate(-1)}>
        <ChevronLeft className="text-green-700"/>
      </div>
      <div className="w-full h-[400px] relative overflow-hidden rounded-b-xl">
        <img src={farmer.image || "https://images.unsplash.com/photo-1609252509102-aa73ff792667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={farmer.name} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-2">{farmer.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{farmer.rating}</span>
              <span className="text-sm">({farmer.totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{farmer.location}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {/* {farmer?.products.map((category) => (
              <span key={category} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {category}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}

