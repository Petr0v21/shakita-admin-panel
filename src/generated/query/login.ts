const loginQueryBody = `
query login (
	$email: String!, 
	$password: String!
) {
login(
	email: $email, 
	password: $password
) { 
	$output
}}`;

export const login = (args: loginOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return loginQueryBody.replace("$output", outputStr);
}

export type loginOutput = { 
	accessToken?: boolean, 
	refreshToken?: boolean, 
}