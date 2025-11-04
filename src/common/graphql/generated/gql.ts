/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AddCourseVersion($courseId: String!) {\n  addCourseVersion(courseId: $courseId) {\n    id\n    version_number\n    status\n    inserted_at\n  }\n}": typeof types.AddCourseVersionDocument,
    "mutation AddQuestionsToCourseVersion($versionId: String!, $questions: [QuestionInput!]!, $suiteTitle: String!, $suiteDescription: String!, $suiteKeywords: [String!]!) {\n  addQuestionsToCourseVersion(\n    versionId: $versionId\n    questions: $questions\n    suiteTitle: $suiteTitle\n    suiteDescription: $suiteDescription\n    suiteKeywords: $suiteKeywords\n  ) {\n    id\n  }\n}": typeof types.AddQuestionsToCourseVersionDocument,
    "mutation CreateCourse($organizationId: String!, $courseInfo: CourseInfoInput!) {\n  createCourse(organizationId: $organizationId, courseInfo: $courseInfo) {\n    id\n    title\n  }\n}": typeof types.CreateCourseDocument,
    "mutation RequestCourseVersionReview($versionId: String!) {\n  requestCourseVersionReview(versionId: $versionId) {\n    id\n  }\n}": typeof types.RequestCourseVersionReviewDocument,
    "mutation UpdateIssue($issueId: String!, $issueStatus: IssueStatusType!, $response: String!) {\n  updateIssue(issueId: $issueId, issueStatus: $issueStatus, response: $response) {\n    id\n    description\n    response\n    status\n  }\n}": typeof types.UpdateIssueDocument,
    "mutation UpdateQuestion($questionId: String!, $question: QuestionInput!) {\n  updateQuestion(questionId: $questionId, question: $question) {\n    id\n    correct_answer\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": typeof types.UpdateQuestionDocument,
    "query GetCourse($courseId: String!) {\n  getCourse(courseId: $courseId) {\n    id\n    title\n    description\n    approved_version {\n      id\n      version_number\n      status\n      inserted_at\n      questions {\n        id\n      }\n      assigned_admin {\n        name\n      }\n    }\n    versions {\n      id\n      version_number\n      inserted_at\n      status\n      assigned_admin {\n        name\n      }\n      questions {\n        id\n      }\n    }\n  }\n}": typeof types.GetCourseDocument,
    "query GetInstructorCourseVersion($versionId: String!) {\n  getInstructorCourseVersion(versionId: $versionId) {\n    id\n    version_number\n    status\n    course {\n      title\n      instructor {\n        name\n      }\n    }\n    review_request {\n      inserted_at\n    }\n    reviews {\n      id\n      title\n      message\n      inserted_at\n      status\n      total_issues\n    }\n    total_questions\n    total_reviews\n  }\n}": typeof types.GetInstructorCourseVersionDocument,
    "query GetInstructorVersionReview($reviewId: String!) {\n  getInstructorVersionReview(reviewId: $reviewId) {\n    id\n    inserted_at\n    message\n    status\n    title\n    course_version {\n      version_number\n      course {\n        title\n      }\n      questions {\n        id\n        question_number\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        solution_steps\n        tags\n        type\n      }\n    }\n    issues {\n      id\n      description\n      status\n      response\n    }\n  }\n}": typeof types.GetInstructorVersionReviewDocument,
    "query ListCourses($searchTerm: String, $pagination: PaginationInput) {\n  listCourses(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        title\n        approved_version {\n          id\n        }\n        versions {\n          id\n        }\n      }\n    }\n  }\n}": typeof types.ListCoursesDocument,
    "query ListInstructorQuestionsForVersion($versionId: String!, $searchTerm: String, $pagination: PaginationInput) {\n  listInstructorQuestionsForVersion(\n    versionId: $versionId\n    searchTerm: $searchTerm\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n    }\n  }\n}": typeof types.ListInstructorQuestionsForVersionDocument,
    "query LoginInstructor($email: String!, $password: String!) {\n  loginInstructor(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}": typeof types.LoginInstructorDocument,
};
const documents: Documents = {
    "mutation AddCourseVersion($courseId: String!) {\n  addCourseVersion(courseId: $courseId) {\n    id\n    version_number\n    status\n    inserted_at\n  }\n}": types.AddCourseVersionDocument,
    "mutation AddQuestionsToCourseVersion($versionId: String!, $questions: [QuestionInput!]!, $suiteTitle: String!, $suiteDescription: String!, $suiteKeywords: [String!]!) {\n  addQuestionsToCourseVersion(\n    versionId: $versionId\n    questions: $questions\n    suiteTitle: $suiteTitle\n    suiteDescription: $suiteDescription\n    suiteKeywords: $suiteKeywords\n  ) {\n    id\n  }\n}": types.AddQuestionsToCourseVersionDocument,
    "mutation CreateCourse($organizationId: String!, $courseInfo: CourseInfoInput!) {\n  createCourse(organizationId: $organizationId, courseInfo: $courseInfo) {\n    id\n    title\n  }\n}": types.CreateCourseDocument,
    "mutation RequestCourseVersionReview($versionId: String!) {\n  requestCourseVersionReview(versionId: $versionId) {\n    id\n  }\n}": types.RequestCourseVersionReviewDocument,
    "mutation UpdateIssue($issueId: String!, $issueStatus: IssueStatusType!, $response: String!) {\n  updateIssue(issueId: $issueId, issueStatus: $issueStatus, response: $response) {\n    id\n    description\n    response\n    status\n  }\n}": types.UpdateIssueDocument,
    "mutation UpdateQuestion($questionId: String!, $question: QuestionInput!) {\n  updateQuestion(questionId: $questionId, question: $question) {\n    id\n    correct_answer\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": types.UpdateQuestionDocument,
    "query GetCourse($courseId: String!) {\n  getCourse(courseId: $courseId) {\n    id\n    title\n    description\n    approved_version {\n      id\n      version_number\n      status\n      inserted_at\n      questions {\n        id\n      }\n      assigned_admin {\n        name\n      }\n    }\n    versions {\n      id\n      version_number\n      inserted_at\n      status\n      assigned_admin {\n        name\n      }\n      questions {\n        id\n      }\n    }\n  }\n}": types.GetCourseDocument,
    "query GetInstructorCourseVersion($versionId: String!) {\n  getInstructorCourseVersion(versionId: $versionId) {\n    id\n    version_number\n    status\n    course {\n      title\n      instructor {\n        name\n      }\n    }\n    review_request {\n      inserted_at\n    }\n    reviews {\n      id\n      title\n      message\n      inserted_at\n      status\n      total_issues\n    }\n    total_questions\n    total_reviews\n  }\n}": types.GetInstructorCourseVersionDocument,
    "query GetInstructorVersionReview($reviewId: String!) {\n  getInstructorVersionReview(reviewId: $reviewId) {\n    id\n    inserted_at\n    message\n    status\n    title\n    course_version {\n      version_number\n      course {\n        title\n      }\n      questions {\n        id\n        question_number\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        solution_steps\n        tags\n        type\n      }\n    }\n    issues {\n      id\n      description\n      status\n      response\n    }\n  }\n}": types.GetInstructorVersionReviewDocument,
    "query ListCourses($searchTerm: String, $pagination: PaginationInput) {\n  listCourses(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        title\n        approved_version {\n          id\n        }\n        versions {\n          id\n        }\n      }\n    }\n  }\n}": types.ListCoursesDocument,
    "query ListInstructorQuestionsForVersion($versionId: String!, $searchTerm: String, $pagination: PaginationInput) {\n  listInstructorQuestionsForVersion(\n    versionId: $versionId\n    searchTerm: $searchTerm\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n    }\n  }\n}": types.ListInstructorQuestionsForVersionDocument,
    "query LoginInstructor($email: String!, $password: String!) {\n  loginInstructor(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}": types.LoginInstructorDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddCourseVersion($courseId: String!) {\n  addCourseVersion(courseId: $courseId) {\n    id\n    version_number\n    status\n    inserted_at\n  }\n}"): (typeof documents)["mutation AddCourseVersion($courseId: String!) {\n  addCourseVersion(courseId: $courseId) {\n    id\n    version_number\n    status\n    inserted_at\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddQuestionsToCourseVersion($versionId: String!, $questions: [QuestionInput!]!, $suiteTitle: String!, $suiteDescription: String!, $suiteKeywords: [String!]!) {\n  addQuestionsToCourseVersion(\n    versionId: $versionId\n    questions: $questions\n    suiteTitle: $suiteTitle\n    suiteDescription: $suiteDescription\n    suiteKeywords: $suiteKeywords\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation AddQuestionsToCourseVersion($versionId: String!, $questions: [QuestionInput!]!, $suiteTitle: String!, $suiteDescription: String!, $suiteKeywords: [String!]!) {\n  addQuestionsToCourseVersion(\n    versionId: $versionId\n    questions: $questions\n    suiteTitle: $suiteTitle\n    suiteDescription: $suiteDescription\n    suiteKeywords: $suiteKeywords\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCourse($organizationId: String!, $courseInfo: CourseInfoInput!) {\n  createCourse(organizationId: $organizationId, courseInfo: $courseInfo) {\n    id\n    title\n  }\n}"): (typeof documents)["mutation CreateCourse($organizationId: String!, $courseInfo: CourseInfoInput!) {\n  createCourse(organizationId: $organizationId, courseInfo: $courseInfo) {\n    id\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RequestCourseVersionReview($versionId: String!) {\n  requestCourseVersionReview(versionId: $versionId) {\n    id\n  }\n}"): (typeof documents)["mutation RequestCourseVersionReview($versionId: String!) {\n  requestCourseVersionReview(versionId: $versionId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateIssue($issueId: String!, $issueStatus: IssueStatusType!, $response: String!) {\n  updateIssue(issueId: $issueId, issueStatus: $issueStatus, response: $response) {\n    id\n    description\n    response\n    status\n  }\n}"): (typeof documents)["mutation UpdateIssue($issueId: String!, $issueStatus: IssueStatusType!, $response: String!) {\n  updateIssue(issueId: $issueId, issueStatus: $issueStatus, response: $response) {\n    id\n    description\n    response\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateQuestion($questionId: String!, $question: QuestionInput!) {\n  updateQuestion(questionId: $questionId, question: $question) {\n    id\n    correct_answer\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"): (typeof documents)["mutation UpdateQuestion($questionId: String!, $question: QuestionInput!) {\n  updateQuestion(questionId: $questionId, question: $question) {\n    id\n    correct_answer\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCourse($courseId: String!) {\n  getCourse(courseId: $courseId) {\n    id\n    title\n    description\n    approved_version {\n      id\n      version_number\n      status\n      inserted_at\n      questions {\n        id\n      }\n      assigned_admin {\n        name\n      }\n    }\n    versions {\n      id\n      version_number\n      inserted_at\n      status\n      assigned_admin {\n        name\n      }\n      questions {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query GetCourse($courseId: String!) {\n  getCourse(courseId: $courseId) {\n    id\n    title\n    description\n    approved_version {\n      id\n      version_number\n      status\n      inserted_at\n      questions {\n        id\n      }\n      assigned_admin {\n        name\n      }\n    }\n    versions {\n      id\n      version_number\n      inserted_at\n      status\n      assigned_admin {\n        name\n      }\n      questions {\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetInstructorCourseVersion($versionId: String!) {\n  getInstructorCourseVersion(versionId: $versionId) {\n    id\n    version_number\n    status\n    course {\n      title\n      instructor {\n        name\n      }\n    }\n    review_request {\n      inserted_at\n    }\n    reviews {\n      id\n      title\n      message\n      inserted_at\n      status\n      total_issues\n    }\n    total_questions\n    total_reviews\n  }\n}"): (typeof documents)["query GetInstructorCourseVersion($versionId: String!) {\n  getInstructorCourseVersion(versionId: $versionId) {\n    id\n    version_number\n    status\n    course {\n      title\n      instructor {\n        name\n      }\n    }\n    review_request {\n      inserted_at\n    }\n    reviews {\n      id\n      title\n      message\n      inserted_at\n      status\n      total_issues\n    }\n    total_questions\n    total_reviews\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetInstructorVersionReview($reviewId: String!) {\n  getInstructorVersionReview(reviewId: $reviewId) {\n    id\n    inserted_at\n    message\n    status\n    title\n    course_version {\n      version_number\n      course {\n        title\n      }\n      questions {\n        id\n        question_number\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        solution_steps\n        tags\n        type\n      }\n    }\n    issues {\n      id\n      description\n      status\n      response\n    }\n  }\n}"): (typeof documents)["query GetInstructorVersionReview($reviewId: String!) {\n  getInstructorVersionReview(reviewId: $reviewId) {\n    id\n    inserted_at\n    message\n    status\n    title\n    course_version {\n      version_number\n      course {\n        title\n      }\n      questions {\n        id\n        question_number\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        solution_steps\n        tags\n        type\n      }\n    }\n    issues {\n      id\n      description\n      status\n      response\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListCourses($searchTerm: String, $pagination: PaginationInput) {\n  listCourses(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        title\n        approved_version {\n          id\n        }\n        versions {\n          id\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ListCourses($searchTerm: String, $pagination: PaginationInput) {\n  listCourses(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        id\n        title\n        approved_version {\n          id\n        }\n        versions {\n          id\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListInstructorQuestionsForVersion($versionId: String!, $searchTerm: String, $pagination: PaginationInput) {\n  listInstructorQuestionsForVersion(\n    versionId: $versionId\n    searchTerm: $searchTerm\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n    }\n  }\n}"): (typeof documents)["query ListInstructorQuestionsForVersion($versionId: String!, $searchTerm: String, $pagination: PaginationInput) {\n  listInstructorQuestionsForVersion(\n    versionId: $versionId\n    searchTerm: $searchTerm\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LoginInstructor($email: String!, $password: String!) {\n  loginInstructor(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}"): (typeof documents)["query LoginInstructor($email: String!, $password: String!) {\n  loginInstructor(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;