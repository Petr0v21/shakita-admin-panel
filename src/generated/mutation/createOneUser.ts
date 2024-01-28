const createOneUserQueryBody = `
mutation createOneUser (
	$email: String, 
	$phone: String, 
	$telegram: String, 
	$instagram: String, 
	$enable_notifications: Boolean, 
	$picture: String, 
	$name: String, 
	$password: String, 
	$role: UserRole!, 
	$verified_email: Boolean
) {
createOneUser(
	email: $email, 
	phone: $phone, 
	telegram: $telegram, 
	instagram: $instagram, 
	enable_notifications: $enable_notifications, 
	picture: $picture, 
	name: $name, 
	password: $password, 
	role: $role, 
	verified_email: $verified_email
) { 
	$output
}}`;

export const createOneUser = (args: createOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createOneUserQueryBody.replace("$output", outputStr);
}

export type createOneUserOutput = { 
	id?: boolean, 
	email?: boolean, 
	verified_email?: boolean, 
	isGoogleAuth?: boolean, 
	picture?: boolean, 
	name?: boolean, 
	google_id?: boolean, 
	password?: boolean, 
	phone?: boolean, 
	enable_notifications?: boolean, 
	isFullAuth?: boolean, 
	role?: boolean, 
	telegram?: boolean, 
	instagram?: boolean, 
	rate?: boolean, 
	client_assessment?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}