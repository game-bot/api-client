
import { saveCodeFile, GeneratedInfo, getSchema, getTypeByName, getJsTypeName, generateTypeScriptType, typeIsRequired, TypeData, typeIsObject, getTypeName } from "./common";

export function generate() {

    saveCodeFile([generateTypes()], 'api-types');
}

function generateTypes(): GeneratedInfo {
    const schema = getSchema();
    const typeNames = (<any[]>schema.data.__schema.types).map<TypeData>((t: any) => getTypeByName(t.name))
        .filter(type => typeIsObject(type));

    const types = typeNames.map(name => getTypeByName(name.name));

    let data = types
        .map(item => ({
            name: item.name,
            fields: (item.fields || item.inputFields).map(field => ({ name: field.name, type: getJsTypeName(field.type), required: typeIsRequired(field.type) }))
        }))
        .map(item => `export type ${item.name} = ${generateTypeScriptType(item.fields)}`);

    data = data.concat(types.map(type => `export const ${type.name}StringFields = '${getTypeStringFields(type)}';`));

    return { data: data.join('\n\n'), name: null };
}

function getTypeStringFields(type: TypeData, parent: { [name: string]: number } = {}): string {
    const fields = (type.fields || type.inputFields);

    return fields.map(field => {
        const fieldsType = getTypeByName(getTypeName(field.type));
        const fieldKey = `${field.name}-${fieldsType.name}`;
        const isObject = typeIsObject(fieldsType);
        if (isObject) {
            if (!parent[fieldKey] || parent[fieldKey] < 1) {
                parent[fieldKey] = parent[fieldKey] || 0;
                parent[fieldKey]++;
                return `${field.name} { ${getTypeStringFields(fieldsType, parent)} }`;
            } else {
                console.log(`no object: ${field.name} ${fieldsType.name}, ${JSON.stringify(parent)}`)
                // return field.name;
            }
        } else {
            return field.name;
        }
    })
        .filter(item => !!item)
        .join(' ');
}

generate();
