import {IGraphQLClient, IGraphQLClientHeaders} from "../shared/interfaces/graphql-client";
import {GraphQLClient} from "graphql-request";
import {IMessageId} from "./chat-service-types";
import {error} from "../shared/utils/log";
import {ISendMessagePayload} from "./chat-interface";


export class GraphQLChatClient implements IGraphQLClient<IMessageId, ISendMessagePayload> {
    private client: GraphQLClient;
    constructor(url: string) {
        this.client = new GraphQLClient(url);
    }
    public async request(query: string, vars: ISendMessagePayload, headers: IGraphQLClientHeaders) {
        try {
            return await this.client.request<IMessageId, ISendMessagePayload>(query, vars, headers);
        } catch(err) {
            error(err);
            throw(err);
        }
    }
}

