const resetPasswordCodeQueryBody = `
mutation resetPasswordCode (
	$email: String!, 
	$code: String!, 
	$password: String!
) {
resetPasswordCode(
	email: $email, 
	code: $code, 
	password: $password
) { 
	$output
}}`;

export const resetPasswordCode = (args: resetPasswordCodeOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return resetPasswordCodeQueryBody.replace("$output", outputStr);
}

export type resetPasswordCodeOutput = { 
	success?: boolean, 
}