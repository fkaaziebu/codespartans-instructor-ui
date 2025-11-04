import { useMutation } from "@apollo/client";
import type {
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables,
} from "@/graphql/generated/graphql";
import { UpdateQuestion } from "@/graphql/mutations/update-question.graphql";

const useUpdateQuestion = () => {
  const [updateQuestion, { loading, error }] = useMutation<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >(UpdateQuestion);

  return { updateQuestion, loading, error };
};

export default useUpdateQuestion;
