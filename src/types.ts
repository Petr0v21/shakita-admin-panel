import { ApplicationStatus, UserRole } from './generated/types';

export type ApplicationFilter = {
  date_from?: Date;
  date_to?: Date;
  status?: ApplicationStatus;
  id?: string;
  place?: string;
};

export type ApplicationBodyType = {
  email: string;
  place: string;
  description?: string;
  phone?: string;
  name: string;
  telegram?: string;
  instagram?: string;
  enable_notification: boolean;
  status?: ApplicationStatus;
  date: string;
};

export type ApplicationDBType = ApplicationBodyType & {
  id: string;
  user?: AccountDBType;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type SessionType = {
  id: string;
  refreshToken: string;
  ip: string;
  userAgent: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type BonusTicketType = {
  id: string;
  count: number;
  asset: string;
  isActive: boolean;
  payload?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type AccountBodyType = {
  email: string;
  picture?: string;
  name?: string;
  password?: string;
  phone?: string;
  enable_notifications?: boolean;
  role?: UserRole;
  telegram?: string;
  instagram?: string;
  rate?: number;
  client_assessment?: string;
};

export type AccountDBType = AccountBodyType & {
  id: string;
  verified_email?: boolean;
  isGoogleAuth?: boolean;
  google_id?: string;
  isFullAuth?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  applications?: [ApplicationDBType];
  sessions?: [SessionType];
  bonusTickets?: [BonusTicketType];
};

export type AuthFormType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  code: string;
};

export type DrawType = {
  name: string;
  id: string;
  dataHTML: string;
};

export type PlaceType = {
  placeId: string;
  name: string;
  status_book: boolean;
};

export type PlaceBookedType = {
  place: string;
  date: string | Date;
};

export type StyledBookType = {
  places: PlaceType[];
  placesActive: PlaceBookedType[];
  choosedPlaces: string;
};

export type AnaltyicsDataType = {
  applications: number;
  users: number;
};

export type AnalyticsActualDataType = AnaltyicsDataType & {
  average: {
    applications: string;
    applications_percent: string;
    users: string;
    users_percent: string;
  };
};

export type AnalyticsAllDataType = AnaltyicsDataType & {
  average: {
    applications: string;
    users: string;
  };
};

export type AnalyticsHistoryDataType = {
  yaer: number;
  month: number;
  count: number;
};

export type AnalyticsAllHistoryDataType = {
  applications: AnalyticsHistoryDataType[];
  users: AnalyticsHistoryDataType[];
};
