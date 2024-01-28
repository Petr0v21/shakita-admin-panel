const updateOneUserQueryBody = `
mutation updateOneUser (
	$id: String!, 
	$email: String, 
	$phone: String, 
	$telegram: String, 
	$instagram: String, 
	$enable_notifications: Boolean, 
	$isFullAuth: Boolean, 
	$verified_email: Boolean, 
	$picture: String, 
	$name: String, 
	$role: UserRole, 
	$password: String
) {
updateOneUser(
	id: $id, 
	email: $email, 
	phone: $phone, 
	telegram: $telegram, 
	instagram: $instagram, 
	enable_notifications: $enable_notifications, 
	isFullAuth: $isFullAuth, 
	verified_email: $verified_email, 
	picture: $picture, 
	name: $name, 
	role: $role, 
	password: $password
) { 
	$output
}}`;

export const updateOneUser = (args: updateOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateOneUserQueryBody.replace("$output", outputStr);
}

export type updateOneUserOutput = { 
	success?: boolean, 
}