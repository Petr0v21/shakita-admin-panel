const deleteBonusQueryBody = `
mutation deleteBonus (
	$id: String!
) {
deleteBonus(
	id: $id
) { 
	$output
}}`;

export const deleteBonus = (args: deleteBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return deleteBonusQueryBody.replace("$output", outputStr);
}

export type deleteBonusOutput = { 
	success?: boolean, 
}