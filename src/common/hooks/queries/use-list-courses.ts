// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  ListCoursesQuery,
  ListCoursesQueryVariables,
} from "@/graphql/generated/graphql";
import { ListCourses } from "@/graphql/queries/list-courses.graphql";

// hook
function useListCourses(args?: ListCoursesQueryVariables) {
  const [listCourses, { data, loading, error }] = useLazyQuery<
    ListCoursesQuery,
    ListCoursesQueryVariables
  >(ListCourses, {
    variables: args,
    fetchPolicy: 'no-cache'
  });

  return {
    listCourses,
    data: data?.listCourses,
    loading,
    error,
  };
}

export default useListCourses;
