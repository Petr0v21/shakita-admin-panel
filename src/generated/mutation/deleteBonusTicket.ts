const deleteBonusTicketQueryBody = `
mutation deleteBonusTicket (
	$id: String!
) {
deleteBonusTicket(
	id: $id
) { 
	$output
}}`;

export const deleteBonusTicket = (args: deleteBonusTicketOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return deleteBonusTicketQueryBody.replace("$output", outputStr);
}

export type deleteBonusTicketOutput = { 
	success?: boolean, 
}