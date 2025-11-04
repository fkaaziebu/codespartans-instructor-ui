"use client";
import { useState } from "react";
import {
  useAddCourseVersion,
  useRequestCourseVersionReview,
} from "@/common/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RequestReviewModal({
  open,
  onClose,
  versionId,
}: {
  open: boolean;
  onClose: () => void;
  versionId: string;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const { requestCourseVersionReview } = useRequestCourseVersionReview();

  const handleReview = async () => {
    try {
      setIsCreating(true);
      await requestCourseVersionReview({
        variables: {
          versionId,
        },
      });
      setIsCreating(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Request Version Review
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <p className="text-gray-600">
            Are you sure you want to request a review for this course version?
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              A review will be sent to the organization which the course was
              created for
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleReview}
              disabled={isCreating}
            >
              {isCreating ? "Requesting..." : "Request Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
