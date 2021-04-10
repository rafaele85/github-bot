import {expect} from "chai";
import {AppConfig} from "../config";
import {testFixturePush1} from "./test-fixtures";
import {MockApp} from "./mock-app";

describe("Application", () => {
        it("should produce non-blank result", async () => {
            const config = new AppConfig();
            const app = new MockApp(config);
            const result = await app.runTest(testFixturePush1(config))
            expect(result).to.not.be.empty;
        });


        it("Query should match expected", async () => {
            const config = new AppConfig();
            const app = new MockApp(config);
            const fixture = testFixturePush1(config);
            const result = await app.runTest(fixture);
            const match = fixture.result.query.toString().replace(/ /g, "") === result?.query.toString().replace(/ /g, "")
            expect(match).to.be.true;
        });

        it("Message should match expected", async () => {
            const config = new AppConfig();
            const app = new MockApp(config);
            const fixture = testFixturePush1(config);
            const result = await app.runTest(fixture);
            expect(result?.vars?.input?.[0]?.text_message?.message).to.be.equal(fixture?.result?.vars?.input?.[0]?.text_message?.message);
        });

        it("GraphQL vars structure must match expected", async () => {
            const config = new AppConfig();
            const app = new MockApp(config);
            const fixture = testFixturePush1(config);
            const result = await app.runTest(fixture);
            expect(result?.vars).to.be.deep.equal(fixture.result.vars);
        });

        it("GraphQL headers must match expected", async () => {
            const config = new AppConfig();
            const app = new MockApp(config);
            const fixture = testFixturePush1(config);
            const result = await app.runTest(fixture);
            expect(result?.headers).to.be.deep.equal(fixture.result.headers);
        });
    }
);

