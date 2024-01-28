const findApplicationsByDateQueryBody = `
query findApplicationsByDate (
	$date: DateTime!
) {
findApplicationsByDate(
	date: $date
) { 
	$output
}}`;

export const findApplicationsByDate = (args: findApplicationsByDateOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findApplicationsByDateQueryBody.replace("$output", outputStr);
}

export type findApplicationsByDateOutput = { 
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