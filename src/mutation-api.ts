export enum MutationMethods {
    createGameJobLog = "createGameJobLog",
    createGamePlayer = "createGamePlayer",
    changeGamePlayerStatus = "changeGamePlayerStatus"
}


import { InputGameJobLog, GameJobLog, InputCreateGamePlayerParams, GamePlayer } from './api-types';
import { GraphQlQuery, IGraphQlQueryExecutor, GraphQlQueryItemInput, IDataMapper } from 'graphql-client-ts';

export class MutationApi<T> extends GraphQlQuery<T, MutationMethods> {
    constructor(executor: IGraphQlQueryExecutor) {
        super(executor, 'mutation');
    }
    createGameJobLog<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ params?: InputGameJobLog } ,
mapper?:IDataMapper<MR, GameJobLog>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: MutationMethods.createGameJobLog,
                mapper: mapper,
                variables: [
                    { name: 'params', value: args.params, type: 'InputGameJobLog' }
                ]
            })
    }

createGamePlayer<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ params?: InputCreateGamePlayerParams } ,
mapper?:IDataMapper<MR, GamePlayer>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: MutationMethods.createGamePlayer,
                mapper: mapper,
                variables: [
                    { name: 'params', value: args.params, type: 'InputCreateGamePlayerParams' }
                ]
            })
    }

changeGamePlayerStatus<MR>(key:keyof T,
data:GraphQlQueryItemInput,
args:{ id: string, status: string } ,
mapper?:IDataMapper<MR, GamePlayer>) {
        
        return this.queryAddItem(key,
            {
                fields: data.fields,
                name: MutationMethods.changeGamePlayerStatus,
                mapper: mapper,
                variables: [
                    { name: 'id', value: args.id, type: 'String!' },
{ name: 'status', value: args.status, type: 'String!' }
                ]
            })
    }
}
    