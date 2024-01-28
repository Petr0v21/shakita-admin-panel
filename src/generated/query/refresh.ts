const refreshQueryBody = `
query refresh (
	$token: String!
) {
refresh(
	token: $token
) { 
	$output
}}`;

export const refresh = (args: refreshOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return refreshQueryBody.replace("$output", outputStr);
}

export type refreshOutput = { 
	accessToken?: boolean, 
	refreshToken?: boolean, 
}