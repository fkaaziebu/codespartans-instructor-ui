// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetInstructorVersionReviewQuery,
  GetInstructorVersionReviewQueryVariables,
} from "@/graphql/generated/graphql";
import { GetInstructorVersionReview } from "@/graphql/queries/get-instructor-version-review.graphql";

// hook
function useGetInstructorVersionReview(
  args?: GetInstructorVersionReviewQueryVariables,
) {
  const [getInstructorVersionReview, { data, loading, error }] = useLazyQuery<
    GetInstructorVersionReviewQuery,
    GetInstructorVersionReviewQueryVariables
  >(GetInstructorVersionReview, {
    variables: args,
  });

  return {
    getInstructorVersionReview,
    data: data?.getInstructorVersionReview,
    loading,
    error,
  };
}

export default useGetInstructorVersionReview;
