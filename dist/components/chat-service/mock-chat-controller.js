"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockChatController = void 0;
const log_1 = require("../shared/utils/log");
const graphql_request_1 = require("graphql-request");
const test_1 = require("../shared/interfaces/test");
class MockChatController {
    constructor(config) {
        this.config = config;
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
            const res = { query, vars, headers };
            test_1.TestStorage.instance().setTestResult(res);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.MockChatController = MockChatController;
/*
{text_message: {message}};
 */
//# sourceMappingURL=mock-chat-controller.js.map