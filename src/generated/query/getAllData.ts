const getAllDataQueryBody = `
query getAllData {
    getAllData { 
	$output
}}`;

export const getAllData = (args: getAllDataOutput) => {
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
  return getAllDataQueryBody.replace('$output', outputStr);
};

export type getAllDataOutput = {
  users?: boolean;
  applications?: boolean;
  average?: {
    applications?: boolean;
    users?: boolean;
  };
};
