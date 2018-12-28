
import { QueryApi } from './query-api';
import { MutationApi } from './mutation-api';
import { IGraphQlQueryExecutor } from 'graphql-client-ts';


export class GraphQLClient {
    constructor(protected readonly executor: IGraphQlQueryExecutor) { }

    query<T extends {}>() {
        return new QueryApi<T>(this.executor);
    }

    mutation<T extends {}>() {
        return new MutationApi<T>(this.executor);
    }
}