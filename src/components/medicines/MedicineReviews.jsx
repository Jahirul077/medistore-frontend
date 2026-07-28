"use client";

import React, { useState } from "react";
import { Star, MessageSquare, User, Edit3, Trash2, X } from "lucide-react";
import Button from "@/components/common/Button";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetReviewsByMedicineIdQuery from "@/hooks/Reviews/useGetReviewsByMedicineIdQuery";
import useCreateReviewMutation from "@/hooks/Reviews/useCreateReviewMutation";
import useUpdateReviewMutation from "@/hooks/Reviews/useUpdateReviewMutation";
import useDeleteReviewMutation from "@/hooks/Reviews/useDeleteReviewMutation";

export default function MedicineReviews({ medicineId }) {
  const { user } = useSelector((state) => state.auth || {});

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: resData, isLoading, refetch } = useGetReviewsByMedicineIdQuery(medicineId);
  const reviews = resData?.data || [];

  // Create Review Mutation
  const { mutate: createReview, isPending: isCreating } = useCreateReviewMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Review submitted successfully!");
      resetForm();
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to submit review. Ensure you have purchased this medicine.");
    },
  });

  // Update Review Mutation
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReviewMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Review updated successfully!");
      resetForm();
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update review.");
    },
  });

  // Delete Review Mutation
  const { mutate: deleteReview } = useDeleteReviewMutation({
    onSuccess: (res) => {
      toast.success(res?.message || "Review deleted successfully!");
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete review.");
    },
  });

  const resetForm = () => {
    setShowReviewForm(false);
    setEditingReviewId(null);
    setComment("");
    setRating(5);
  };

  const handleStartEdit = (review) => {
    setEditingReviewId(review.id);
    setRating(review.rating);
    setComment(review.comment);
    setShowReviewForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a comment for your review.");
      return;
    }

    if (editingReviewId) {
      updateReview({
        id: editingReviewId,
        data: { rating, comment },
      });
    } else {
      createReview({
        medicinesId: medicineId,
        rating,
        comment,
      });
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, item) => acc + (Number(item.rating) || 0), 0) / reviews.length).toFixed(1)
    : "5.0";

  const isPending = isCreating || isUpdating;

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
              {avgRating}
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
              {reviews.length} Ratings
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-450">
              Based on customer purchases
            </span>
          </div>
        </div>
      </div>

      {/* Write / Edit Review Button & Form */}
      <div>
        {!showReviewForm ? (
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setShowReviewForm(true);
            }}
            className="rounded-xl font-bold border-teal-500/20 text-teal-650 hover:bg-teal-50/50 dark:text-teal-400 dark:border-teal-400/20 dark:hover:bg-teal-950/30 cursor-pointer"
          >
            Write a Review
          </Button>
        ) : (
          <form onSubmit={handleFormSubmit} className="bg-slate-50 dark:bg-slate-955 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">
                {editingReviewId ? "Edit your review" : "Share your experience"}
              </h4>
              <button
                type="button"
                onClick={resetForm}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-colors cursor-pointer ${star <= rating ? "text-amber-400" : "text-slate-300 dark:text-slate-700"}`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>

            <textarea
              required
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the product? Did it work well for you?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-all resize-none"
            ></textarea>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                className="rounded-xl font-bold cursor-pointer"
              >
                {isPending ? "Saving..." : editingReviewId ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Review List */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && reviews.length === 0 && (
        <div className="text-center py-6 text-slate-500 font-semibold">
          No reviews yet for this medicine. Be the first to leave a review!
        </div>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className="space-y-6 max-h-200 overflow-y-auto pr-2 custom-scrollbar">
          {reviews.map((review) => {
            const dateStr = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Recent";

            const isMyReview = user && review.customer?.id === user.id;

            return (
              <div key={review.id} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {review.customer?.name || "Customer"}
                        </h4>
                        {isMyReview && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border border-teal-200 dark:border-teal-900 rounded-md">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-slate-200 dark:text-slate-700"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400 font-semibold">{dateStr}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for review owner */}
                  {isMyReview && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(review)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        title="Edit review"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors"
                        title="Delete review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
