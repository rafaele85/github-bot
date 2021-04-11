import {IChatController, IChatService} from "./chat-service-types";
import {ALL_EVENTS, IEvent, IEventPayload, INotificationService} from "../shared/interfaces/event";
import {debug, error, log} from "../shared/utils/log";

/**
 * Получает события через NotificationService и вызывает ChatController для отправки сообщений в чат
 */
export class ChatService implements IChatService {
    private notification: INotificationService;
    private controller: IChatController;

    public constructor(notification: INotificationService, controller: IChatController) {
        this.controller=controller;
        this.notification = notification;
        this.notification.subscribe(ALL_EVENTS,
            (event: IEvent, payload: IEventPayload) => this.handleEvent(event, payload)
        );
        debug("ChatService: started");
    }

    /**
     * Дополнительная обработка сообщения перед отправкой (пока не реализована, возращаем строку как есть)
     * @param event имя события (пока события только от Github, но данный сервис может принимать любые события)
     * @param payload данные связанные с событием (для Github это строка сообщения о событии)
     * @protected
     */
    protected getEventNotificationMessage(event: IEvent, payload: IEventPayload) {
        return payload;
    }

    /**
     * Вызывается при наступлении
     * @param event
     * @param payload
     * @protected
     */
    protected async handleEvent(event: IEvent, payload: IEventPayload) {
        debug("ChatService.handleEvent payload=" , payload)
        const message = this.getEventNotificationMessage(event, payload)
        try {
            await this.controller.sendMessage(message);
        } catch(err) {
            error(err);
        }
    }

}