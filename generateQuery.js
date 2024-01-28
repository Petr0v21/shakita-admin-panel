const fs = require("fs");
const path = require("path");
const { buildASTSchema, parse } = require("graphql");

function getTypeName(path) {
  return path.type?.name ? path.type.name.value : getTypeName(path.type);
}

function generateFunction(params, functionName, typeRequest) {
  let commonArgs = "";
  let queryArgs = "";
  Object.entries(params).map(([argName, { type, NonNullType }], index) => {
    const isLast = index === Object.values(params).length - 1;

    commonArgs = commonArgs.concat(
      `\n\t$${argName}: ${type}${NonNullType ? "!" : ""}${isLast ? "" : ", "}`
    );
    queryArgs = queryArgs.concat(
      `\n\t${argName}: $${argName}${isLast ? "" : ", "}`
    );
  });

  return (resFunction = `\n${typeRequest ?? "query"} ${functionName}`.concat(
    ` (${commonArgs}\n) {\n${functionName}(${queryArgs}\n) { \n\t$output\n}}`
  ));
}

function generateOutputType(schema, item) {
  const outputFields = schema.getType(getTypeName(item.astNode)).getFields();

  const outputDataString = Object.keys(outputFields).reduce((str, field) => {
    return str.concat(`\t${field ?? "field"}?: boolean, \n`);
  }, "");

  return `export type ${item.name}Output = { \n${outputDataString}}`;
}

function getParams(args) {
  const params = {};
  args.map((arg) => {
    params[arg.name.value] = {
      type: getTypeName(arg),
      NonNullType: arg.type.kind === "NonNullType",
    };
  });

  return params;
}

function build(schema, item, args, typeRequest) {
  if (!args.length) {
    // TODO generator for query without args
    return "";
  }
  const params = getParams(args);

  const resFunction = generateFunction(params, item.name, typeRequest);
  const outputData = generateOutputType(schema, item);

  return `const ${item.name}QueryBody = \`${resFunction}\`;\n\nexport const ${item.name} = (args: ${item.name}Output) => {\n\tconst outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return ${item.name}QueryBody.replace("$output", outputStr);\n}\n\n${outputData}`;
}

function generateQueryFromSchema(schemaFilePath, typeName) {
  const schemaContent = fs.readFileSync(schemaFilePath, "utf-8");
  const schemaAST = parse(schemaContent);
  const schema = buildASTSchema(schemaAST);

  const type = schema.getType(typeName);
  if (!type) {
    console.error(`Type "${typeName}" not found in the schema.`);
    return;
  }
  console.log('Generating', typeName, ' ...');
  const fields = type.getFields();
  Object.values(fields).map((item) => {
    const args = item.astNode.arguments;

    const fileString = build(schema, item, args, typeName.toLowerCase());
    const queryFilePath = `src/generated/${typeName.toLowerCase()}/${
      item.name
    }.ts`;

    const directoryPath = path.dirname(queryFilePath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(queryFilePath, fileString);
  });
  console.log('Generating', typeName, 'finished!');
}

const [schemaFilePath, typeName] = process.argv.slice(2);
generateQueryFromSchema(schemaFilePath, typeName);