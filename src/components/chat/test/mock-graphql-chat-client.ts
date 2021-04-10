import {ITestResultHolder} from "../../shared/interfaces/test";
import {IChatTestResult} from "./mock-chat-controller";
import {IGraphQLClient, IGraphQLClientHeaders} from "../../shared/interfaces/graphql-client";
import {uuid} from "../../shared/utils/uuid";
import {ISendMessagePayload} from "../chat-interface";

export class MockGraphQLChatClient implements IGraphQLClient<string, ISendMessagePayload>,
    ITestResultHolder<IChatTestResult|undefined> {

    private result: IChatTestResult|undefined=undefined;

    public async request(query: string, vars: ISendMessagePayload, headers: IGraphQLClientHeaders) {
        this.result = {query, vars, headers};
        return uuid();
    }

    public getTestResult() {
        return this.result;
    }
}

