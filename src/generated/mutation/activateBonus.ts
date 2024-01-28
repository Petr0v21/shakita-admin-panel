const activateBonusQueryBody = `
mutation activateBonus (
	$userId: String!, 
	$bonusTicketId: String!
) {
activateBonus(
	userId: $userId, 
	bonusTicketId: $bonusTicketId
) { 
	$output
}}`;

export const activateBonus = (args: activateBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return activateBonusQueryBody.replace("$output", outputStr);
}

export type activateBonusOutput = { 
	success?: boolean, 
}