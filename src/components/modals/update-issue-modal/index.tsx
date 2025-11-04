"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Issue, IssueStatusType } from "@/common/graphql/generated/graphql";
import { useUpdateIssue } from "@/common/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type UpdateIssueForm = {
  response: string;
  status: IssueStatusType;
};

const updateIssueSchema = z.object({
  response: z
    .string()
    .min(10, "Response must be at least 10 characters")
    .trim(),
  status: z.nativeEnum(IssueStatusType),
});

export default function UpdateIssueModal({
  open,
  onClose,
  issue,
  handleUpdateIssue,
}: {
  open: boolean;
  onClose: () => void;
  issue: Issue | undefined;
  handleUpdateIssue: (issue: Issue | undefined) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<UpdateIssueForm>({
    resolver: zodResolver(updateIssueSchema),
    defaultValues: {
      response: "",
      status: IssueStatusType.InProgress,
    },
  });

  const { updateIssue } = useUpdateIssue();

  const selectedStatus = watch("status");

  useEffect(() => {
    if (open && issue) {
      setValue("status", issue.status || IssueStatusType.InProgress);
      setValue("response", issue.response || "");
    }
  }, [open, issue, setValue]);

  const onSubmit: SubmitHandler<UpdateIssueForm> = async (data) => {
    if (!issue) return;

    try {
      const updatedIssue = await updateIssue({
        variables: {
          issueId: issue.id,
          issueStatus: data.status,
          response: data.response,
        },
      });

      handleUpdateIssue(updatedIssue.data?.updateIssue);
      reset();
      onClose();
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getStatusColor = (status: IssueStatusType) => {
    switch (status) {
      case IssueStatusType.Open:
        return "text-red-700";
      case IssueStatusType.InProgress:
        return "text-yellow-700";
      case IssueStatusType.Resolved:
        return "text-blue-700";
      case IssueStatusType.Closed:
        return "text-gray-700";
      default:
        return "text-gray-700";
    }
  };

  const getStatusDescription = (status: IssueStatusType) => {
    switch (status) {
      case IssueStatusType.Open:
        return "Issue is open and needs attention";
      case IssueStatusType.InProgress:
        return "You are currently working on this issue";
      case IssueStatusType.Resolved:
        return "Issue has been fixed and is awaiting admin verification";
      case IssueStatusType.Closed:
        return "Issue is closed and cannot be modified";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Update Issue
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          {/* Issue Description */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-700 mb-2">
              Issue Description:
            </p>
            <p className="text-sm text-gray-900">{issue?.description}</p>
          </div>

          {/* Status Selector */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="status" className="text-sm font-bold text-gray-800">
              Update Status
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(value: IssueStatusType) =>
                setValue("status", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={IssueStatusType.Open}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Open</span>
                  </div>
                </SelectItem>
                <SelectItem value={IssueStatusType.InProgress}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>In Progress</span>
                  </div>
                </SelectItem>
                <SelectItem value={IssueStatusType.Resolved}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Resolved</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className={`text-xs ${getStatusColor(selectedStatus)}`}>
              {getStatusDescription(selectedStatus)}
            </p>
          </div>

          {/* Response Text Area */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="response"
              className="text-sm font-bold text-gray-800"
            >
              Your Response
            </label>
            <Textarea
              id="response"
              placeholder="Describe what you've done to address this issue or provide an update..."
              {...register("response")}
              rows={6}
              className={cn(
                "text-gray-600",
                errors.response ? "border-red-500" : "",
              )}
            />
            {errors.response && (
              <span className="text-sm text-red-500">
                {errors.response.message}
              </span>
            )}
            <p className="text-xs text-gray-500">
              Provide a detailed response explaining how you've addressed this
              issue. This will be visible to the admin reviewer.
            </p>
          </div>

          {/* Status Update Guide */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs font-bold text-yellow-900 mb-2">
              Status Update Guide:
            </p>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>
                • <span className="font-bold">Open:</span> Issue needs attention
                but you haven't started working on it
              </li>
              <li>
                • <span className="font-bold">In Progress:</span> You're
                currently working on fixing this issue
              </li>
              <li>
                • <span className="font-bold">Resolved:</span> You've fixed the
                issue and it's ready for admin review
              </li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Issue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
