import express from "express";
import http from "http";
import {debug, error} from "../shared/utils/log";
import morgan from "morgan";
import {GithubService} from "../github/service/github-service";
import {ChatController} from "../chat/chat-controller";
import {GithubController} from "../github/github-controller";
import {AppConfig} from "./config";
import {ChatService} from "../chat/chat-service";
import {NotificationService} from "../shared/services/notification";
import {IChatService} from "../chat/chat-service-types";
import {IGithubController} from "../github/github-types";
import {EventParser} from "../github/service/event-parser";
import {GraphQLChatClient} from "../chat/graphql-chat-client";


/**
 * Основной класс приложения
 * Создает Express инстанс, контроллеры, сервисы, связывает все между собой, запускает сервер
 *
 */
export class App {

    private config: AppConfig;
    private readonly app: express.Application;
    private chatService: IChatService;
    private githubController: IGithubController;

    /**
     * Инициализация приложения, создает инстанс Express, добавляет middlewares, создает сервисы и контроллеры
     * связывает все между собой
     * @param config - конфиг приложения
     */
    public constructor(config: AppConfig) {
        this.config = config;
        this.app = express();

        this.app.set("port", this.config.port());

        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        const notification = new NotificationService();

        const graphQLChatClient = new GraphQLChatClient(config.chatApiUrl())
        const chatController = new ChatController(config, graphQLChatClient);
        this.chatService = new ChatService(notification, chatController);

        const eventParser = new EventParser(config)
        const githubService = new GithubService(config, eventParser, notification);
        this.githubController = new GithubController(this.app, githubService);

        debug("App: initialized");
    }


    /**
     * Запуск сервера
     */
    public start() {
        try {
            const httpServer = http.createServer(this.app);

            httpServer.listen(this.config.port(), this.config.host(), () => {
                debug(`listening ${this.config.host()}:${this.config.port()}`);
            });

            debug("App: started");
        } catch(err) {
            error(err);
            process.exit(-1);
        }
    }
}

const config = new AppConfig();
const app = new App(config);
app.start();

