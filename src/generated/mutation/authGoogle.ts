const authGoogleQueryBody = `
mutation authGoogle (
	$token: String!
) {
authGoogle(
	token: $token
) { 
	$output
}}`;

export const authGoogle = (args: authGoogleOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return authGoogleQueryBody.replace("$output", outputStr);
}

export type authGoogleOutput = { 
	accessToken?: boolean, 
	refreshToken?: boolean, 
}