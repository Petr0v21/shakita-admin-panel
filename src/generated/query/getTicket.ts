import { findBonusOutput } from './findBonus';
import { findUsersOutput } from './findUsers';

const getTicketQueryBody = `
query getTicket (
	$code: String!
) {
getTicket(
	code: $code
) { 
	$output
}}`;

export const getTicket = (args: getTicketOutput) => {
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
  return getTicketQueryBody.replace('$output', outputStr);
};

export type getTicketOutput = {
  id?: boolean;
  code?: boolean;
  ticketType?: boolean;
  activeTill?: boolean;
  isActive?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  bonus?: findBonusOutput;
  user?: findUsersOutput;
};
