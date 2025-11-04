import { useMutation } from "@apollo/client";
import type {
  RequestCourseVersionReviewMutation,
  RequestCourseVersionReviewMutationVariables,
} from "@/graphql/generated/graphql";
import { RequestCourseVersionReview } from "@/graphql/mutations/request-course-version-review.graphql";

const useRequestCourseVersionReview = () => {
  const [requestCourseVersionReview, { loading, error }] = useMutation<
    RequestCourseVersionReviewMutation,
    RequestCourseVersionReviewMutationVariables
  >(RequestCourseVersionReview);

  return { requestCourseVersionReview, loading, error };
};

export default useRequestCourseVersionReview;
