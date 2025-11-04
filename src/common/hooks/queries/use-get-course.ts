// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  GetCourseQuery,
  GetCourseQueryVariables,
} from "@/graphql/generated/graphql";
import { GetCourse } from "@/graphql/queries/get-course.graphql";

// hook
function useGetCourse(args?: GetCourseQueryVariables) {
  const [getCourse, { data, loading, error }] = useLazyQuery<
    GetCourseQuery,
    GetCourseQueryVariables
  >(GetCourse, {
    variables: args,
    fetchPolicy: 'no-cache'
  });

  return {
    getCourse,
    data: data?.getCourse,
    loading,
    error,
  };
}

export default useGetCourse;
