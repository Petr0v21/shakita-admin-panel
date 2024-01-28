const findApplicationsHistoryQueryBody = `
query findApplicationsHistory (
	$email: String!
) {
findApplicationsHistory(
	email: $email
) { 
	$output
}}`;

export const findApplicationsHistory = (args: findApplicationsHistoryOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findApplicationsHistoryQueryBody.replace("$output", outputStr);
}

export type findApplicationsHistoryOutput = { 
	id?: boolean, 
	email?: boolean, 
	place?: boolean, 
	description?: boolean, 
	phone?: boolean, 
	name?: boolean, 
	telegram?: boolean, 
	instagram?: boolean, 
	enable_notification?: boolean, 
	status?: boolean, 
	date?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}