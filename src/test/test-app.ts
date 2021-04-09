import {AppConfig} from "../components/main/config";
import {IChatService} from "../components/chat/chat-service-types";
import {debug, error, log} from "../components/shared/utils/log";
import {GithubService} from "../components/github/service/github-service";
import {EventParser} from "../components/github/service/event-parser";
import {ChatService} from "../components/chat/chat-service";
import {NotificationService} from "../components/shared/services/notification";
import express from "express";
import {MockGithubController} from "../components/github/mock-github-controller";
import {IChatTestResult, MockChatController} from "../components/chat/mock-chat-controller";
import {TestStorage} from "../components/shared/interfaces/test";
import {testFixtures} from "./test-fixtures";
import {IGithubEventPayload} from "../components/github/github-types";

type ITestFixture = {
    githubData: IGithubEventPayload;
    result: IChatTestResult;
}

export class TestApp {

    private readonly config: AppConfig;
    private chatService: IChatService;
    private githubController: MockGithubController;
    private readonly app: express.Application;

    public constructor(config: AppConfig) {
        this.config = config;
        const notification = new NotificationService();
        this.app = express();

        const chatController = new MockChatController(config);
        this.chatService = new ChatService(notification, chatController);

        const eventParser = new EventParser(config)
        const githubService = new GithubService(config, eventParser, notification);
        this.githubController = new MockGithubController(this.app, githubService);

        debug("App: initialized");
    }

    protected checkTestResult(expected: IChatTestResult) {
        const result = TestStorage.instance().getTestResult() as IChatTestResult;
        if(!result) {
            throw Error("It should produce result: FAILED")
        } else {
            debug("It should produce result: PASSED");
        }
        if(expected.query.toString().replace(/ /g, "") !== result?.query.toString().replace(/ /g, "")) {
            log(result?.query.toString())
            throw Error("Query should match expected: FAILED")
        } else {
            debug("Query should match expected: PASSED");
        }
        if(expected.vars.chat_id !== result?.vars?.chat_id) {
            throw Error("ChatID should match expected: FAILED")
        } else {
            debug("ChatID should match expected: PASSED");
        }
        if(expected.vars.input.length !== result?.vars?.input?.length) {
            log(expected.vars.input.length, result?.vars?.input?.length)
            throw Error("Input length must match expected: FAILED")
        } else {
            debug("Input length must match expected: PASSED");
        }
        if(expected.vars.input[0]?.text_message?.message !== result?.vars?.input[0]?.text_message?.message) {
            log(expected.vars.input[0] , result?.vars?.input[0])
            throw Error("Input message must match expected: FAILED")
        } else {
            debug("Input message must match expected: PASSED");
        }
        if(expected.headers.Authorization !== result.headers?.Authorization) {
            throw Error("Header must expected: FAILED")
        } else {
            debug("Header must expected: PASSED");
        }
    }

    public async test(fixture: ITestFixture) {
        debug("App: started");

        try {
            await this.githubController.test(fixture.githubData);
            this.checkTestResult(fixture.result);
        } catch(err) {
            error(err);
        }

    }

    public async runSuite() {
        const fixtures = testFixtures(this.config)
        for(let fixture of fixtures) {
            TestStorage.instance().reset();
            await this.test(fixture);
        }
    }
}



const config = new AppConfig();
const app = new TestApp(config);
app.runSuite();

