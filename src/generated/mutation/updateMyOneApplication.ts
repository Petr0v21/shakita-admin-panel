const updateMyOneApplicationQueryBody = `
mutation updateMyOneApplication (
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
updateMyOneApplication(
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

export const updateMyOneApplication = (args: updateMyOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateMyOneApplicationQueryBody.replace("$output", outputStr);
}

export type updateMyOneApplicationOutput = { 
	success?: boolean, 
}