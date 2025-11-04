"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  QuestionDifficultyType,
  QuestionTagType,
  QuestionType,
} from "@/common/graphql/generated/graphql";
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

type Question = {
  question_number: number;
  description: string;
  options: string[];
  correct_answer: string;
  hints: string[];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: number;
  solution_steps: string[];
  tags: QuestionTagType[];
  type: QuestionType;
};

const questionSchema = z.object({
  question_number: z.coerce
    .number()
    .positive("Question number must be positive"),
  description: z.string().min(1, "Description is required").trim(),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required"),
  correct_answer: z.string().min(1, "Please select a correct answer"),
  hints: z.array(z.string()).optional(),
  difficulty: z.enum(QuestionDifficultyType),
  estimated_time_in_ms: z.coerce.number().positive("Time must be positive"),
  solution_steps: z.array(z.string()).optional(),
  tags: z.array(z.enum(QuestionTagType)).min(1, "At least one tag is required"),
  type: z.enum(QuestionType),
});

export default function AddQuestionModal({
  open,
  onClose,
  onSave,
  question,
  currentNumber,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  question: Question | null;
  currentNumber: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question_number: 1,
      description: "",
      options: ["", "", "", ""],
      correct_answer: "",
      hints: [],
      difficulty: QuestionDifficultyType.Easy,
      estimated_time_in_ms: 30000,
      solution_steps: [],
      tags: [],
      type: QuestionType.MultipleChoice,
    },
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: "options",
  });

  const {
    fields: hintFields,
    append: appendHint,
    remove: removeHint,
  } = useFieldArray({
    control,
    name: "hints",
  });

  const {
    fields: solutionFields,
    append: appendSolution,
    remove: removeSolution,
  } = useFieldArray({
    control,
    name: "solution_steps",
  });

  const selectedTags = watch("tags") || [];

  useEffect(() => {
    if (question && open) {
      reset({
        question_number: question.question_number || currentNumber + 1,
        description: question.description || "",
        options: question.options,
        correct_answer: question.correct_answer,
        hints: question.hints || [],
        difficulty: question.difficulty || "Easy",
        estimated_time_in_ms: question.estimated_time_in_ms || 30000,
        solution_steps: question.solution_steps || [],
        tags: question.tags || [],
        type: question.type || QuestionType,
      });
    } else if (!open) {
      reset({
        question_number: currentNumber + 1,
        description: "",
        options: ["", "", "", ""],
        correct_answer: "",
        hints: [],
        difficulty: QuestionDifficultyType.Easy,
        estimated_time_in_ms: 30000,
        solution_steps: [],
        tags: [],
        type: QuestionType.MultipleChoice,
      });
    }
  }, [question, open, reset]);

  const onSubmit: SubmitHandler<Question> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const formattedQuestion = {
      ...data,
      hints: data.hints.filter((h) => h.trim() !== ""),
      solution_steps: data.solution_steps.filter((s) => s.trim() !== ""),
    };

    onSave(formattedQuestion);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const toggleTag = (tag: QuestionTagType) => {
    const currentTags = selectedTags;
    if (currentTags.includes(tag)) {
      setValue(
        "tags",
        currentTags.filter((t) => t !== tag),
      );
    } else {
      setValue("tags", [...currentTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            {question ? "Edit Question" : "Add Question"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-6 mt-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-bold text-gray-800"
            >
              Description
            </label>
            <Textarea
              id="description"
              {...register("description")}
              rows={2}
              placeholder="Brief description of the question..."
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

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-sm font-bold text-gray-800">Type</label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                value={watch("type")}
              >
                <SelectTrigger
                  className={cn(
                    "py-5 text-gray-600",
                    errors.type ? "border-red-500" : "",
                  )}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(QuestionType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <span className="text-sm text-red-500">
                  {errors.type.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label className="text-sm font-bold text-gray-800">
                Difficulty
              </label>
              <Select
                onValueChange={(value) => setValue("difficulty", value)}
                value={watch("difficulty")}
              >
                <SelectTrigger
                  className={cn(
                    "py-5 text-gray-600",
                    errors.difficulty ? "border-red-500" : "",
                  )}
                >
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(QuestionDifficultyType).map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <span className="text-sm text-red-500">
                  {errors.difficulty.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 flex-1">
              <label
                htmlFor="questionNumber"
                className="text-sm font-bold text-gray-800"
              >
                Question Number
              </label>
              <Input
                id="questionNumber"
                disabled
                type="number"
                {...register("question_number")}
                className={cn(
                  "py-5 text-gray-600",
                  errors.question_number ? "border-red-500" : "",
                )}
                defaultValue={currentNumber + 1}
              />
              {errors.question_number && (
                <span className="text-sm text-red-500">
                  {errors.question_number.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 flex-1">
              <label
                htmlFor="estimatedTimeInMs"
                className="text-sm font-bold text-gray-800"
              >
                Estimated Time (seconds)
              </label>
              <Input
                id="estimatedTimeInMs"
                type="number"
                onChange={(e) =>
                  setValue(
                    "estimated_time_in_ms",
                    Number(e.target.value) * 1000,
                  )
                }
                value={watch("estimated_time_in_ms") / 1000}
                className={cn(
                  "py-5 text-gray-600",
                  errors.estimated_time_in_ms ? "border-red-500" : "",
                )}
              />
              {errors.estimated_time_in_ms && (
                <span className="text-sm text-red-500">
                  {errors.estimated_time_in_ms.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">Tags</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(QuestionTagType).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    selectedTags.includes(tag)
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
            {errors.tags && (
              <span className="text-sm text-red-500">
                {errors.tags.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Answer Options
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendOption("")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Option
              </Button>
            </div>

            <div className="flex flex-col space-y-3">
              {optionFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="radio"
                      {...register("correct_answer")}
                      value={watch(`options.${index}`)}
                      className="mt-3 w-4 h-4 text-gray-800 cursor-pointer"
                    />
                    <div className="flex-1 flex flex-col space-y-1">
                      <Input
                        {...register(`options.${index}`)}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className={cn(
                          "py-5 text-gray-600",
                          errors.options?.[index] ? "border-red-500" : "",
                        )}
                      />
                      {errors.options?.[index] && (
                        <span className="text-sm text-red-500">
                          {errors.options[index].message}
                        </span>
                      )}
                    </div>
                    {optionFields.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="mt-1"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {errors.options && (
              <span className="text-sm text-red-500">
                {errors.options.message}
              </span>
            )}
            {errors.correct_answer && (
              <span className="text-sm text-red-500">
                {errors.correct_answer.message}
              </span>
            )}

            <p className="text-xs text-gray-500">
              Select the radio button next to the correct answer
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Hints (Optional)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendHint("")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Hint
              </Button>
            </div>

            {hintFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`hints.${index}`)}
                  placeholder={`Hint ${index + 1}`}
                  className="py-5 text-gray-600"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHint(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-800">
                Solution Steps (Optional)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSolution("")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </Button>
            </div>

            {solutionFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`solution_steps.${index}`)}
                  placeholder={`Step ${index + 1}`}
                  className="py-5 text-gray-600"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSolution(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : question
                  ? "Update Question"
                  : "Add Question"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
