"use client";
import { ArrowLeft, Eye, Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ReviewStatusType,
  VersionStatusType,
} from "@/common/graphql/generated/graphql";
import { useGetInstructorCourseVersion } from "@/common/hooks/queries";
import { RequestReviewModal, ViewQuestionsModal } from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InstructorVersionDetailPage() {
  const [isViewQuestionsModalOpen, setIsViewQuestionsModalOpen] =
    useState(false);
  const router = useRouter();
  const { courseId, versionId } = useParams<{
    courseId: string;
    versionId: string;
  }>();
  const { getInstructorCourseVersion } = useGetInstructorCourseVersion();
  const [versionDetails, setVersionDetails] = useState<
    | {
        id: string | undefined;
        course_name: string | undefined;
        version_number: number | undefined;
        status: VersionStatusType | undefined;
        date_assigned: string | undefined;
        number_of_questions: number | undefined;
        instructor_name: string | undefined;
      }
    | undefined
  >();
  const [reviews, setReviews] = useState<
    | {
        id: string | undefined;
        title: string | undefined;
        review_message: string | undefined;
        number_of_issues: number | undefined;
        status: ReviewStatusType | undefined;
        date_created: string | undefined;
      }[]
    | undefined
  >();
  const [isRequestReviewModalOpen, setIsRequestReviewModalOpen] =
    useState(false);

  const getVersionDetails = async () => {
    try {
      const response = await getInstructorCourseVersion({
        variables: {
          versionId,
        },
        fetchPolicy: "no-cache",
      });

      setVersionDetails({
        id: response.data?.getInstructorCourseVersion.id,
        course_name: response.data?.getInstructorCourseVersion.course?.title,
        version_number:
          response.data?.getInstructorCourseVersion.version_number,
        status: response.data?.getInstructorCourseVersion.status,
        date_assigned:
          response.data?.getInstructorCourseVersion.review_request?.inserted_at,
        number_of_questions:
          response.data?.getInstructorCourseVersion.total_questions,
        instructor_name:
          response.data?.getInstructorCourseVersion.course?.instructor?.name,
      });

      const versionReviews =
        response.data?.getInstructorCourseVersion.reviews.map((review) => ({
          id: review.id,
          title: review.title,
          review_message: review.message,
          number_of_issues: review.total_issues,
          status: review.status,
          date_created: review.inserted_at,
        }));

      setReviews(versionReviews);
    } catch (error) {
      console.log(error);
    }
  };

  const getVersionStatusBadge = (status: VersionStatusType | undefined) => {
    const statusConfig: {
      [key: string]: {
        className: string;
        label: string;
      };
    } = {
      [`${VersionStatusType.Pending}`]: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        label: "Pending",
      },
      completed: {
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        label: "Completed",
      },
      [`${VersionStatusType.Approved}`]: {
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        label: "Approved",
      },
      rejected: {
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        label: "Rejected",
      },
    };

    const config =
      statusConfig[status || ""] ||
      statusConfig[`${VersionStatusType.Pending}`];

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getReviewStatusBadge = (status: ReviewStatusType | undefined) => {
    const statusConfig: {
      [key: string]: {
        className: string;
        label: string;
      };
    } = {
      [`${ReviewStatusType.Open}`]: {
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        label: "Pending",
      },
      [`${ReviewStatusType.Closed}`]: {
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        label: "Approved",
      },
    };

    const config =
      statusConfig[status || ""] || statusConfig[`${ReviewStatusType.Open}`];

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleReviewClick = (reviewId: string) => {
    router.push(
      `/courses/${courseId}/versions/${versionId}/reviews/${reviewId}`,
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    getVersionDetails();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push(`/courses/${courseId}`)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-950">
                  {versionDetails?.course_name}
                </h1>
                {getVersionStatusBadge(versionDetails?.status)}
              </div>
              <p className="text-sm text-gray-600">
                Version {versionDetails?.version_number} • Assigned{" "}
                {formatDate(versionDetails?.date_assigned || "")} •{" "}
                {versionDetails?.number_of_questions} Questions
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsRequestReviewModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Request Review
            </Button>
            <Button
              onClick={() => setIsViewQuestionsModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Questions
            </Button>
          </div>
        </div>

        <div className="flex-1 px-8 py-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-bold text-blue-900">
                  Course Information
                </h3>
                <div className="flex items-center gap-4 text-sm text-blue-700">
                  <span>
                    <span className="font-medium">Instructor:</span>{" "}
                    {versionDetails?.instructor_name}
                  </span>
                  <span>•</span>
                  <span>
                    <span className="font-medium">Total Reviews:</span>{" "}
                    {reviews?.length}
                  </span>
                  <span>•</span>
                  <span>
                    <span className="font-medium">Questions:</span>{" "}
                    {versionDetails?.number_of_questions}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-950">Reviews</h2>
                <Badge variant="outline">{reviews?.length} Total</Badge>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Review Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      No. of Issues
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reviews?.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleReviewClick(review.id || "")}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {review.review_message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {review.number_of_issues}
                          </span>
                          {(review.number_of_issues || 0) > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-red-50 text-red-700 border-red-200"
                            >
                              Issues Found
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getReviewStatusBadge(review.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDate(review.date_created || "")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reviews?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 mb-4">No reviews created yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ViewQuestionsModal
        open={isViewQuestionsModalOpen}
        onClose={() => setIsViewQuestionsModalOpen(false)}
        versionId={versionId}
      />
      <RequestReviewModal
        open={isRequestReviewModalOpen}
        onClose={() => setIsRequestReviewModalOpen(false)}
        versionId={versionId}
      />
    </div>
  );
}
