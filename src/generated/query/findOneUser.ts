import { findApplicationsOutput } from './findApplications';

const findOneUserQueryBody = `
query findOneUser (
	$id: String!
) {
findOneUser(
	id: $id
) { 
	$output
}}`;

export const findOneUser = (args: findOneUserOutput) => {
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
  return findOneUserQueryBody.replace('$output', outputStr);
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
  telegram?: boolean;
  instagram?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  applications?: findApplicationsOutput;
};
