import {IChatId} from "./chat-service-types";
import {NewMessageInput} from "./schema/generated/graphql";

/**
 * Параметры GraphQL для NewMessages2 мутации
 */
export type ISendMessagePayload = {
    chat_id: IChatId,
    input: [NewMessageInput];
}
