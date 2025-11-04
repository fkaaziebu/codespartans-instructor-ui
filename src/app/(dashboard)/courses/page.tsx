"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useListCourses } from "@/common/hooks/queries";
import { CreateCourseModal } from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InstructorDashboard() {
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [courses, setCourses] = useState<
    | {
        id: string;
        title: string | undefined;
        total_versions: number | undefined;
        status: "approved" | "pending" | undefined;
      }[]
    | undefined
  >([]);
  const router = useRouter();
  const { listCourses } = useListCourses();

  const listInstructorCouses = async () => {
    try {
      const response = await listCourses({
        variables: {
          searchTerm: "",
          pagination: {
            first: 1000,
          },
        },
      });

      // @ts-expect-error err
      if (response?.errors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
        sessionStorage.clear();
        router.push("/login");
      }

      // @ts-expect-error err
      if (response?.errors?.length) {
        // @ts-expect-error err
        throw new Error(response.errors[0].message);
      }

      const instructorCourses:
        | {
            id: string;
            title: string | undefined;
            total_versions: number | undefined;
            status: "approved" | "pending" | undefined;
          }[]
        | undefined = response.data?.listCourses.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        total_versions: edge.node.versions?.length,
        status: edge.node.approved_version ? "approved" : "pending",
      }));

      setCourses(instructorCourses);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "approved") {
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

  const handleCourseClick = (courseId: string) => {
    // Navigate to course detail page
    router.push(`/courses/${courseId}`);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    listInstructorCouses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
          <h1 className="text-2xl font-bold text-gray-950">
            Instructor Dashboard
          </h1>
          <Button
            onClick={() => setIsCreateCourseModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-950"
          >
            Create Course
          </Button>
        </div>

        <div className="flex-1 px-8 py-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-950">My Courses</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Course Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Total Versions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses?.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {course.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {course.total_versions}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(course.status || "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <CreateCourseModal
        open={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        courses={courses}
        handleUpdateCourses={setCourses}
      />
    </div>
  );
}
