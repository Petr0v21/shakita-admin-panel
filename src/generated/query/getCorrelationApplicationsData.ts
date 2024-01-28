const getCorrelationApplicationsDataQueryBody = `
query getCorrelationApplicationsData (
	$startOf: DateTime, 
	$endOf: DateTime
) {
getCorrelationApplicationsData(
	startOf: $startOf, 
	endOf: $endOf
) { 
	$output
}}`;

export const getCorrelationApplicationsData = (args: getCorrelationApplicationsDataOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return getCorrelationApplicationsDataQueryBody.replace("$output", outputStr);
}

export type getCorrelationApplicationsDataOutput = { 
	applications_auth?: boolean, 
	applications_unauth?: boolean, 
}