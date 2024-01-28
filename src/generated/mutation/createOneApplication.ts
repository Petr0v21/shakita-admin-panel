const createOneApplicationQueryBody = `
mutation createOneApplication (
	$place: String!, 
	$date: DateTime!, 
	$name: String!, 
	$phone: String, 
	$telegram: String, 
	$instagram: String, 
	$email: String!, 
	$description: String, 
	$enable_notification: Boolean!, 
	$status: ApplicationStatus
) {
createOneApplication(
	place: $place, 
	date: $date, 
	name: $name, 
	phone: $phone, 
	telegram: $telegram, 
	instagram: $instagram, 
	email: $email, 
	description: $description, 
	enable_notification: $enable_notification, 
	status: $status
) { 
	$output
}}`;

export const createOneApplication = (args: createOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createOneApplicationQueryBody.replace("$output", outputStr);
}

export type createOneApplicationOutput = { 
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