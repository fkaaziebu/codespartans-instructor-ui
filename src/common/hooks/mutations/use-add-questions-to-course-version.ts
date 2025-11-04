import { useMutation } from "@apollo/client";
import type {
  AddQuestionsToCourseVersionMutation,
  AddQuestionsToCourseVersionMutationVariables,
} from "@/graphql/generated/graphql";
import { AddQuestionsToCourseVersion } from "@/graphql/mutations/add-questions-to-course-version.graphql";

const useAddQuestionsToCourseVersion = () => {
  const [addQuestionsToCourseVersion, { loading, error }] = useMutation<
    AddQuestionsToCourseVersionMutation,
    AddQuestionsToCourseVersionMutationVariables
  >(AddQuestionsToCourseVersion);

  return { addQuestionsToCourseVersion, loading, error };
};

export default useAddQuestionsToCourseVersion;
