const findApplicationsQueryBody = `
query findApplications (
	$skip: Float, 
	$take: Float, 
	$id: String, 
	$place: String, 
	$date_from: DateTime, 
	$date_to: DateTime, 
	$status: ApplicationStatus
) {
findApplications(
	skip: $skip, 
	take: $take, 
	id: $id, 
	place: $place, 
	date_from: $date_from, 
	date_to: $date_to, 
	status: $status
) { 
	$output
}}`;

export const findApplications = (args: findApplicationsOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findApplicationsQueryBody.replace("$output", outputStr);
}

export type findApplicationsOutput = { 
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