const updateBonusQueryBody = `
mutation updateBonus (
	$count: Float, 
	$asset: String, 
	$description: String, 
	$condition: Float, 
	$level: BonusLevelType, 
	$valueType: BonusValueType, 
	$payload: JSON, 
	$isActive: Boolean, 
	$id: String!
) {
updateBonus(
	count: $count, 
	asset: $asset, 
	description: $description, 
	condition: $condition, 
	level: $level, 
	valueType: $valueType, 
	payload: $payload, 
	isActive: $isActive, 
	id: $id
) { 
	$output
}}`;

export const updateBonus = (args: updateBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateBonusQueryBody.replace("$output", outputStr);
}

export type updateBonusOutput = { 
	success?: boolean, 
}