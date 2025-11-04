import { useMutation } from "@apollo/client";
import type {
  UpdateIssueMutation,
  UpdateIssueMutationVariables,
} from "@/graphql/generated/graphql";
import { UpdateIssue } from "@/graphql/mutations/update-issue.graphql";

const useUpdateIssue = () => {
  const [updateIssue, { loading, error }] = useMutation<
    UpdateIssueMutation,
    UpdateIssueMutationVariables
  >(UpdateIssue);

  return { updateIssue, loading, error };
};

export default useUpdateIssue;
