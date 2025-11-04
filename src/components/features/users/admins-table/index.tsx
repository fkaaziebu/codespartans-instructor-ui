import { AdminResponse } from "@/common/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

export default function AdminsTable({
  admins,
  onViewRequests,
}: {
  admins: AdminResponse[] | undefined;
  onViewRequests?: (adminId: string, type: string) => void;
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
                Assigned Requests
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Completed Requests
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins?.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {admin.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                    onClick={() => onViewRequests?.(admin.id, "assigned")}
                  >
                    {admin.total_course_versions}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                    onClick={() => onViewRequests?.(admin.id, "completed")}
                  >
                    {admin.total_approved_course_versions}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
