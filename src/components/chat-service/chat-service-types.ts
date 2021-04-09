/**
 * интерфейс сервиса ChatService
 */
export interface IChatService {
}

/**
 * Интерфейс контроллера Chat
 */
export interface IChatController {
    /**
     * функция отправки указанного сообщения в чат через API
     * @param message полная строка сообщения
     */
    sendMessage(message: string): Promise<void>;
}

/**
 * ID чата
 */
export type IChatId = string;

/**
 * возвращаемое ID сообщения
 */
export type IMessageId = string;