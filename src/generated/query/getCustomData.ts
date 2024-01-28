const getCustomDataQueryBody = `
query getCustomData (
	$startOfMonth: DateTime!, 
	$endOfMonth: DateTime!
) {
getCustomData(
	startOfMonth: $startOfMonth, 
	endOfMonth: $endOfMonth
) { 
	$output
}}`;

export const getCustomData = (args: getCustomDataOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return getCustomDataQueryBody.replace("$output", outputStr);
}

export type getCustomDataOutput = { 
	applications?: boolean, 
	users?: boolean, 
	startOfMonth?: boolean, 
	endOfMonth?: boolean, 
}