const updateBonusTicketQueryBody = `
mutation updateBonusTicket (
	$code: String, 
	$ticketType: BonusTicketType, 
	$activeTill: DateTime, 
	$bonusId: String, 
	$userId: String, 
	$id: String!
) {
updateBonusTicket(
	code: $code, 
	ticketType: $ticketType, 
	activeTill: $activeTill, 
	bonusId: $bonusId, 
	userId: $userId, 
	id: $id
) { 
	$output
}}`;

export const updateBonusTicket = (args: updateBonusTicketOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateBonusTicketQueryBody.replace("$output", outputStr);
}

export type updateBonusTicketOutput = { 
	success?: boolean, 
}