import {gql} from 'graphql-request'
import {AppConfig} from "../main/config";
import {IMessageId, IChatController} from "./chat-service-types";
import {debug, error} from "../shared/utils/log";
import {NewMessageInput, NewTextMessageInput} from "./schema/generated/graphql";
import {IGraphQLClient} from "../shared/interfaces/graphql-client";
import {ISendMessagePayload} from "./chat-interface";


/**
 * Отвечает за отправку сообщений в чат через GraphQL API
 * Сообщения для отправки приходят из ChatService
 * Параметры API конфигурируются в .env: строка url, токен
 * При успешной отправке получает на выходе node id, с которым ничего не делает, просто выводит в лог
 * При ошибке отправки выводит в лог сообщение об ошибке.
 */
export class ChatController implements IChatController {

    private config: AppConfig;
    private client: IGraphQLClient<IMessageId, ISendMessagePayload>;

    public constructor(config: AppConfig, client: IGraphQLClient<IMessageId, ISendMessagePayload>) {
        this.config = config;
        this.client = client;
        //const headers = {Bearer: this.config.chatApiToken()};
        //this.client = new GraphQLClient(config.chatApiUrl());
        debug("ChatController: started");
    }

    public async sendMessage(message: string) {
        const query = gql`
            mutation NEW_MESSAGE($chat_id: ID!, $input: [NewMessageInput!]!) {
                newMessages2( chat_id: $chat_id, input: $input) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `;
        debug(`Sending ${message} to chat service`);
        try {
            const newTextMessageInput: NewTextMessageInput = {message};
            const newMessageInput: NewMessageInput = {text_message: newTextMessageInput};
            const vars: ISendMessagePayload = {chat_id: this.config.chatId(), input: [newMessageInput]}
            const headers = {Authorization: `Bearer ${this.config.chatApiToken()}`} ;
            //const res = await this.client.request<IMessageId, ISendMessagePayload>(query, vars, headers);
            const res = await this.client.request(query, vars, headers);
            debug(`res=`, res)
        } catch (err) {
            error(err);
        }
    }
}


