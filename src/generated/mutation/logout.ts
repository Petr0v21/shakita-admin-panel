const logoutQueryBody = `
mutation logout (
	$token: String!
) {
logout(
	token: $token
) { 
	$output
}}`;

export const logout = (args: logoutOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return logoutQueryBody.replace("$output", outputStr);
}

export type logoutOutput = { 
	success?: boolean, 
}