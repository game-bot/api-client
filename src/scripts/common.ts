import { writeFileSync } from "fs";
import { join } from "path";

const schema = require('../../schema.json');

export function getSchema(): any {
    return schema;
}

export function saveCodeFile(data: GeneratedInfo[], fileName: string) {
    const content = data.map(item => item.data).join('\n\n');
    writeFileSync(join(__dirname, '..', '..', 'src', fileName + '.ts'), content, 'utf8');
}

export function generateTypeScriptType(items: { name: string, type: string, required: boolean }[]): string {
    return `{ ${items.map(item => `${item.name}${item.required ? '' : '?'}: ${item.type}`).join(', ')} } `;
}

export function getJsTypeName(type: TypeData) {
    const name = getTypeName(type);
    let jsName: string = name;
    switch (name) {
        case 'String':
            jsName = 'string';
            break;
        case 'Int':
        case 'Float':
            jsName = 'number';
            break;
        case 'JSON':
            jsName = 'any';
            break;
        case 'Boolean':
            jsName = 'boolean';
            break;
    }

    if (typeIsList(type)) {
        jsName += '[]';
    }

    return jsName;
}

export function typeIsList(type: TypeData) {
    return type.kind === 'NON_NULL' && type.ofType.kind === 'LIST' || type.kind === 'LIST'
}

export function typeIsRequired(type: TypeData) {
    return type.kind === 'NON_NULL'
}

export function getTypeName(type: TypeData): string {
    if (~['NON_NULL', 'LIST'].indexOf(type.kind)) {
        return getTypeName(type.ofType);
    }
    return type.name;
}

export function getTypeKind(type: TypeData): string {
    if (~['NON_NULL', 'LIST'].indexOf(type.kind)) {
        return getTypeKind(type.ofType);
    }
    return type.kind;
}

export function getTypeByName(name: string): TypeData {
    return schema.data.__schema.types.find((type: TypeData) => type.name === name)
}

export function typeIsObject(type: TypeData) {
    const invalidNames: string[] = [schema.data.__schema['queryType'].name, schema.data.__schema['mutationType'].name];
    const name = getTypeName(type);
    const kind = getTypeKind(type);
    return name.indexOf('__') !== 0 && invalidNames.indexOf(name) < 0 && ['OBJECT', 'INPUT_OBJECT'].indexOf(kind) > -1;
}

export type GeneratedInfo = {
    name: string
    data: string
}

export type TypeData = {
    kind: string
    name: string
    fields?: TypeFieldData[]
    inputFields?: TypeFieldData[]
    ofType?: TypeData
}

export type TypeFieldData = {
    name: string
    args: TypeArgData[]
    type: TypeData
}

export type TypeArgData = {
    name: string
    type: TypeData
}

export type ActionType = 'query' | 'mutation';