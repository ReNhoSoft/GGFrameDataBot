import { callackOneParameter, callbackNoParameters } from "./interfaces.js";

export enum ELogLevel {
    debug = 5,
    verbose = 4,
    info =3,
    warning =2,
    error = 1,
    none = 0
}

class RHLoggerPrivate {
    private logLevel: ELogLevel;

    private loggerFunction(message: any) {
        console.log(message);
    }
    private emptyFunction(message: any) {
        return;
    }

    debug: callackOneParameter<any, void>;
    verbose: callackOneParameter<any, void>;
    info: callackOneParameter<any, void>;
    warning: callackOneParameter<any, void>;
    error: callackOneParameter<any, void>;

    constructor(logLevel:ELogLevel) {
        let lvl = logLevel as number;
        this.error = lvl >= ELogLevel.error? this.loggerFunction : this.emptyFunction;
        this.warning = lvl >= ELogLevel.warning? this.loggerFunction : this.emptyFunction;
        this.info = lvl >= ELogLevel.info? this.loggerFunction : this.emptyFunction;
        this.verbose = lvl >= ELogLevel.verbose? this.loggerFunction : this.emptyFunction;
        this.debug = lvl >= ELogLevel.debug? this.loggerFunction : this.emptyFunction;
    }
}

export class RHLogger {
    private static instance: RHLoggerPrivate;
    private static logLevel: ELogLevel = ELogLevel.info;

    static {
        this.instance = new RHLoggerPrivate(this.logLevel);
    }

    static setLogLevel(level:ELogLevel) {
        this.logLevel = level;
        this.instance = new RHLoggerPrivate(this.logLevel);
    }

    static get debug() {
        return this.instance.debug;
    }

    static get verbose() {
        return this.instance.verbose;
    }

    static get info() {
        return this.instance.info;
    }

    static get warning() {
        return this.instance.warning;
    }
    static get error() {
        return this.instance.error;
    }

    constructor() {
        throw new Error("Creating new instances is not supported. Please use RHLogger.Config and RHLogger.Instance instead!");
    }
}

