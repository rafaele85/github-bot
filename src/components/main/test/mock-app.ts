import {AppConfig} from "../config";
import {IChatService} from "../../chat/chat-service-types";
import {debug, error, log} from "../../shared/utils/log";
import {GithubService} from "../../github/service/github-service";
import {EventParser} from "../../github/service/event-parser";
import {ChatService} from "../../chat/chat-service";
import {NotificationService} from "../../shared/services/notification";
import express from "express";
import {MockGithubController} from "../../github/mock-github-controller";
import {IChatTestResult} from "../../chat/test/mock-chat-controller";
import {IGithubEventPayload} from "../../github/github-types";
import {expect} from "chai";
import {describe} from "mocha";
import {ChatController} from "../../chat/chat-controller";
import {MockGraphQLChatClient} from "../../chat/test/mock-graphql-chat-client";

type ITestFixture = {
    githubData: IGithubEventPayload;
    result: IChatTestResult;
}

export class MockApp {

    private readonly config: AppConfig;
    private chatService: IChatService;
    private githubController: MockGithubController;
    private readonly app: express.Application;
    private readonly graphQLChatClient: MockGraphQLChatClient;

    public constructor(config: AppConfig) {
        this.config = config;
        const notification = new NotificationService();
        this.app = express();

        this.graphQLChatClient = new MockGraphQLChatClient();
        const chatController = new ChatController(config, this.graphQLChatClient);
        this.chatService = new ChatService(notification, chatController);

        const eventParser = new EventParser(config)
        const githubService = new GithubService(config, eventParser, notification);
        this.githubController = new MockGithubController(this.app, githubService);

        debug("App: initialized");
    }


    public async runTest(fixture: ITestFixture) {
        debug("App: started");
        try {
            await this.githubController.test(fixture.githubData);
            return this.graphQLChatClient.getTestResult();
        } catch(err) {
            error(err);
        }

    }
}

