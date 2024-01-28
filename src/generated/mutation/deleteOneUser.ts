const deleteOneUserQueryBody = `
mutation deleteOneUser (
	$id: String!
) {
deleteOneUser(
	id: $id
) { 
	$output
}}`;

export const deleteOneUser = (args: deleteOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return deleteOneUserQueryBody.replace("$output", outputStr);
}

export type deleteOneUserOutput = { 
	success?: boolean, 
}