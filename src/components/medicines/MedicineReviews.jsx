"use client";

import React, { useState } from "react";
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

const MOCK_REVIEWS = [
  {
    id: 1,
    user: "Ahmed R.",
    date: "Oct 12, 2026",
    rating: 5,
    comment: "Very effective medicine. The delivery from MediStore was extremely fast and the packaging was perfectly sealed.",
    likes: 12,
  },
  {
    id: 2,
    user: "Sarah K.",
    date: "Sep 28, 2026",
    rating: 4,
    comment: "Good product, exactly as prescribed by my doctor. Price comparison helped me find the best deal.",
    likes: 5,
  },
  {
    id: 3,
    user: "Dr. Hasan",
    date: "Sep 15, 2026",
    rating: 5,
    comment: "I frequently recommend this brand to my patients. The marketplace guarantee gives peace of mind regarding authenticity.",
    likes: 24,
  },
  {
    id: 4,
    user: "Nazmun N.",
    date: "Aug 02, 2026",
    rating: 4,
    comment: "The packaging was good and expiration date is far away. Satisfied with the service.",
    likes: 3,
  },
  {
    id: 5,
    user: "Faisal A.",
    date: "Jul 18, 2026",
    rating: 5,
    comment: "I always use MediStore for my monthly medicines. Never had an issue with counterfeit products.",
    likes: 8,
  },
  {
    id: 6,
    user: "Rafiq M.",
    date: "Jun 30, 2026",
    rating: 5,
    comment: "Excellent experience. Got exactly what was described. Highly recommended.",
    likes: 1,
  },
  {
    id: 7,
    user: "Samia T.",
    date: "May 22, 2026",
    rating: 3,
    comment: "Delivery took a bit longer than expected, but the product is genuine.",
    likes: 2,
  },
  {
    id: 8,
    user: "Hossain",
    date: "May 10, 2026",
    rating: 5,
    comment: "Very cheap compared to local pharmacies and the quality is guaranteed.",
    likes: 15,
  }
];

export default function MedicineReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setShowReviewForm(false);
    toast.success("Thank you! Your review has been submitted for moderation.", {
      icon: "⭐",
      style: {
        borderRadius: "16px",
        background: "#0d9488",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
      },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xs mt-8 space-y-8">
      {/* Header & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-teal-500" />
            Customer Reviews
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified ratings and feedback from our users.
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
          <div className="text-center">
            <span className="text-3xl font-black text-slate-900 dark:text-white block leading-none mb-1">
              4.8
            </span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block">
              128 Ratings
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-450">
              Based on recent purchases
            </span>
          </div>
        </div>
      </div>

      {/* Write a Review Button / Form */}
      <div>
        {!showReviewForm ? (
          <Button
            variant="outline"
            onClick={() => setShowReviewForm(true)}
            className="rounded-xl font-bold border-teal-500/20 text-teal-650 hover:bg-teal-50/50 dark:text-teal-400 dark:border-teal-400/20 dark:hover:bg-teal-950/30 cursor-pointer"
          >
            Write a Review
          </Button>
        ) : (
          <form onSubmit={handleReviewSubmit} className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Share your experience</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button type="button" key={star} className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer">
                  <Star className="h-6 w-6" />
                </button>
              ))}
            </div>
            <textarea
              required
              rows="3"
              placeholder="How was the product? Did it work well for you?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-all resize-none"
            ></textarea>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowReviewForm(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="rounded-xl font-bold cursor-pointer">
                Submit Review
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {review.user}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-slate-200 dark:text-slate-700"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400 font-semibold">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
