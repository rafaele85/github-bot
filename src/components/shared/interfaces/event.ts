export type IEvent=string;

// Константа которую нужно передать при подписке на события, если подписчик заинтересован во всех событиях без фильтрации
export const ALL_EVENTS: IEvent = "*";

//TODO - добавить другие типы событий
export type IOtherEventPayload = any;

/**
 * Данные, полученные от контроллера (т.е. изначально от Github), мы заранее не знаем их тип
 */
export type IEventPayload = any;

/**
 * Интерфейс абстрактного обработчика событий
 */
export type IEventHandler = (event: IEvent, payload: IEventPayload) => Promise<void>;

/**
 * Интерфейс брокера событий
 */

export interface INotificationService {
    /**
     * Регистрация обработчика
     * @param event имя события
     * @param handler callback функция обработчика
     */
    subscribe(event: IEvent, handler: IEventHandler): void;

    /**
     * Удаление обработчика
     * @param event имя события
     * @param handler ссылка на callback функцию обработчика, которую передавали когда регистрировали обработчик
     */
    unsubscribe(event: IEvent, handler: IEventHandler): void;

    /**
     * Вызов обработчиков при наступлении события
     * @param event имя события
     * @param eventData, данные , связанные с событием
     */
    notify(event: IEvent, eventData: IEventPayload): Promise<void>;
}