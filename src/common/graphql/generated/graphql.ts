/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
};

export type AdminConnection = {
  __typename?: 'AdminConnection';
  count: Scalars['Int']['output'];
  edges: Array<AdminResponseEdge>;
  pageInfo: PageInfo;
};

export type AdminLoginResponse = {
  __typename?: 'AdminLoginResponse';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  token: Scalars['String']['output'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  total_approved_course_versions: Scalars['Float']['output'];
  total_course_versions: Scalars['Float']['output'];
};

export type AdminResponseEdge = {
  __typename?: 'AdminResponseEdge';
  cursor: Scalars['String']['output'];
  node: AdminResponse;
};

export type Cart = {
  __typename?: 'Cart';
  categories?: Maybe<Array<Category>>;
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  student?: Maybe<Student>;
};

export type Category = {
  __typename?: 'Category';
  avatar_url: Scalars['String']['output'];
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  students?: Maybe<Array<Student>>;
};

export type CategoryInfoInput = {
  avatar_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Checkout = {
  __typename?: 'Checkout';
  categories?: Maybe<Array<Category>>;
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  student?: Maybe<Student>;
};

export type Coupon = {
  __typename?: 'Coupon';
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  organization?: Maybe<Organization>;
};

export type Course = {
  __typename?: 'Course';
  approved_version?: Maybe<Version>;
  avatar_url: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  coupons?: Maybe<Array<Coupon>>;
  currency: CurrencyType;
  description: Scalars['String']['output'];
  domains: Array<DomainType>;
  id: Scalars['ID']['output'];
  instructor?: Maybe<Instructor>;
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  versions?: Maybe<Array<Version>>;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  count: Scalars['Int']['output'];
  edges: Array<CourseResponseEdge>;
  pageInfo: PageInfo;
};

export type CourseInfoInput = {
  avatar_url: Scalars['String']['input'];
  currency: CurrencyType;
  description: Scalars['String']['input'];
  domains: Array<DomainType>;
  level: LevelType;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  approved_version?: Maybe<Version>;
  avatar_url: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  coupons?: Maybe<Array<Coupon>>;
  currency: CurrencyType;
  description: Scalars['String']['output'];
  domains: Array<DomainType>;
  estimated_duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  instructor?: Maybe<Instructor>;
  is_subscribed: Scalars['Boolean']['output'];
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  total_questions: Scalars['Float']['output'];
  versions?: Maybe<Array<Version>>;
};

export type CourseResponseEdge = {
  __typename?: 'CourseResponseEdge';
  cursor: Scalars['String']['output'];
  node: CourseResponse;
};

/** Currency */
export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

/** Course domains */
export enum DomainType {
  English = 'ENGLISH',
  Mathematics = 'MATHEMATICS',
  Science = 'SCIENCE'
}

export type Instructor = {
  __typename?: 'Instructor';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
};

export type InstructorConnection = {
  __typename?: 'InstructorConnection';
  count: Scalars['Int']['output'];
  edges: Array<InstructorResponseEdge>;
  pageInfo: PageInfo;
};

export type InstructorLoginResponse = {
  __typename?: 'InstructorLoginResponse';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  token: Scalars['String']['output'];
};

export type InstructorResponse = {
  __typename?: 'InstructorResponse';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  total_approved_courses: Scalars['Float']['output'];
  total_created_courses: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type InstructorResponseEdge = {
  __typename?: 'InstructorResponseEdge';
  cursor: Scalars['String']['output'];
  node: InstructorResponse;
};

export type Issue = {
  __typename?: 'Issue';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  response?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Review>;
  status: IssueStatusType;
};

export type IssueInfoInput = {
  description: Scalars['String']['input'];
};

/** Issue status */
export enum IssueStatusType {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

/** Course level */
export enum LevelType {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCategoryToCart: Cart;
  addCourseToCart: Cart;
  addCourseVersion: Version;
  addCourseVersionReview: Review;
  addCoursesToCategory: Category;
  addQuestionsToCourseVersion: Version;
  addReviewIssue: Issue;
  approveCourseVersion: Version;
  assignCourseVersionForReview: Version;
  closeIssue: Issue;
  closeReview: Review;
  createCategory: Category;
  createCheckout: Checkout;
  createCourse: Course;
  registerAdmin: Admin;
  registerInstructor: Instructor;
  registerOrganization: RegisterResponse;
  registerStudent: RegisterResponse;
  requestCourseVersionReview: ReviewRequest;
  updateCourse: Course;
  updateIssue: Issue;
  updateQuestion: Question;
};


export type MutationAddCategoryToCartArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationAddCourseToCartArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationAddCourseVersionArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationAddCourseVersionReviewArgs = {
  reviewInfo: ReviewInfoInput;
  versionId: Scalars['String']['input'];
};


export type MutationAddCoursesToCategoryArgs = {
  categoryId: Scalars['String']['input'];
  courseIds: Array<Scalars['String']['input']>;
};


export type MutationAddQuestionsToCourseVersionArgs = {
  questions: Array<QuestionInput>;
  suiteDescription: Scalars['String']['input'];
  suiteKeywords: Array<Scalars['String']['input']>;
  suiteTitle: Scalars['String']['input'];
  versionId: Scalars['String']['input'];
};


export type MutationAddReviewIssueArgs = {
  issueInfo: IssueInfoInput;
  reviewId: Scalars['String']['input'];
};


export type MutationApproveCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationAssignCourseVersionForReviewArgs = {
  adminId: Scalars['String']['input'];
  versionId: Scalars['String']['input'];
};


export type MutationCloseIssueArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationCloseReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  categoryInfo: CategoryInfoInput;
};


export type MutationCreateCheckoutArgs = {
  autoApproveSubscription: Scalars['Boolean']['input'];
  checkoutFromCart?: InputMaybe<Scalars['Boolean']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCourseArgs = {
  courseInfo: CourseInfoInput;
  organizationId: Scalars['String']['input'];
};


export type MutationRegisterAdminArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterInstructorArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterOrganizationArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterStudentArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestCourseVersionReviewArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  courseId: Scalars['String']['input'];
  courseInfo: UpdateCourseInfoInput;
};


export type MutationUpdateIssueArgs = {
  issueId: Scalars['String']['input'];
  issueStatus: IssueStatusType;
  response: Scalars['String']['input'];
};


export type MutationUpdateQuestionArgs = {
  question: QuestionInput;
  questionId: Scalars['String']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  admins?: Maybe<Array<Admin>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructors?: Maybe<Array<Instructor>>;
  name: Scalars['String']['output'];
  organizational_categories?: Maybe<Array<Category>>;
  organizational_coupons?: Maybe<Array<Coupon>>;
  organizational_courses?: Maybe<Array<Course>>;
  requested_reviews?: Maybe<Array<ReviewRequest>>;
  students?: Maybe<Array<Student>>;
};

export type OrganizationLoginResponse = {
  __typename?: 'OrganizationLoginResponse';
  admins?: Maybe<Array<Admin>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructors?: Maybe<Array<Instructor>>;
  name: Scalars['String']['output'];
  organizational_categories?: Maybe<Array<Category>>;
  organizational_coupons?: Maybe<Array<Coupon>>;
  organizational_courses?: Maybe<Array<Course>>;
  requested_reviews?: Maybe<Array<ReviewRequest>>;
  students?: Maybe<Array<Student>>;
  token: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getCourse: Course;
  getCourseVersion: VersionResponse;
  getInstructorCourseVersion: VersionResponse;
  getInstructorVersionReview: Review;
  getOrganizationCourse: Course;
  getStats: StatsResponse;
  getVersionReview: Review;
  listAdmins: AdminConnection;
  listAssignedVersions: VersionConnection;
  listCourses: CourseConnection;
  listInstructorQuestionsForVersion: QuestionConnection;
  listInstructors: InstructorConnection;
  listOrganizationCourses: CourseConnection;
  listQuestionsForVersion: QuestionConnection;
  listRequestedReviews: RequestedReviewConnection;
  loginAdmin: AdminLoginResponse;
  loginInstructor: InstructorLoginResponse;
  loginOrganization: OrganizationLoginResponse;
  loginStudent: StudentLoginResponse;
};


export type QueryGetCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type QueryGetInstructorCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type QueryGetInstructorVersionReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type QueryGetOrganizationCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetVersionReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type QueryListAdminsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListCoursesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListInstructorQuestionsForVersionArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  versionId: Scalars['String']['input'];
};


export type QueryListInstructorsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListOrganizationCoursesArgs = {
  organizationId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListQuestionsForVersionArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  versionId: Scalars['String']['input'];
};


export type QueryListRequestedReviewsArgs = {
  filter?: InputMaybe<RequestedReviewFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginInstructorArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginOrganizationArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginStudentArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  correct_answer: Scalars['String']['output'];
  description: Scalars['String']['output'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Float']['output'];
  hints: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  question_number: Scalars['Float']['output'];
  solution_steps: Array<Scalars['String']['output']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
  version?: Maybe<Version>;
};

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  count: Scalars['Int']['output'];
  edges: Array<QuestionTypeClassEdge>;
  pageInfo: PageInfo;
};

/** Question difficulty types */
export enum QuestionDifficultyType {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type QuestionInput = {
  correct_answer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Float']['input'];
  hints: Array<Scalars['String']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  question_number: Scalars['Float']['input'];
  solution_steps: Array<Scalars['String']['input']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
};

/** Question tag types */
export enum QuestionTagType {
  TagAlgorithm = 'TAG_ALGORITHM',
  TagDatabase = 'TAG_DATABASE',
  TagDataStructure = 'TAG_DATA_STRUCTURE',
  TagGeneral = 'TAG_GENERAL',
  TagNetwork = 'TAG_NETWORK',
  TagSecurity = 'TAG_SECURITY',
  TagSystem = 'TAG_SYSTEM',
  TagWeb = 'TAG_WEB'
}

/** Question types */
export enum QuestionType {
  FillIn = 'FILL_IN',
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultipleSelect = 'MULTIPLE_SELECT'
}

export type QuestionTypeClassEdge = {
  __typename?: 'QuestionTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: Question;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
};

export type RequestedReviewConnection = {
  __typename?: 'RequestedReviewConnection';
  count: Scalars['Int']['output'];
  edges: Array<ReviewRequestTypeClassEdge>;
  pageInfo: PageInfo;
};

export type RequestedReviewFilterInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  instructorId?: InputMaybe<Scalars['String']['input']>;
};

export type Review = {
  __typename?: 'Review';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  issues?: Maybe<Array<Issue>>;
  message: Scalars['String']['output'];
  status: ReviewStatusType;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ReviewInfoInput = {
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ReviewRequest = {
  __typename?: 'ReviewRequest';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  organization?: Maybe<Organization>;
  updated_at: Scalars['DateTime']['output'];
};

export type ReviewRequestTypeClassEdge = {
  __typename?: 'ReviewRequestTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: ReviewRequest;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  issues?: Maybe<Array<Issue>>;
  message: Scalars['String']['output'];
  status: ReviewStatusType;
  title: Scalars['String']['output'];
  total_issues: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** Review status */
export enum ReviewStatusType {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type StatsResponse = {
  __typename?: 'StatsResponse';
  total_admins: Scalars['Float']['output'];
  total_assigned_reviews: Scalars['Float']['output'];
  total_completed_reviews: Scalars['Float']['output'];
  total_instructors: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type Student = {
  __typename?: 'Student';
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
};

export type StudentLoginResponse = {
  __typename?: 'StudentLoginResponse';
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
  token: Scalars['String']['output'];
};

export type UpdateCourseInfoInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<CurrencyType>;
  description?: InputMaybe<Scalars['String']['input']>;
  domains?: InputMaybe<Array<DomainType>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Version = {
  __typename?: 'Version';
  assigned_admin?: Maybe<Admin>;
  course?: Maybe<Course>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  questions?: Maybe<Array<Question>>;
  review_request?: Maybe<ReviewRequest>;
  reviews?: Maybe<Array<Review>>;
  status: VersionStatusType;
  updated_at: Scalars['DateTime']['output'];
  version_number: Scalars['Float']['output'];
};

export type VersionConnection = {
  __typename?: 'VersionConnection';
  count: Scalars['Int']['output'];
  edges: Array<VersionResponseEdge>;
  pageInfo: PageInfo;
};

export type VersionResponse = {
  __typename?: 'VersionResponse';
  assigned_admin?: Maybe<Admin>;
  course?: Maybe<Course>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  questions?: Maybe<Array<Question>>;
  review_request?: Maybe<ReviewRequest>;
  reviews: Array<ReviewResponse>;
  status: VersionStatusType;
  total_questions: Scalars['Float']['output'];
  total_reviews: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  version_number: Scalars['Float']['output'];
};

export type VersionResponseEdge = {
  __typename?: 'VersionResponseEdge';
  cursor: Scalars['String']['output'];
  node: VersionResponse;
};

/** Version status */
export enum VersionStatusType {
  Approved = 'APPROVED',
  Archived = 'ARCHIVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type AddCourseVersionMutationVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type AddCourseVersionMutation = { __typename?: 'Mutation', addCourseVersion: { __typename?: 'Version', id: string, version_number: number, status: VersionStatusType, inserted_at: any } };

export type AddQuestionsToCourseVersionMutationVariables = Exact<{
  versionId: Scalars['String']['input'];
  questions: Array<QuestionInput> | QuestionInput;
  suiteTitle: Scalars['String']['input'];
  suiteDescription: Scalars['String']['input'];
  suiteKeywords: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AddQuestionsToCourseVersionMutation = { __typename?: 'Mutation', addQuestionsToCourseVersion: { __typename?: 'Version', id: string } };

export type CreateCourseMutationVariables = Exact<{
  organizationId: Scalars['String']['input'];
  courseInfo: CourseInfoInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string, title: string } };

export type RequestCourseVersionReviewMutationVariables = Exact<{
  versionId: Scalars['String']['input'];
}>;


export type RequestCourseVersionReviewMutation = { __typename?: 'Mutation', requestCourseVersionReview: { __typename?: 'ReviewRequest', id: string } };

export type UpdateIssueMutationVariables = Exact<{
  issueId: Scalars['String']['input'];
  issueStatus: IssueStatusType;
  response: Scalars['String']['input'];
}>;


export type UpdateIssueMutation = { __typename?: 'Mutation', updateIssue: { __typename?: 'Issue', id: string, description: string, response?: string | null, status: IssueStatusType } };

export type UpdateQuestionMutationVariables = Exact<{
  questionId: Scalars['String']['input'];
  question: QuestionInput;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id: string, correct_answer: string, description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType } };

export type GetCourseQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetCourseQuery = { __typename?: 'Query', getCourse: { __typename?: 'Course', id: string, title: string, description: string, approved_version?: { __typename?: 'Version', id: string, version_number: number, status: VersionStatusType, inserted_at: any, questions?: Array<{ __typename?: 'Question', id: string }> | null, assigned_admin?: { __typename?: 'Admin', name: string } | null } | null, versions?: Array<{ __typename?: 'Version', id: string, version_number: number, inserted_at: any, status: VersionStatusType, assigned_admin?: { __typename?: 'Admin', name: string } | null, questions?: Array<{ __typename?: 'Question', id: string }> | null }> | null } };

export type GetInstructorCourseVersionQueryVariables = Exact<{
  versionId: Scalars['String']['input'];
}>;


export type GetInstructorCourseVersionQuery = { __typename?: 'Query', getInstructorCourseVersion: { __typename?: 'VersionResponse', id: string, version_number: number, status: VersionStatusType, total_questions: number, total_reviews: number, course?: { __typename?: 'Course', title: string, instructor?: { __typename?: 'Instructor', name: string } | null } | null, review_request?: { __typename?: 'ReviewRequest', inserted_at: any } | null, reviews: Array<{ __typename?: 'ReviewResponse', id: string, title: string, message: string, inserted_at: any, status: ReviewStatusType, total_issues: number }> } };

export type GetInstructorVersionReviewQueryVariables = Exact<{
  reviewId: Scalars['String']['input'];
}>;


export type GetInstructorVersionReviewQuery = { __typename?: 'Query', getInstructorVersionReview: { __typename?: 'Review', id: string, inserted_at: any, message: string, status: ReviewStatusType, title: string, course_version?: { __typename?: 'Version', version_number: number, course?: { __typename?: 'Course', title: string } | null, questions?: Array<{ __typename?: 'Question', id: string, question_number: number, correct_answer: string, description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, options?: Array<string> | null, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType }> | null } | null, issues?: Array<{ __typename?: 'Issue', id: string, description: string, status: IssueStatusType, response?: string | null }> | null } };

export type ListCoursesQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListCoursesQuery = { __typename?: 'Query', listCourses: { __typename?: 'CourseConnection', edges: Array<{ __typename?: 'CourseResponseEdge', node: { __typename?: 'CourseResponse', id: string, title: string, approved_version?: { __typename?: 'Version', id: string } | null, versions?: Array<{ __typename?: 'Version', id: string }> | null } }> } };

export type ListInstructorQuestionsForVersionQueryVariables = Exact<{
  versionId: Scalars['String']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListInstructorQuestionsForVersionQuery = { __typename?: 'Query', listInstructorQuestionsForVersion: { __typename?: 'QuestionConnection', edges: Array<{ __typename?: 'QuestionTypeClassEdge', node: { __typename?: 'Question', id: string, correct_answer: string, description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType } }> } };

export type LoginInstructorQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginInstructorQuery = { __typename?: 'Query', loginInstructor: { __typename?: 'InstructorLoginResponse', id: string, email: string, name: string, token: string, organizations?: Array<{ __typename?: 'Organization', id: string }> | null } };


export const AddCourseVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCourseVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCourseVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}}]}}]}}]} as unknown as DocumentNode<AddCourseVersionMutation, AddCourseVersionMutationVariables>;
export const AddQuestionsToCourseVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddQuestionsToCourseVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteDescription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteKeywords"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addQuestionsToCourseVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"versionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questions"}}},{"kind":"Argument","name":{"kind":"Name","value":"suiteTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteTitle"}}},{"kind":"Argument","name":{"kind":"Name","value":"suiteDescription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteDescription"}}},{"kind":"Argument","name":{"kind":"Name","value":"suiteKeywords"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteKeywords"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddQuestionsToCourseVersionMutation, AddQuestionsToCourseVersionMutationVariables>;
export const CreateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateCourseMutation, CreateCourseMutationVariables>;
export const RequestCourseVersionReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestCourseVersionReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestCourseVersionReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"versionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RequestCourseVersionReviewMutation, RequestCourseVersionReviewMutationVariables>;
export const UpdateIssueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIssue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"issueStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IssueStatusType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"response"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIssue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"issueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"issueStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"issueStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"response"},"value":{"kind":"Variable","name":{"kind":"Name","value":"response"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"response"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateIssueMutation, UpdateIssueMutationVariables>;
export const UpdateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"question"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const GetCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"approved_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assigned_admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assigned_admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCourseQuery, GetCourseQueryVariables>;
export const GetInstructorCourseVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInstructorCourseVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInstructorCourseVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"versionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"review_request"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total_issues"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total_questions"}},{"kind":"Field","name":{"kind":"Name","value":"total_reviews"}}]}}]}}]} as unknown as DocumentNode<GetInstructorCourseVersionQuery, GetInstructorCourseVersionQueryVariables>;
export const GetInstructorVersionReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInstructorVersionReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInstructorVersionReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"course_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"issues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]}}]} as unknown as DocumentNode<GetInstructorVersionReviewQuery, GetInstructorVersionReviewQueryVariables>;
export const ListCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"approved_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"versions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListCoursesQuery, ListCoursesQueryVariables>;
export const ListInstructorQuestionsForVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListInstructorQuestionsForVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listInstructorQuestionsForVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"versionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"versionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListInstructorQuestionsForVersionQuery, ListInstructorQuestionsForVersionQueryVariables>;
export const LoginInstructorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginInstructor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginInstructor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginInstructorQuery, LoginInstructorQueryVariables>;