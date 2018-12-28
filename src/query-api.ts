export enum QueryMethods {
    currentUser = "currentUser",
    gamePlayerById = "gamePlayerById",
    gamePlayerByIdentity = "gamePlayerByIdentity",
    gamePlayerList = "gamePlayerList",
    latestGameJobLogs = "latestGameJobLogs"
}


import { User, GamePlayer, InputListGamePlayerQueryParams, InputLatestGameJobLogQueryParams, GameJobLog } from './api-types';
import { GraphQlQuery, IGraphQlQueryExecutor, GraphQlQueryItemInput, IDataMapper } from 'graphql-client-ts';

export class QueryApi<T> extends GraphQlQuery<T, QueryMethods> {
    constructor(executor: IGraphQlQueryExecutor) {
        super(executor, 'query');
    }
    currentUser<MR>(key:keyof T,
data:GraphQlQueryItemInput,
mapper?:IDataMapper<MR, User>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: QueryMethods.currentUser,
                mapper: mapper,
                variables: [
                    
                ]
            })
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

latestGameJobLogs<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ params: InputLatestGameJobLogQueryParams } ,
mapper?:IDataMapper<MR, GameJobLog[]>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: QueryMethods.latestGameJobLogs,
                mapper: mapper,
                variables: [
                    { name: 'params', value: args.params, type: 'InputLatestGameJobLogQueryParams!' }
                ]
            })
    }
}
    