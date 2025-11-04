import { useMutation } from "@apollo/client";
import type {
  AddCourseVersionMutation,
  AddCourseVersionMutationVariables,
} from "@/graphql/generated/graphql";
import { AddCourseVersion } from "@/graphql/mutations/add-course-version.graphql";

const useAddCourseVersion = () => {
  const [addCourseVersion, { loading, error }] = useMutation<
    AddCourseVersionMutation,
    AddCourseVersionMutationVariables
  >(AddCourseVersion);

  return { addCourseVersion, loading, error };
};

export default useAddCourseVersion;
