// imports
import { useLazyQuery } from "@apollo/client";
// entities
import type {
  LoginInstructorQuery,
  LoginInstructorQueryVariables,
} from "@/graphql/generated/graphql";
import { LoginInstructor } from "@/graphql/queries/login-instructor.graphql";

// hook
function useLoginInstructor(args?: LoginInstructorQueryVariables) {
  const [loginInstructor, { data, loading, error }] = useLazyQuery<
    LoginInstructorQuery,
    LoginInstructorQueryVariables
  >(LoginInstructor, {
    variables: args,
  });

  return {
    loginInstructor,
    data: data?.loginInstructor,
    loading,
    error,
  };
}

export default useLoginInstructor;
