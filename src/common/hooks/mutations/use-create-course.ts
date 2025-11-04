import { useMutation } from "@apollo/client";
import type {
  CreateCourseMutation,
  CreateCourseMutationVariables,
} from "@/graphql/generated/graphql";
import { CreateCourse } from "@/graphql/mutations/create-course.graphql";

const useCreateCourse = () => {
  const [createCourse, { loading, error }] = useMutation<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >(CreateCourse);

  return { createCourse, loading, error };
};

export default useCreateCourse;
