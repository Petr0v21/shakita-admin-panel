export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AnalyticsApplicationsType = {
  __typename?: 'AnalyticsApplicationsType';
  applications_auth: Scalars['Float']['output'];
  applications_unauth: Scalars['Float']['output'];
};

export type AnalyticsAverageType = {
  __typename?: 'AnalyticsAverageType';
  applications: Scalars['String']['output'];
  applications_percent: Scalars['String']['output'];
  users: Scalars['String']['output'];
  users_percent: Scalars['String']['output'];
};

export type AnalyticsCustomRangeType = {
  __typename?: 'AnalyticsCustomRangeType';
  applications: Scalars['Float']['output'];
  endOfMonth: Scalars['DateTime']['output'];
  startOfMonth: Scalars['DateTime']['output'];
  users: Scalars['Float']['output'];
};

export type AnalyticsHistoryItemType = {
  __typename?: 'AnalyticsHistoryItemType';
  count: Scalars['Float']['output'];
  month: Scalars['Float']['output'];
  year: Scalars['Float']['output'];
};

export type AnalyticsHistoryType = {
  __typename?: 'AnalyticsHistoryType';
  applications: Array<AnalyticsHistoryItemType>;
  users: Array<AnalyticsHistoryItemType>;
};

export type AnalyticsWithAverageType = {
  __typename?: 'AnalyticsWithAverageType';
  applications: Scalars['Float']['output'];
  average: AnalyticsAverageType;
  users: Scalars['Float']['output'];
};

