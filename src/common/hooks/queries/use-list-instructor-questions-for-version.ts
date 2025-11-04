// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListInstructorQuestionsForVersionQuery,
  ListInstructorQuestionsForVersionQueryVariables,
} from "@/graphql/generated/graphql";
import { ListInstructorQuestionsForVersion } from "@/graphql/queries/list-instructor-questions-for-version.graphql";

// hook
function useListInstructorQuestionsForVersion(
  args?: ListInstructorQuestionsForVersionQueryVariables,
) {
  const [listInstructorQuestionsForVersion, { data, loading, error }] =
    useLazyQuery<
      ListInstructorQuestionsForVersionQuery,
      ListInstructorQuestionsForVersionQueryVariables
    >(ListInstructorQuestionsForVersion, {
      variables: args,
    });

  return {
    listInstructorQuestionsForVersion,
    data: data?.listInstructorQuestionsForVersion,
    loading,
    error,
  };
}

export default useListInstructorQuestionsForVersion;
