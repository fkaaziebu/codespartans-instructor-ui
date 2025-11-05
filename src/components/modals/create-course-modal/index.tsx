"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Camera, Check, Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
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
  avatar_url: z.string().min(1, "Course avatar is required").trim(),
  currency: z.nativeEnum(CurrencyType),
  domains: z
    .array(z.nativeEnum(DomainType))
    .min(1, "At least one domain is required"),
  level: z.nativeEnum(LevelType),
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
  } = useForm<CreateCourseFormInputs>({
    // @ts-expect-error error
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

  // Image upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const selectedDomains = watch("domains") || [];

  // Upload image to server
  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = sessionStorage.getItem("token") || "";

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await axios.post(
        "http://3.68.98.186:4000/v1/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      clearInterval(progressInterval);

      const data = response.data;
      if (!data.path) {
        setUploadProgress(0);
        setUploadComplete(false);
        throw new Error("No image Path returned from upload");
      }

      setUploadProgress(100);
      const avatarUrl = `http://3.68.98.186:4000/v1/images/${data.path}`;
      setValue("avatar_url", avatarUrl);
      setUploadComplete(true);

      toast.success("Image uploaded successfully!");
      return avatarUrl;
    } catch (error) {
      console.error("Upload error:", error);
      setUploadComplete(false);
      setUploadProgress(0);
      toast.error("Failed to upload image. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection with auto-upload
  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("Image size should be less than 10MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Auto-upload the image
      try {
        await uploadImage(file);
      } catch (error) {
        console.error("Auto-upload failed:", error);
      }
    },
    [setValue],
  );

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadComplete(false);
    setUploadProgress(0);
    setValue("avatar_url", "");
  };

  const onSubmit: SubmitHandler<CreateCourseFormInputs> = async (data) => {
    if (!uploadComplete) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const organizationId = sessionStorage.getItem("organizationId");
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
      ...(courses || []),
      {
        id: course.data?.createCourse.id || "",
        title: course.data?.createCourse.title,
        total_versions: 0,
        status: "pending",
      },
    ];

    handleUpdateCourses(instructorCourses);
    handleResetForm();
    onClose();
  };

  const handleResetForm = () => {
    reset();
    setSelectedImage(null);
    setImagePreview(null);
    setUploadComplete(false);
    setUploadProgress(0);
  };

  const handleClose = () => {
    handleResetForm();
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Create New Course
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={
            // @ts-expect-error error
            handleSubmit(onSubmit)
          }
          className="flex flex-col space-y-4 mt-4"
        >
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

          {/* Image Upload Section */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">
              Course Avatar
            </label>

            {!selectedImage ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer",
                  errors.avatar_url ? "border-red-500" : "border-gray-300",
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Upload Course Avatar
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Drag and drop an image here, or click to select a file
                </p>
                <div className="flex justify-center gap-3">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Recommended: 800x600px, max 10MB
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview || undefined}
                  alt="Course avatar preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />

                {/* Upload Progress Overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 min-w-[200px]">
                      <div className="flex items-center justify-center mb-2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Uploading... {uploadProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${uploadProgress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Success Indicator */}
                {uploadComplete && !isUploading && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Upload Status */}
            {selectedImage && (
              <div className="text-sm">
                {isUploading ? (
                  <div className="flex items-center text-blue-600">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading image...
                  </div>
                ) : uploadComplete ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    Image uploaded successfully
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Ready to upload
                  </div>
                )}
              </div>
            )}

            {errors.avatar_url && (
              <span className="text-sm text-red-500">
                {errors.avatar_url.message}
              </span>
            )}

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-sm font-bold text-gray-800">
                Currency
              </label>
              <Select
                onValueChange={(value) =>
                  setValue("currency", value.toUpperCase() as CurrencyType)
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
              onValueChange={(value) =>
                setValue("level", value.toUpperCase() as LevelType)
              }
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
                  onClick={() =>
                    toggleDomain(domain.toUpperCase() as DomainType)
                  }
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    selectedDomains.includes(domain.toUpperCase() as DomainType)
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
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              disabled={isSubmitting || isUploading || !uploadComplete}
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
