
import { GraphQlQuery } from "./graphql-query";
import {  } from './api-types';
import { IGraphQlQueryExecutor,  IDataMapper } from "./graphql";

export class MutationApi<T> extends GraphQlQuery<T, MutationMethods> {
    constructor(executor: IGraphQlQueryExecutor<MutationMethods>) {
        super(executor, 'mutation');
    }
    add<MR>(key:keyof T,
args:{ n1: number, n2: number } ,
mapper?:IDataMapper<MR, number>) {
        
        return this.queryAddItem(key,
            {
                
                name: MutationMethods.add,
                mapper: mapper,
                variables: [
                    { name: 'n1', value: args.n1, type: 'Int!' },
{ name: 'n2', value: args.n2, type: 'Int!' }
                ]
            })
    }
}
    

export enum MutationMethods {
    add = "add"
}