"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const graphql_request_1 = require("graphql-request");
const log_1 = require("../shared/utils/log");
/**
 * Отвечает за отправку сообщений в чат через GraphQL API
 * Сообщения для отправки приходят из ChatService
 * Параметры API конфигурируются в .env: строка url, токен
 * При успешной отправке получает на выходе node id, с которым ничего не делает, просто выводит в лог
 * При ошибке отправки выводит в лог сообщение об ошибке.
 */
class ChatController {
    constructor(config) {
        this.config = config;
        const headers = { Bearer: this.config.chatApiToken() };
        this.client = new graphql_request_1.GraphQLClient(config.chatApiUrl(), { headers });
        log_1.debug("ChatController: started");
    }
    async sendMessage(message) {
        const query = graphql_request_1.gql `
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
        log_1.debug(`Sending ${message} to chat service`);
        try {
            const newTextMessageInput = { message };
            const newMessageInput = { text_message: newTextMessageInput };
            const vars = { chat_id: this.config.chatId(), input: [newMessageInput] };
            const headers = { Authorization: `Bearer ${this.config.chatApiToken()}` };
            const res = await this.client.request(query, vars, headers);
            log_1.debug(`res=`, res);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat-controller.js.map