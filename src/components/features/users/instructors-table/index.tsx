import { InstructorResponse } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

export default function InstructorsTable({
  instructors,
  onViewReviews,
}: {
  instructors: InstructorResponse[] | undefined;
  onViewReviews: (instructorId: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Courses Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Requested Reviews
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Approved Courses
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {instructors?.map((instructor) => (
              <tr key={instructor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {instructor.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {instructor.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {instructor.total_created_courses}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                    onClick={() => onViewReviews(instructor.id)}
                  >
                    {instructor.total_requested_reviews}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {instructor.total_approved_courses}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
