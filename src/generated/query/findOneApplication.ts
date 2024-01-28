import { findOneUserOutput } from './findOneUser';

const findOneApplicationQueryBody = `
query findOneApplication (
	$id: String!
) {
findOneApplication(
	id: $id
) { 
	$output
}}`;

export const findOneApplication = (args: findOneApplicationOutput) => {
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
  return findOneApplicationQueryBody.replace('$output', outputStr);
};

export type findOneApplicationOutput = {
  id?: boolean;
  email?: boolean;
  place?: boolean;
  description?: boolean;
  phone?: boolean;
  name?: boolean;
  telegram?: boolean;
  instagram?: boolean;
  enable_notification?: boolean;
  status?: boolean;
  date?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  user?: findOneUserOutput;
};
