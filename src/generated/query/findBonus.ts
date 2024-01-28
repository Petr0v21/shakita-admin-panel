const findBonusQueryBody = `
query findBonus (
	$skip: Float, 
	$take: Float, 
	$id: String, 
	$valueType: BonusValueType, 
	$level: BonusLevelType, 
	$isActive: Boolean, 
	$asset: String
) {
findBonus(
	skip: $skip, 
	take: $take, 
	id: $id, 
	valueType: $valueType, 
	level: $level, 
	isActive: $isActive, 
	asset: $asset
) { 
	$output
}}`;

export const findBonus = (args: findBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findBonusQueryBody.replace("$output", outputStr);
}

export type findBonusOutput = { 
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