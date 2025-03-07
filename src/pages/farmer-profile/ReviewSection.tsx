"use client"

import type React from "react"
import { useState } from "react"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Farmer, Review } from "@/data/farmer-dummy"

interface ReviewSectionProps {
  farmer: Farmer
}

export const ReviewSection = ({ farmer }: ReviewSectionProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log({ rating, comment })
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="mb-1 bg-transparent p-6 pl-1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
              <Star
                className={`w-6 h-6 ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="mb-4"
          rows={4}
        />
        <Button type="submit">Submit Review</Button>
      </form>

      {/* Review List */}
      <div className="space-y-3 px-2 flex flex-col items-center justify-center">
        {farmer.reviews.map((review: Review) => (
          <div key={review.id} className="pb-4">
            <div className="flex items-center gap-4 mb-3">
              <User />
              <div>
                <h4 className="font-semibold">{review.userName}</h4>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}
        <button className="border border-gray-300 rounded-lg px-4 py-2">Read more</button>
      </div>
    </div>
  )
}