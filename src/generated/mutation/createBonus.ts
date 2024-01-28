const createBonusQueryBody = `
mutation createBonus (
	$count: Float!, 
	$asset: String!, 
	$description: String!, 
	$condition: Float, 
	$level: BonusLevelType, 
	$valueType: BonusValueType!, 
	$payload: JSON, 
	$isActive: Boolean
) {
createBonus(
	count: $count, 
	asset: $asset, 
	description: $description, 
	condition: $condition, 
	level: $level, 
	valueType: $valueType, 
	payload: $payload, 
	isActive: $isActive
) { 
	$output
}}`;

export const createBonus = (args: createBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createBonusQueryBody.replace("$output", outputStr);
}

export type createBonusOutput = { 
	id?: boolean, 
	count?: boolean, 
	asset?: boolean, 
	description?: boolean, 
	isActive?: boolean, 
	condition?: boolean, 
	level?: boolean, 
	valueType?: boolean, 
	payload?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}