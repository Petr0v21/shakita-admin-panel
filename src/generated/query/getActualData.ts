const getActualDataQueryBody = `
query getActualData {
    getActualData { 
	$output
}}`;

export const getActualData = (args: getActualDataOutput) => {
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
  return getActualDataQueryBody.replace('$output', outputStr);
};

export type getActualDataOutput = {
  users?: boolean;
  applications?: boolean;
  average?: {
    applications?: boolean;
    applications_percent?: boolean;
    users?: boolean;
    users_percent?: boolean;
  };
};
