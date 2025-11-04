"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  CurrencyType,
  DomainType,
  LevelType,
} from "@/common/graphql/generated/graphql";
import { useCreateCourse } from "@/common/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type CreateCourseFormInputs = {
  title: string;
  description: string;
  avatar_url: string;
  currency: CurrencyType;
  domains: DomainType[];
  level: LevelType;
  price: number;
};

const courseSchema = z.object({
  title: z.string().min(1, "Course title is required").trim(),
  description: z.string().min(1, "Course description is required").trim(),
  avatar_url: z.string().min(1, "Avatar URL is required").trim(),
  currency: z.enum(CurrencyType),
  domains: z
    .array(z.enum(DomainType))
    .min(1, "At least one domain is required"),
  level: z.enum(LevelType),
  price: z.coerce.number().positive("Price must be a positive number"),
});

export default function CreateCourseModal({
  open,
  courses,
  onClose,
  handleUpdateCourses,
}: {
  open: boolean;
  courses:
    | Array<{
        id: string;
        title: string | undefined;
        total_versions: number | undefined;
        status: "approved" | "pending" | undefined;
      }>
    | undefined;
  onClose: () => void;
  handleUpdateCourses: (
    courses:
      | {
          id: string;
          title: string | undefined;
          total_versions: number | undefined;
          status: "approved" | "pending" | undefined;
        }[]
      | undefined,
  ) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      avatar_url: "",
      currency: CurrencyType.Usd,
      domains: [],
      level: LevelType.Beginner,
      price: 0,
    },
  });
  const { createCourse } = useCreateCourse();
  const organizationId = sessionStorage.getItem("organizationId");

  const selectedDomains = watch("domains") || [];

  const onSubmit: SubmitHandler<CreateCourseFormInputs> = async (data) => {
    const course = await createCourse({
      variables: {
        organizationId: organizationId || "",
        courseInfo: {
          title: data.title,
          avatar_url: data.avatar_url,
          currency: data.currency,
          description: data.description,
          domains: [...data.domains],
          level: data.level,
          price: data.price,
        },
      },
    });

    const instructorCourses:
      | {
          id: string;
          title: string | undefined;
          total_versions: number | undefined;
          status: "approved" | "pending" | undefined;
        }[]
      | undefined = [
      ...courses,
      {
        id: course.data?.createCourse.id || "",
        title: course.data?.createCourse.title,
        total_versions: 0,
        status: "pending",
      },
    ];

    handleUpdateCourses(instructorCourses);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const toggleDomain = (domain: DomainType) => {
    const currentDomains = selectedDomains;
    if (currentDomains.includes(domain)) {
      setValue(
        "domains",
        currentDomains.filter((d) => d !== domain),
      );
    } else {
      setValue("domains", [...currentDomains, domain]);
    }
  };

  console.log(errors);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Create New Course
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-sm font-bold text-gray-800">
              Course Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter course title"
              {...register("title")}
              className={cn(
                "py-5 text-gray-600",
                errors.title ? "border-red-500" : "",
              )}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-bold text-gray-800"
            >
              Course Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter course description"
              {...register("description")}
              rows={4}
              className={cn(
                "text-gray-600",
                errors.description ? "border-red-500" : "",
              )}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="avatar_url"
              className="text-sm font-bold text-gray-800"
            >
              Avatar URL
            </label>
            <Input
              id="avatar_url"
              type="text"
              placeholder="Enter image URL"
              {...register("avatar_url")}
              className={cn(
                "py-5 text-gray-600",
                errors.avatar_url ? "border-red-500" : "",
              )}
            />
            {errors.avatar_url && (
              <span className="text-sm text-red-500">
                {errors.avatar_url.message}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-sm font-bold text-gray-800">
                Currency
              </label>
              <Select
                onValueChange={(value) =>
                  setValue("currency", value.toUpperCase())
                }
              >
                <SelectTrigger
                  className={cn(
                    "py-5 text-gray-600",
                    errors.currency ? "border-red-500" : "",
                  )}
                >
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CurrencyType).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && (
                <span className="text-sm text-red-500">
                  {errors.currency.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label
                htmlFor="price"
                className="text-sm font-bold text-gray-800"
              >
                Price
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price")}
                className={cn(
                  "py-5 text-gray-600",
                  errors.price ? "border-red-500" : "",
                )}
              />
              {errors.price && (
                <span className="text-sm text-red-500">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">Level</label>
            <Select
              onValueChange={(value) => setValue("level", value.toUpperCase())}
            >
              <SelectTrigger
                className={cn(
                  "py-5 text-gray-600",
                  errors.level ? "border-red-500" : "",
                )}
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(LevelType).map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && (
              <span className="text-sm text-red-500">
                {errors.level.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">Domains</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(DomainType).map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => toggleDomain(domain.toUpperCase())}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    selectedDomains.includes(domain.toUpperCase())
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {domain}
                </button>
              ))}
            </div>
            {errors.domains && (
              <span className="text-sm text-red-500">
                {errors.domains.message}
              </span>
            )}
          </div>

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
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
