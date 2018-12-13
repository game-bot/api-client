
import { GraphQlQuery } from "./graphql-query";
import { GamePlayer, InputListGamePlayerQueryParams } from './api-types';
import { IGraphQlQueryExecutor, GraphQlQueryItemInput, IDataMapper } from "./graphql";

export class QueryApi<T> extends GraphQlQuery<T, QueryMethods> {
    constructor(executor: IGraphQlQueryExecutor<QueryMethods>) {
        super(executor, 'query');
    }
    gamePlayerById<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ id: string } ,
mapper?:IDataMapper<MR, GamePlayer>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: QueryMethods.gamePlayerById,
                mapper: mapper,
                variables: [
                    { name: 'id', value: args.id, type: 'String!' }
                ]
            })
    }

gamePlayerByIdentity<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ gameId: string, identity: string } ,
mapper?:IDataMapper<MR, GamePlayer>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: QueryMethods.gamePlayerByIdentity,
                mapper: mapper,
                variables: [
                    { name: 'gameId', value: args.gameId, type: 'String!' },
{ name: 'identity', value: args.identity, type: 'String!' }
                ]
            })
    }

gamePlayerList<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ params: InputListGamePlayerQueryParams } ,
mapper?:IDataMapper<MR, GamePlayer[]>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: QueryMethods.gamePlayerList,
                mapper: mapper,
                variables: [
                    { name: 'params', value: args.params, type: 'InputListGamePlayerQueryParams!' }
                ]
            })
    }
}
    

export enum QueryMethods {
    gamePlayerById = "gamePlayerById",
    gamePlayerByIdentity = "gamePlayerByIdentity",
    gamePlayerList = "gamePlayerList"
}