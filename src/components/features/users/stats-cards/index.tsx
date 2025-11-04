import {
  CheckCircle,
  ClipboardList,
  FileText,
  UserCheck,
  Users,
} from "lucide-react";
import { StatsResponse } from "@/common/graphql/generated/graphql";

export default function StatsCards({
  stats,
}: {
  stats: StatsResponse | undefined;
}) {
  const cards = [
    {
      title: "Total Instructors",
      value: stats?.total_instructors,
      icon: Users,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Admins",
      value: stats?.total_admins,
      icon: UserCheck,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Requested Reviews",
      value: stats?.total_requested_reviews,
      icon: FileText,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Assigned Requests",
      value: stats?.total_assigned_reviews,
      icon: ClipboardList,
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Completed Requests",
      value: stats?.total_completed_reviews,
      icon: CheckCircle,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex-1 min-w-[200px] bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  {card.title}
                </span>
                <span className="text-3xl font-bold text-gray-950">
                  {card.value}
                </span>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
