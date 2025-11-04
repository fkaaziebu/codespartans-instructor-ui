"use client";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VersionStatusType } from "@/common/graphql/generated/graphql";
import { useGetCourse } from "@/common/hooks/queries";
import { CreateCourseVersionModal } from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CourseDetailPage() {
  const [isCreateVersionModalOpen, setIsCreateVersionModalOpen] =
    useState(false);
  const [course, setCourse] = useState<{
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    status: "approved" | "pending" | undefined;
  }>();
  const [currentApprovedVersion, setCurrentApprovedVersion] = useState<{
    id: string | undefined;
    version_number: number | undefined;
    status: VersionStatusType | undefined;
    created_date: Date;
    total_questions: number | undefined;
    assigned_admin: string | undefined;
  }>();
  const [versions, setVersions] = useState<
    | {
        id: string | undefined;
        version_number: number | undefined;
        status: VersionStatusType | undefined;
        created_date: Date;
        total_questions: number | undefined;
        is_current_approved: boolean;
        assigned_admin: string | undefined;
      }[]
    | undefined
  >();
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const { getCourse } = useGetCourse();

  const getCourseDetail = async () => {
    try {
      const response = await getCourse({
        variables: {
          courseId,
        },
      });

      const currentCourse = response.data?.getCourse;
      setCourse({
        id: currentCourse?.id,
        title: currentCourse?.title,
        description: currentCourse?.description,
        status: currentCourse?.approved_version ? "approved" : "pending",
      });
      setCurrentApprovedVersion({
        id: currentCourse?.approved_version?.id,
        version_number: currentCourse?.approved_version?.version_number,
        status: currentCourse?.approved_version?.status,
        created_date: currentCourse?.approved_version?.inserted_at,
        total_questions: currentCourse?.approved_version?.questions?.length,
        assigned_admin: currentCourse?.approved_version?.assigned_admin?.name,
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
        | undefined = currentCourse?.versions?.map((version) => ({
        id: version.id,
        version_number: version.version_number,
        status: version.status,
        created_date: version.inserted_at,
        total_questions: version.questions?.length,
        is_current_approved: version.id === currentCourse.approved_version?.id,
        assigned_admin: version.assigned_admin?.name,
      }));

      setVersions(allVersions);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status: VersionStatusType | undefined) => {
    if (status === VersionStatusType.Approved) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Approved
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        Pending
      </Badge>
    );
  };

  const handleVersionClick = (
    versionId: string,
    versionNumber: number | undefined,
    versionStatus: VersionStatusType | undefined,
    versionHasQuestions: boolean = false,
  ) => {
    if (!versionHasQuestions) {
      router.push(
        `/courses/${courseId}/versions/${versionId}?version_number=${versionNumber}&status=${versionStatus}`,
      );
    } else {
      router.push(`/courses/${courseId}/versions/${versionId}/reviews`);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    getCourseDetail();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/courses")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-950">
                {course?.title}
              </h1>
              <p className="text-sm text-gray-600">{course?.description}</p>
            </div>
          </div>
          <Button
            onClick={() => setIsCreateVersionModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-950"
          >
            Create Version
          </Button>
        </div>

        <div className="flex-1 px-8 py-6">
          {currentApprovedVersion?.id && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-sm font-bold text-blue-900">
                    Current Approved Version
                  </h3>
                  <p className="text-3xl font-bold text-blue-950">
                    {currentApprovedVersion.version_number}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-blue-700">
                    <span>
                      {currentApprovedVersion.total_questions} Questions
                    </span>
                    <span>•</span>
                    <span>
                      Created{" "}
                      {new Date(
                        currentApprovedVersion?.created_date,
                      ).toISOString()}
                    </span>
                  </div>
                  {currentApprovedVersion.assigned_admin && (
                    <p className="text-sm text-blue-700">
                      Reviewed by {currentApprovedVersion.assigned_admin}
                    </p>
                  )}
                </div>
                <Button
                  onClick={() =>
                    handleVersionClick(
                      `${currentApprovedVersion.id}`,
                      currentApprovedVersion?.version_number,
                      currentApprovedVersion.status,
                    )
                  }
                  variant="outline"
                  className="border-blue-300 text-blue-900 hover:bg-blue-100"
                >
                  View Details
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-950">All Versions</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total versions: {versions?.length}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Assigned Admin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Current
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {versions?.map((version) => (
                    <tr
                      key={version.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        handleVersionClick(
                          `${version.id}`,
                          version.version_number,
                          version.status,
                          (version?.total_questions || 0) > 0,
                        )
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {version.version_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(version?.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(version?.created_date).toISOString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {version.total_questions}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {version.assigned_admin || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {version.is_current_approved && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Current
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <CreateCourseVersionModal
        open={isCreateVersionModalOpen}
        onClose={() => setIsCreateVersionModalOpen(false)}
        courseId={courseId}
        versions={versions}
        handleUpdateVersions={setVersions}
      />
    </div>
  );
}
