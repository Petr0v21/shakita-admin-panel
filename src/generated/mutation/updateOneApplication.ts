const updateOneApplicationQueryBody = `
mutation updateOneApplication (
	$id: String!, 
	$place: String, 
	$date: DateTime, 
	$status: ApplicationStatus, 
	$name: String, 
	$phone: String, 
	$telegram: String, 
	$instagram: String, 
	$email: String, 
	$description: String, 
	$enable_notification: Boolean
) {
updateOneApplication(
	id: $id, 
	place: $place, 
	date: $date, 
	status: $status, 
	name: $name, 
	phone: $phone, 
	telegram: $telegram, 
	instagram: $instagram, 
	email: $email, 
	description: $description, 
	enable_notification: $enable_notification
) { 
	$output
}}`;

export const updateOneApplication = (args: updateOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateOneApplicationQueryBody.replace("$output", outputStr);
}

export type updateOneApplicationOutput = { 
	success?: boolean, 
}