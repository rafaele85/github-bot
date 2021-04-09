import dotenv from "dotenv";
import {error} from "../shared/utils/log";

const DEFAULT_LOCALE = "ru";

/**
 * Извлекает из .env и хранит конфигурационные параметры
 * См описание списка параметров в Readme.md
 */
export class AppConfig {
    private readonly _port: number;
    private readonly _host: string;
    private readonly _chatApiUrl: string;
    private readonly _chatId: string;
    private readonly _chatApiToken: string;
    private readonly _locale: string;

    constructor() {
        dotenv.config( { debug: true } );
        this._port=Number.parseInt(process.env.PORT || "3001");
        this._host=process.env.HOST||"0.0.0.0";
        this._chatApiUrl=process.env.CHAT_API_URL||"";
        this._chatId=process.env.CHAT_ID||"";
        this._chatApiToken = process.env.CHAT_API_TOKEN||"";
        this._locale = process.env.LOCALE || DEFAULT_LOCALE;
        if(!this._chatApiUrl) {
            error("Please specify CHAT_API_URL in .env");
            process.exit(-1);
        }
        if(!this._chatId) {
            error("Please specify CHAT_ID in .env");
            process.exit(-1);
        }
        if(!this._chatApiToken) {
            error("Please specify CHAT_API_TOKEN in .env");
            process.exit(-1);
        }
    }

    public port() {
        return this._port;
    }
    public host() {
        return this._host;
    }
    public chatApiUrl() {
        return this._chatApiUrl;
    }
    public chatId() {
        return this._chatId;
    }
    public chatApiToken() {
        return this._chatApiToken;
    }
    public locale() {
        return this._locale;
    }

}