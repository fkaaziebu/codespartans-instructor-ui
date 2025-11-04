"use client";
import { useState } from "react";
import { VersionStatusType } from "@/common/graphql/generated/graphql";
import { useAddCourseVersion } from "@/common/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateCourseVersionModal({
  open,
  courseId,
  versions,
  onClose,
  handleUpdateVersions,
}: {
  open: boolean;
  courseId: string;
  versions:
    | {
        id: string | undefined;
        version_number: number | undefined;
        status: VersionStatusType | undefined;
        created_date: Date;
        total_questions: number | undefined;
        is_current_approved: boolean;
        assigned_admin: string | undefined;
      }[]
    | undefined;
  onClose: () => void;
  handleUpdateVersions: (
    versions:
      | {
          id: string | undefined;
          version_number: number | undefined;
          status: VersionStatusType | undefined;
          created_date: Date;
          total_questions: number | undefined;
          is_current_approved: boolean;
          assigned_admin: string | undefined;
        }[]
      | undefined,
  ) => void;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const { addCourseVersion } = useAddCourseVersion();

  const handleCreateVersion = async () => {
    try {
      setIsCreating(true);
      const version = await addCourseVersion({
        variables: {
          courseId,
        },
      });

      const allVersions:
        | {
            id: string | undefined;
            version_number: number | undefined;
            status: VersionStatusType | undefined;
            created_date: Date;
            total_questions: number | undefined;
            is_current_approved: boolean;
            assigned_admin: string | undefined;
          }[]
        | undefined = [
        ...(versions || []),
        {
          id: version.data?.addCourseVersion.id,
          version_number: version.data?.addCourseVersion.version_number,
          status: version.data?.addCourseVersion.status,
          created_date: version.data?.addCourseVersion.inserted_at,
          total_questions: 0,
          is_current_approved: false,
          assigned_admin: undefined,
        },
      ];

      handleUpdateVersions(allVersions);
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
            Create New Course Version
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <p className="text-gray-600">
            Are you sure you want to create a new version for this course? A new
            version will be created and you can add questions to it.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              The new version will be created with a status of "Pending" and
              you'll be able to add questions before submitting it for review.
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
              onClick={handleCreateVersion}
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Version"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
