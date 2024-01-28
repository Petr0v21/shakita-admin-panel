const createBonusTicketQueryBody = `
mutation createBonusTicket (
	$code: String!, 
	$ticketType: BonusTicketType, 
	$activeTill: DateTime, 
	$bonusId: String!, 
	$userId: String!
) {
createBonusTicket(
	code: $code, 
	ticketType: $ticketType, 
	activeTill: $activeTill, 
	bonusId: $bonusId, 
	userId: $userId
) { 
	$output
}}`;

export const createBonusTicket = (args: createBonusTicketOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createBonusTicketQueryBody.replace("$output", outputStr);
}

export type createBonusTicketOutput = { 
	id?: boolean, 
	code?: boolean, 
	ticketType?: boolean, 
	activeTill?: boolean, 
	isActive?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}