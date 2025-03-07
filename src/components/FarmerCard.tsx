import { useState } from "react";
import { Star, MapPin, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ChatModal from "@/components/ChatModal";
import { Farmer } from "../data/farmer-dummy";

interface FarmerCardProps {
  farmer: Farmer;
}

export default function FarmerCard({ farmer }: FarmerCardProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log(farmer, farmer.name);

  return (
    <>
      <div className="overflow-hidden rounded bg-white pb-4 shadow-md">
        <div className="relative">
          <img
            src={"https://placehold.co/600x400"}
            alt={farmer.name}
            className="object-cover"
          />
        </div>
        <div className="px-4 pt-1">
          <div className="mb-0 flex items-center justify-between">
            <h3 className="mt-2 text-lg font-semibold">{farmer.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm">{farmer.rating}</span>
            </div>
          </div>
          <div className="mb-2 -ml-0.5 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{farmer.location}</span>
          </div>
          <div className="mb-2">
            {/* {farmer.verificationBadges.map((badge) => (
              <Badge key={badge} variant="secondary" className="mr-1">
                <Check className="mr-1 h-3 w-3" /> {badge}
              </Badge>
            ))} */}
          </div>
          <div className="mt-4 mb-4">
            <h4 className="mb-1 pb-1 text-sm font-semibold">Products:</h4>
            <div className="flex flex-wrap">
              {farmer.products.map((product) => (
                <Badge
                  key={product}
                  variant="secondary"
                  className="mr-1 mb-1 font-medium shadow-none"
                >
                  {product}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            className="flex w-full items-center justify-center rounded-sm bg-green-700"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat with Farmer
          </Button>
        </div>
      </div>
      {isChatOpen && (
        <ChatModal
          farmerName={farmer.name}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
}
