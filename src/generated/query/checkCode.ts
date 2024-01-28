const checkCodeQueryBody = `
query checkCode (
	$code: String!, 
	$email: String!
) {
checkCode(
	code: $code, 
	email: $email
) { 
	$output
}}`;

export const checkCode = (args: checkCodeOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return checkCodeQueryBody.replace("$output", outputStr);
}

export type checkCodeOutput = { 
	success?: boolean, 
}