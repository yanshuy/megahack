"use client";

import type React from "react";
import { useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { farmers, Review } from "@/data/farmer-dummy";

export const ReviewSection = ({ farm }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, comment });
  };

  return (
    <div className="py-8">
      <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

      {/* Review Form */}
      <form
        onSubmit={handleSubmitReview}
        className="mb-1 rounded-lg bg-transparent p-6 pl-1"
      >
        <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
        <div className="mb-4 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
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
      <div className="flex flex-col items-center justify-center space-y-3 px-2">
        {farmers[Math.round(Math.random())].reviews.map((review: Review) => (
          <div key={review.id} className="pb-4">
            <div className="mb-3 flex items-center gap-4">
              <User />
              <div>
                <h4 className="font-semibold">{review.userName}</h4>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
          </div>
        ))}
        <button className="rounded-lg border border-gray-300 px-4 py-2">
          Read more
        </button>
      </div>
    </div>
  );
};
