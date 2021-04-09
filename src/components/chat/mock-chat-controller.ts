import {IChatController} from "./chat-service-types";
import {AppConfig} from "../main/config";
import {debug, error} from "../shared/utils/log";
import {gql} from "graphql-request";
import {NewMessageInput, NewTextMessageInput} from "./schema/generated/graphql";
import {ISendMessagePayload} from "./chat-controller";
import {TestStorage} from "../shared/interfaces/test";

export type IChatHeaders = {Authorization: string} ;
export type IChatTestResult = {query: string, vars: ISendMessagePayload, headers: IChatHeaders};

export class MockChatController implements IChatController {

    private config: AppConfig;
    public constructor(config: AppConfig) {
        this.config = config;
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
            const headers: IChatHeaders = {Authorization: `Bearer ${this.config.chatApiToken()}`} ;
            const res: IChatTestResult = {query, vars, headers};
            TestStorage.instance().setTestResult(res);

        } catch (err) {
            error(err);
        }
    }
}

/*
{text_message: {message}};
 */