export type Application = {
  __typename?: 'Application';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  enable_notification: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  place: Scalars['String']['output'];
  status: ApplicationStatus;
  telegram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ApplicationType = {
  __typename?: 'ApplicationType';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  enable_notification: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  place: Scalars['String']['output'];
  status: ApplicationStatus;
  telegram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Bonus = {
  __typename?: 'Bonus';
  asset: Scalars['String']['output'];
  /** How much activations must be for new level */
  condition?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  level?: Maybe<BonusLevelType>;
  payload?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  valueType: BonusValueType;
};

export enum BonusLevelType {
  Junior = 'JUNIOR',
  Middle = 'MIDDLE',
  Senior = 'SENIOR'
}

export type BonusTicket = {
  __typename?: 'BonusTicket';
  activeTill?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  ticketType: BonusTicketType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum BonusTicketType {
  Const = 'CONST',
  Disposable = 'DISPOSABLE'
}

export type BonusTicketWholeType = {
  __typename?: 'BonusTicketWholeType';
  activeTill?: Maybe<Scalars['DateTime']['output']>;
  bonus?: Maybe<Bonus>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  ticketType: BonusTicketType;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export enum BonusValueType {
  Percent = 'PERCENT',
  Point = 'POINT'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateBonus?: Maybe<SuccessOutput>;
  authGoogle: Tokens;
  createBonus?: Maybe<Bonus>;
  createBonusTicket?: Maybe<BonusTicket>;
  createOneApplication?: Maybe<Application>;
  createOneUser: User;
  deleteBonus?: Maybe<SuccessOutput>;
  deleteBonusTicket?: Maybe<SuccessOutput>;
  deleteOneApplication: SuccessOutput;
  deleteOneUser: SuccessOutput;
  getCode: SuccessOutput;
  logout: SuccessOutput;
  register: Tokens;
  resetPasswordCode: SuccessOutput;
  updateBonus?: Maybe<SuccessOutput>;
  updateBonusTicket?: Maybe<SuccessOutput>;
  updateMe: SuccessOutput;
  updateMyOneApplication: SuccessOutput;
  updateOneApplication: SuccessOutput;
  updateOneUser: SuccessOutput;
};


export type MutationActivateBonusArgs = {
  bonusTicketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationAuthGoogleArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateBonusArgs = {
  asset: Scalars['String']['input'];
  condition?: InputMaybe<Scalars['Float']['input']>;
  count: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<BonusLevelType>;
  payload?: InputMaybe<Scalars['JSON']['input']>;
  valueType: BonusValueType;
};


export type MutationCreateBonusTicketArgs = {
  activeTill?: InputMaybe<Scalars['DateTime']['input']>;
  bonusId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  ticketType?: InputMaybe<BonusTicketType>;
  userId: Scalars['String']['input'];
};


export type MutationCreateOneApplicationArgs = {
  date: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  enable_notification?: Scalars['Boolean']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['String']['input'];
  status?: InputMaybe<ApplicationStatus>;
  telegram?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateOneUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  enable_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  role?: UserRole;
  telegram?: InputMaybe<Scalars['String']['input']>;
  verified_email?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteBonusArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBonusTicketArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOneApplicationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOneUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationGetCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationResetPasswordCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBonusArgs = {
  asset?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['Float']['input']>;
  count?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<BonusLevelType>;
  payload?: InputMaybe<Scalars['JSON']['input']>;
  valueType?: InputMaybe<BonusValueType>;
};


export type MutationUpdateBonusTicketArgs = {
  activeTill?: InputMaybe<Scalars['DateTime']['input']>;
  bonusId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  ticketType?: InputMaybe<BonusTicketType>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateMeArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  enable_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  isFullAuth?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  verified_email?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateMyOneApplicationArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enable_notification?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
  telegram?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOneApplicationArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enable_notification?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
  telegram?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOneUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  enable_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  instagram?: InputMaybe<Scalars['String']['input']>;
  isFullAuth?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  verified_email?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  checkCode: SuccessOutput;
  findApplications?: Maybe<Array<Application>>;
  findApplicationsByDate?: Maybe<Array<Application>>;
  findApplicationsHistory?: Maybe<Array<Application>>;
  findBonus?: Maybe<Array<Bonus>>;
  findOneApplication?: Maybe<ApplicationType>;
  findOneUser?: Maybe<UserType>;
  findUsers?: Maybe<Array<User>>;
  getActualData: AnalyticsWithAverageType;
  getAllData: AnalyticsWithAverageType;
  getApplicationsHistory?: Maybe<Array<Application>>;
  getCorrelationApplicationsData: AnalyticsApplicationsType;
  getCustomData: AnalyticsCustomRangeType;
  getHistoryData: AnalyticsHistoryType;
  getMe: UserType;
  getTicket?: Maybe<BonusTicketWholeType>;
  login: Tokens;
  refresh: Tokens;
};


export type QueryCheckCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type QueryFindApplicationsArgs = {
  date_from?: InputMaybe<Scalars['DateTime']['input']>;
  date_to?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  place?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ApplicationStatus>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryFindApplicationsByDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryFindApplicationsHistoryArgs = {
  email: Scalars['String']['input'];
};


export type QueryFindBonusArgs = {
  asset?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<BonusLevelType>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  valueType?: InputMaybe<BonusValueType>;
};


export type QueryFindOneApplicationArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindUsersArgs = {
  contact?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetCorrelationApplicationsDataArgs = {
  endOf?: InputMaybe<Scalars['DateTime']['input']>;
  startOf?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetCustomDataArgs = {
  endOfMonth: Scalars['DateTime']['input'];
  startOfMonth: Scalars['DateTime']['input'];
};


export type QueryGetHistoryDataArgs = {
  endOf?: InputMaybe<Scalars['DateTime']['input']>;
  fillEmptyMonth?: InputMaybe<Scalars['Boolean']['input']>;
  startOf?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetTicketArgs = {
  code: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryRefreshArgs = {
  token: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  endAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  ip: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userAgent?: Maybe<Scalars['JSON']['output']>;
};

export type SuccessOutput = {
  __typename?: 'SuccessOutput';
  success: Scalars['Boolean']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  client_assessment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  enable_notifications: Scalars['Boolean']['output'];
  google_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  isFullAuth: Scalars['Boolean']['output'];
  isGoogleAuth?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Float']['output']>;
  role: UserRole;
  telegram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verified_email?: Maybe<Scalars['Boolean']['output']>;
};

export enum UserRole {
  Admin = 'admin',
  Analyt = 'analyt',
  Blocked = 'blocked',
  Manager = 'manager',
  SuperManager = 'super_manager',
  User = 'user'
}

export type UserType = {
  __typename?: 'UserType';
  applications?: Maybe<Array<Application>>;
  bonusTickets?: Maybe<Array<BonusTicketWholeType>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  enable_notifications: Scalars['Boolean']['output'];
  google_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  isFullAuth: Scalars['Boolean']['output'];
  isGoogleAuth?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  sessions?: Maybe<Array<Session>>;
  telegram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verified_email?: Maybe<Scalars['Boolean']['output']>;
};
