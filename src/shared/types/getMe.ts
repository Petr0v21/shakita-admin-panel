import { createBonusOutput } from '../mutation/createBonus';
import { findApplicationsOutput } from './findApplications';

const getMeQueryBody = `
query getMe {
    getMe { 
	$output
}}`;

export const getMe = (args: findOneUserOutput) => {
  const outputStr = Object.entries(args).reduce((str, [key, value]) => {
    if (value) {
      if (typeof value === 'object') {
        const outputStrSec = Object.entries(value).reduce(
          (str_sec, [key, value]) => {
            if (value) {
              return str_sec.concat(key + ' ');
            } else {
              return str_sec;
            }
          },
          '',
        );
        return str.concat(key + ' {' + outputStrSec + '}' + ' ');
      }
      return str.concat(key + ' ');
    } else {
      return str;
    }
  }, '');
  return getMeQueryBody.replace('$output', outputStr);
};

export type findOneUserOutput = {
  id?: boolean;
  email?: boolean;
  verified_email?: boolean;
  isGoogleAuth?: boolean;
  picture?: boolean;
  name?: boolean;
  google_id?: boolean;
  password?: boolean;
  phone?: boolean;
  enable_notifications?: boolean;
  isFullAuth?: boolean;
  role?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  applications?: findApplicationsOutput;
  sessions?: {
    id?: boolean;
    refreshToken?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };
  bonusTickets?: createBonusOutput;
};
