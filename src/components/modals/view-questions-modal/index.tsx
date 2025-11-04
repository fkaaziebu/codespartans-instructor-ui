"use client";
import { useEffect, useState } from "react";
import {
  Question,
  QuestionDifficultyType,
} from "@/common/graphql/generated/graphql";
import { useListInstructorQuestionsForVersion } from "@/common/hooks/queries";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ViewQuestionsModal({
  open,
  onClose,
  versionId,
}: {
  open: boolean;
  onClose: () => void;
  versionId: string;
}) {
  const [questions, setQuestions] = useState<Question[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const { listInstructorQuestionsForVersion } =
    useListInstructorQuestionsForVersion();

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API
      const response = await listInstructorQuestionsForVersion({
        variables: {
          versionId,
          pagination: {
            first: 1000,
          },
        },
      });

      const allQuestions: Question[] | undefined =
        response.data?.listInstructorQuestionsForVersion.edges.map((edge) => ({
          id: edge.node.id,
          correct_answer: edge.node.correct_answer,
          description: edge.node.description,
          difficulty: edge.node.difficulty,
          estimated_time_in_ms: edge.node.estimated_time_in_ms,
          hints: edge.node.hints,
          options: edge.node.options,
          question_number: edge.node.question_number,
          solution_steps: edge.node.solution_steps,
          tags: edge.node.tags,
          type: edge.node.type,
        }));

      setQuestions(
        [...(allQuestions || [])].sort(
          (a, b) => a.question_number - b.question_number,
        ),
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchQuestions();
    }
  }, [open, versionId]);

  const getDifficultyBadge = (
    difficulty: QuestionDifficultyType | undefined,
  ) => {
    const colors: {
      [key: string]: string;
    } = {
      [`${QuestionDifficultyType.Easy}`]: "bg-green-100 text-green-800",
      [`${QuestionDifficultyType.Medium}`]: "bg-yellow-100 text-yellow-800",
      [`${QuestionDifficultyType.Hard}`]: "bg-red-100 text-red-800",
    };
    return (
      <Badge
        className={`${colors[difficulty || ""]} hover:${colors[difficulty || ""]}`}
      >
        {difficulty}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-950">
              Course Questions
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{questions?.length} Total Questions</Badge>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading questions...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions?.map((question) => (
                <div
                  key={question.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-700 flex-shrink-0">
                      {question.question_number}
                    </div>
                    <div className="flex-1 flex flex-col space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-medium text-gray-900">
                          {question.description}
                        </p>
                        {getDifficultyBadge(question.difficulty)}
                        <Badge variant="outline" className="text-xs">
                          {question.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                        <span>
                          ⏱️ {(question.estimated_time_in_ms / 1000).toFixed(0)}
                          s
                        </span>
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {question.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag.replace("TAG_", "")}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        {question.options?.map((option, optIndex) => (
                          <div
                            key={option}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                              question.correct_answer === option
                                ? "bg-green-50 border border-green-200"
                                : "bg-gray-50"
                            }`}
                          >
                            <span className="text-sm font-medium text-gray-600">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                            {question.correct_answer === option && (
                              <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">
                                Correct
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>

                      {question.hints && question.hints.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <p className="text-xs font-bold text-blue-900 mb-1">
                            Hints:
                          </p>
                          <ul className="text-xs text-blue-800 space-y-1">
                            {question.hints.map((hint) => (
                              <li key={hint}>• {hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {question.solution_steps &&
                        question.solution_steps.length > 0 && (
                          <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                            <p className="text-xs font-bold text-purple-900 mb-1">
                              Solution Steps:
                            </p>
                            <ol className="text-xs text-purple-800 space-y-1 list-decimal list-inside">
                              {question.solution_steps.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {questions?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500">No questions available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
