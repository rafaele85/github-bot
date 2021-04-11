import {
    ALL_EVENTS,
    IEvent,
    IEventHandler,
    IEventPayload,
    INotificationService
} from "../interfaces/event";
import {debug, error} from "../utils/log";
import EventEmitter from "events";

/**
 * Служит посредником для развязки между различными модулями (в частности между service интерфейсом и chat интерфейсом)
 * Реализует подписку на события и вызов callback при наступлении события вызывает callback функцию зарегистрированного подписчика
 *
 */
export class NotificationService implements INotificationService{

    private emitter;
    constructor() {
        this.emitter = new EventEmitter({captureRejections: true});
    }

    /**
     * Функция подписки на событие. Для подписки необходимо передать имя события , на которое подписываемся и колбек функцию обработчика события
     * @param event имя события. Если передать в качестве имени ALL_EVENTS, то будет подписка на любые события
     * @param handler колбек функция которая вызывается при наступлении события
     */
    public subscribe(event: IEvent, handler: IEventHandler) {
        this.emitter.addListener(event, handler);
    }

    /**
     * Функция отписки от события
     * @param event - событие, от которого отписываемся
     * @param handler - ссылка на callback функцию обработчика, которую передавали при подписке
     */
    public unsubscribe(event: IEvent, handler: IEventHandler) {
        this.emitter.removeListener(event, handler);
    }

    /**
     * Функция уведомления о событии. Уведомляет подписчиков на это событие а также тех кто подписан на ALL_EVENTS
     * @param event - имя события
     * @param eventData - дополнительные данные к событию
     */

    public async notify(event: IEvent, eventData: IEventPayload) {
        try {
            await Promise.all([
                this.notifyEvent(event, eventData),
                this.notifyEvent(ALL_EVENTS, eventData)
            ]);
        } catch (err) {
            error(err);
        }
    }

    /**
     * Уведомление о событии всех кто на него подписан путем вызова их callback функций
     * @param event имя события
     * @param eventData дополнительные данные связанные с событием
     * @protected
     */

    protected async notifyEvent(event: IEvent, eventData: IEventPayload) {

        const payload = [event, eventData];
        debug(`emitter emit event=${event} payload=`, payload)
        const result = this.emitter.emit(event, ...payload);

        debug("emitter event result=", result);
    }

}