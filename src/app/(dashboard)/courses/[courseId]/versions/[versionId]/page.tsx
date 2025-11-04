"use client";
import { ArrowLeft, Edit2, Plus, Trash2, Upload } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  QuestionDifficultyType,
  QuestionTagType,
  QuestionType,
  VersionStatusType,
} from "@/common/graphql/generated/graphql";
import { useAddQuestionsToCourseVersion } from "@/common/hooks/mutations";
import {
  AddQuestionModal,
  RequestReviewModal,
  UploadQuestionsModal,
} from "@/components/modals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

type UploadData = {
  suite_title: string;
  suite_description: string;
  suite_keywords: string[];
  questions: Question[];
};

export default function CourseVersionDetailPage() {
  const { courseId, versionId } = useParams<{
    courseId: string;
    versionId: string;
  }>();
  const searchParams = useSearchParams();
  const versionNumber = searchParams.get("version_number") as VersionStatusType;
  const status = searchParams.get("status") as VersionStatusType;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [suiteTitle, setSuiteTitle] = useState<string>("");
  const [suiteDescription, setSuiteDescription] = useState<string>("");
  const [suiteKeywords, setSuiteKeywords] = useState<string[]>([]);

  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRequestReviewModalOpen, setIsRequestReviewModalOpen] =
    useState(false);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [insertPosition, setInsertPosition] = useState<number | null>(null);
  const router = useRouter();
  const { addQuestionsToCourseVersion } = useAddQuestionsToCourseVersion();

  const version = {
    id: versionId,
    versionNumber: versionNumber,
    description: "Added new React hooks content",
    status: status,
    createdDate: "2023-12-15",
  };

  const handleAddQuestion = (question: Question) => {
    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.question_number === editingQuestion.question_number ? question : q,
        ),
      );
      setEditingQuestion(null);
    } else if (insertPosition !== null) {
      const newQuestions = [...questions];
      newQuestions.splice(insertPosition, 0, {
        ...question,
      });
      setQuestions(newQuestions);
      setInsertPosition(null);
    } else {
      setQuestions([...questions, { ...question }]);
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsAddQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (question_number: number) => {
    setQuestions(
      questions.filter((q) => q.question_number !== question_number),
    );
  };

  const handleInsertQuestion = (position: number) => {
    setInsertPosition(position);
    setIsAddQuestionModalOpen(true);
  };

  const handleSaveQuestions = async () => {
    try {
      await addQuestionsToCourseVersion({
        variables: {
          versionId,
          suiteTitle,
          suiteDescription,
          suiteKeywords,
          questions,
        },
      });

      router.push(`/courses/${courseId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadComplete = (data: UploadData) => {
    setSuiteTitle(data.suite_title);
    setSuiteDescription(data.suite_description);
    setSuiteKeywords(data.suite_keywords);
    setQuestions([...questions, ...data.questions]);
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
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
                  {versionNumber}.0
                </h1>
                {getStatusBadge(status)}
              </div>
              <p className="text-sm text-gray-600">{version.description}</p>
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
              variant="outline"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Questions
            </Button>
            <Button
              onClick={handleSaveQuestions}
              className="bg-gray-800 hover:bg-gray-950"
            >
              Save Questions
            </Button>
          </div>
        </div>

        <div className="flex-1 px-8 py-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-950">Questions</h2>
                <Badge variant="outline">{questions.length} Total</Badge>
              </div>
              <Button
                onClick={() => {
                  setEditingQuestion(null);
                  setInsertPosition(null);
                  setIsAddQuestionModalOpen(true);
                }}
                className="bg-gray-800 hover:bg-gray-950 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>

            <div className="divide-y divide-gray-200">
              {questions.map((question, index) => (
                <div key={question.question_number}>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 flex gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                          {index + 1}
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
                              ⏱️{" "}
                              {(question.estimated_time_in_ms / 1000).toFixed(
                                0,
                              )}
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
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={`${option}`}
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
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditQuestion(question)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteQuestion(question.question_number)
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInsertQuestion(index + 1)}
                      className="w-full border-dashed flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Insert Question Here
                    </Button>
                  </div>
                </div>
              ))}

              {questions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500 mb-4">No questions added yet</p>
                  <Button
                    onClick={() => setIsAddQuestionModalOpen(true)}
                    className="bg-gray-800 hover:bg-gray-950"
                  >
                    Add Your First Question
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddQuestionModal
        open={isAddQuestionModalOpen}
        onClose={() => {
          setIsAddQuestionModalOpen(false);
          setEditingQuestion(null);
          setInsertPosition(null);
        }}
        onSave={handleAddQuestion}
        question={editingQuestion}
        currentNumber={questions.length}
      />

      <UploadQuestionsModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <RequestReviewModal
        open={isRequestReviewModalOpen}
        onClose={() => setIsRequestReviewModalOpen(false)}
        versionId={versionId}
      />
    </div>
  );
}
