import {IChatController, IMessageId} from "../chat-service-types";
import {AppConfig} from "../../main/config";
import {debug, error} from "../../shared/utils/log";
import {gql} from "graphql-request";
import {NewMessageInput, NewTextMessageInput} from "../schema/generated/graphql";
import {IGraphQLClient, IGraphQLClientHeaders} from "../../shared/interfaces/graphql-client";
import {ISendMessagePayload} from "../chat-interface";

export type IChatTestResult = {query: string, vars: ISendMessagePayload, headers: IGraphQLClientHeaders};

/**
 * @deprecated
 */
export class MockChatController implements IChatController {

    private config: AppConfig;
    private client: IGraphQLClient<IMessageId, ISendMessagePayload>
    public constructor(config: AppConfig, client: IGraphQLClient<IMessageId, ISendMessagePayload>) {
        this.config = config;
        this.client = client;
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
            const headers: IGraphQLClientHeaders = {Authorization: `Bearer ${this.config.chatApiToken()}`} ;
            await this.client.request(query, vars, headers);
            //const res: IChatTestResult = {query, vars, headers};
            //TestStorage.instance().setTestResult(res);

        } catch (err) {
            error(err);
        }
    }
}

