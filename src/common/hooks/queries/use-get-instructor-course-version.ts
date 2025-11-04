// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetInstructorCourseVersionQuery,
  GetInstructorCourseVersionQueryVariables,
} from "@/graphql/generated/graphql";
import { GetInstructorCourseVersion } from "@/graphql/queries/get-instructor-course-version.graphql";

// hook
function useGetInstructorCourseVersion(
  args?: GetInstructorCourseVersionQueryVariables,
) {
  const [getInstructorCourseVersion, { data, loading, error }] = useLazyQuery<
    GetInstructorCourseVersionQuery,
    GetInstructorCourseVersionQueryVariables
  >(GetInstructorCourseVersion, {
    variables: args,
  });

  return {
    getInstructorCourseVersion,
    data: data?.getInstructorCourseVersion,
    loading,
    error,
  };
}

export default useGetInstructorCourseVersion;
