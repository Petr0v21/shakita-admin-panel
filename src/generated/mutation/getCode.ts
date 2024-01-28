const getCodeQueryBody = `
mutation getCode (
	$email: String!
) {
getCode(
	email: $email
) { 
	$output
}}`;

export const getCode = (args: getCodeOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return getCodeQueryBody.replace("$output", outputStr);
}

export type getCodeOutput = { 
	success?: boolean, 
}