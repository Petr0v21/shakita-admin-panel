const deleteOneApplicationQueryBody = `
mutation deleteOneApplication (
	$id: String!
) {
deleteOneApplication(
	id: $id
) { 
	$output
}}`;

export const deleteOneApplication = (args: deleteOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return deleteOneApplicationQueryBody.replace("$output", outputStr);
}

export type deleteOneApplicationOutput = { 
	success?: boolean, 
}