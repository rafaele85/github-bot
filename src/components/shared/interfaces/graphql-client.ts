/**
 * HTTP Заголовки , необходимые для GraphQL Client
 */
export type IGraphQLClientHeaders = {Authorization: string};

/**
 * Интерфейс клиента GraphQL
 */
export interface IGraphQLClient<TResult, TPayload> {
    /**
     * Посылает указанный в query GraphQL запрос (или мутацию)
     * @param query gql запрос/мутация
     * @param payload данные для данного запроса/мутации
     * @param headers HTTP заголовки необходимые для данного запроса
     * @return результат, полученный от GraphQL API сервера
     */
    request(query: string, payload: TPayload, headers?: IGraphQLClientHeaders): Promise<TResult>;
}


