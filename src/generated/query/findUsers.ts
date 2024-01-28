const findUsersQueryBody = `
query findUsers (
	$skip: Float, 
	$take: Float, 
	$id: String, 
	$name: String, 
	$contact: String, 
	$role: UserRole
) {
findUsers(
	skip: $skip, 
	take: $take, 
	id: $id, 
	name: $name, 
	contact: $contact, 
	role: $role
) { 
	$output
}}`;

export const findUsers = (args: findUsersOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findUsersQueryBody.replace("$output", outputStr);
}

export type findUsersOutput = { 
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