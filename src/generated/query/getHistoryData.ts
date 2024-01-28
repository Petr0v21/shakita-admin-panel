const getHistoryDataQueryBody = `
query getHistoryData (
	$fillEmptyMonth: Boolean, 
	$startOf: DateTime, 
	$endOf: DateTime
) {
getHistoryData(
	fillEmptyMonth: $fillEmptyMonth, 
	startOf: $startOf, 
	endOf: $endOf
) { 
	$output
}}`;

export const getHistoryData = (args: getHistoryDataOutput) => {
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
  return getHistoryDataQueryBody.replace('$output', outputStr);
};

type getHistoryDataDetailsOutput = {
  year?: boolean;
  month?: boolean;
  count?: boolean;
};

export type getHistoryDataOutput = {
  applications?: getHistoryDataDetailsOutput;
  users?: getHistoryDataDetailsOutput;
};
