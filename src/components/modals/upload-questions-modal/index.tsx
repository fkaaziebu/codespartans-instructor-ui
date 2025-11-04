"use client";
import { FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  QuestionDifficultyType,
  QuestionTagType,
  QuestionType,
} from "@/common/graphql/generated/graphql";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

export default function UploadQuestionsModal({
  open,
  onClose,
  onUploadComplete,
}: {
  open: boolean;
  onClose: () => void;
  onUploadComplete: (data: UploadData) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError("");

    if (selectedFile) {
      // Only accept JSON files
      if (
        selectedFile.type !== "application/json" &&
        !selectedFile.name.endsWith(".json")
      ) {
        setError("Please upload a valid JSON file");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateQuestion = (question: any, index: number): string | null => {
    if (
      !question.question_number ||
      typeof question.question_number !== "number"
    ) {
      return `Question ${index + 1}: Missing or invalid question_number`;
    }
    if (!question.description || typeof question.description !== "string") {
      return `Question ${index + 1}: Missing or invalid description`;
    }
    if (!Array.isArray(question.options) || question.options.length < 2) {
      return `Question ${index + 1}: Must have at least 2 options`;
    }
    if (
      !question.correct_answer ||
      typeof question.correct_answer !== "string"
    ) {
      return `Question ${index + 1}: Missing or invalid correct_answer`;
    }
    if (!question.options.includes(question.correct_answer)) {
      return `Question ${index + 1}: correct_answer must be one of the options`;
    }

    // Validate difficulty
    const validDifficulties = ["EASY", "MEDIUM", "HARD"];
    if (
      !question.difficulty ||
      !validDifficulties.includes(question.difficulty)
    ) {
      return `Question ${index + 1}: Invalid difficulty (must be EASY, MEDIUM, or HARD)`;
    }

    // Validate type
    const validTypes = ["MULTIPLE_CHOICE", "MULTIPLE_SELECT", "FILL_IN"];
    if (!question.type || !validTypes.includes(question.type)) {
      return `Question ${index + 1}: Invalid type (must be MULTIPLE_CHOICE, MULTIPLE_SELECT, or FILL_IN)`;
    }

    if (
      !question.estimated_time_in_ms ||
      typeof question.estimated_time_in_ms !== "number"
    ) {
      return `Question ${index + 1}: Missing or invalid estimated_time_in_ms`;
    }

    // Validate tags
    if (!Array.isArray(question.tags) || question.tags.length === 0) {
      return `Question ${index + 1}: Must have at least one tag`;
    }
    const validTags = [
      "TAG_GENERAL",
      "TAG_ALGORITHM",
      "TAG_DATA_STRUCTURE",
      "TAG_DATABASE",
      "TAG_NETWORK",
      "TAG_SECURITY",
      "TAG_SYSTEM",
      "TAG_WEB",
    ];
    for (const tag of question.tags) {
      if (!validTags.includes(tag)) {
        return `Question ${index + 1}: Invalid tag "${tag}" (must be one of: ${validTags.join(", ")})`;
      }
    }

    return null;
  };

  const validateSuiteFields = (data: any): string | null => {
    // Validate suite_title
    if (!data.suite_title || typeof data.suite_title !== "string") {
      return "Missing or invalid suite_title";
    }
    if (data.suite_title.trim().length < 3) {
      return "suite_title must be at least 3 characters long";
    }

    // Validate suite_description
    if (!data.suite_description || typeof data.suite_description !== "string") {
      return "Missing or invalid suite_description";
    }
    if (data.suite_description.trim().length < 10) {
      return "suite_description must be at least 10 characters long";
    }

    // Validate suite_keywords
    if (!Array.isArray(data.suite_keywords)) {
      return "suite_keywords must be an array";
    }
    if (data.suite_keywords.length === 0) {
      return "suite_keywords must have at least one keyword";
    }
    for (let i = 0; i < data.suite_keywords.length; i++) {
      if (typeof data.suite_keywords[i] !== "string") {
        return `suite_keywords[${i}] must be a string`;
      }
      if (data.suite_keywords[i].trim().length === 0) {
        return `suite_keywords[${i}] cannot be empty`;
      }
    }

    return null;
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fileContent = await file.text();

      let parsedData: any;
      try {
        parsedData = JSON.parse(fileContent);
      } catch (parseError) {
        setError("Invalid JSON format. Please check your file.");
        setUploading(false);
        return;
      }

      // Validate suite fields
      const suiteValidationError = validateSuiteFields(parsedData);
      if (suiteValidationError) {
        setError(suiteValidationError);
        setUploading(false);
        return;
      }

      // Check if the JSON has a "questions" array
      if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
        setError("JSON must contain a 'questions' array");
        setUploading(false);
        return;
      }

      const questionsArray = parsedData.questions;

      if (questionsArray.length === 0) {
        setError("No questions found in the file");
        setUploading(false);
        return;
      }

      // Validate each question
      for (let i = 0; i < questionsArray.length; i++) {
        const validationError = validateQuestion(questionsArray[i], i);
        if (validationError) {
          setError(validationError);
          setUploading(false);
          return;
        }
      }

      // Transform questions to match the expected format
      const formattedQuestions: Question[] = questionsArray.map((q) => ({
        question_number: q.question_number,
        description: q.description,
        options: q.options,
        correct_answer: q.correct_answer,
        hints: q.hints || [],
        difficulty: q.difficulty as QuestionDifficultyType,
        estimated_time_in_ms: q.estimated_time_in_ms,
        solution_steps: q.solution_steps || [],
        tags: q.tags as QuestionTagType[],
        type: q.type as QuestionType,
      }));

      // Prepare upload data with suite fields
      const uploadData: UploadData = {
        suite_title: parsedData.suite_title.trim(),
        suite_description: parsedData.suite_description.trim(),
        suite_keywords: parsedData.suite_keywords.map((k: string) => k.trim()),
        questions: formattedQuestions,
      };

      onUploadComplete(uploadData);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Upload Questions Suite
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-800">
              Select File
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2 text-center">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mb-4">
                JSON files only (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".json,application/json"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  asChild
                >
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          </div>

          {file && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-bold text-blue-900 mb-2">
              JSON Format Requirements:
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-blue-800 mb-1">
                  Suite Fields (Required):
                </p>
                <ul className="text-xs text-blue-700 space-y-1 ml-3">
                  <li>
                    • <span className="font-medium">suite_title</span>: Title of
                    the test suite (min 3 chars)
                  </li>
                  <li>
                    • <span className="font-medium">suite_description</span>:
                    Description of the suite (min 10 chars)
                  </li>
                  <li>
                    • <span className="font-medium">suite_keywords</span>: Array
                    of keywords (at least 1)
                  </li>
                  <li>
                    • <span className="font-medium">questions</span>: Array of
                    question objects
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800 mb-1">
                  Question Fields (Required):
                </p>
                <ul className="text-xs text-blue-700 space-y-1 ml-3">
                  <li>• question_number, description, options (array)</li>
                  <li>• correct_answer (must match one option)</li>
                  <li>• difficulty: EASY, MEDIUM, or HARD</li>
                  <li>• type: MULTIPLE_CHOICE, MULTIPLE_SELECT, or FILL_IN</li>
                  <li>• estimated_time_in_ms (number)</li>
                  <li>
                    • tags: TAG_GENERAL, TAG_ALGORITHM, TAG_DATA_STRUCTURE,
                    TAG_DATABASE, TAG_NETWORK, TAG_SECURITY, TAG_SYSTEM, TAG_WEB
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-800 mb-1">
                  Optional Fields:
                </p>
                <ul className="text-xs text-blue-700 space-y-1 ml-3">
                  <li>• hints (array of strings)</li>
                  <li>• solution_steps (array of strings)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs font-bold text-purple-900 mb-2">
              Example JSON Structure:
            </p>
            <pre className="text-xs text-purple-800 overflow-x-auto">
              {`{
  "suite_title": "React Fundamentals",
  "suite_description": "Test your knowledge of React basics",
  "suite_keywords": ["React", "JSX", "Components"],
  "questions": [
    {
      "question_number": 1,
      "description": "What is JSX?",
      "options": ["JavaScript XML", "Java Syntax", "JSON"],
      "correct_answer": "JavaScript XML",
      "hints": ["It's used in React"],
      "difficulty": "EASY",
      "estimated_time_in_ms": 30000,
      "solution_steps": ["JSX is a syntax extension"],
      "tags": ["TAG_WEB"],
      "type": "MULTIPLE_CHOICE"
    }
  ]
}`}
            </pre>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 bg-gray-800 hover:bg-gray-950"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload Suite"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
