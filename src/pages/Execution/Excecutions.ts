import { Config } from "../../models/Config";

export type Scenario = number;

export const ScenarioRoutes: Map<number, string> = new Map([
    [1, "Login"],
    [2, "Account"],
    [3, "Download"],
    [4, "Upload"],
    [5, "Media"],
]);

export interface IExecution {
    hasNext(): boolean;

    next(): Scenario;

    isRunning(): boolean;

    start(): void;

    stop(): void;
}

const _generateExecutions = (config: Config): Array<Scenario> => {
    let group = 5;
    if (config.specificScenario == 0 ||  config.specificScenario == 1 || config.specificScenario == 2) {
        group= 1;
    } else if (config.specificScenario == 3 || config.specificScenario == 4) {
        group= 3;
    } else {
        group= 5;
    }

    if (group >= 0 && group < 5) {
        let list = new Array<Scenario>();

        for (let i = 0; i < config.testLoad; i++) {
            if (i % 2 == 0) {
                list.push(group);
            } else {
                list.push( (group + 1) );
            }
        }

        return list;
    } else {
        let list = new Array<Scenario>();
        for (let i = 0; i < config.testLoad; i++) {
            list.push(group);
        }
        return list;
    }
}

const _generateExecutions_copy = (config: Config): Array<Scenario> => {
    if (config.specificScenario > 0) {
        let list = new Array<Scenario>();

        for (let i = 0; i < config.testLoad; i++) {
            list.push(config.specificScenario);
        }

        return list;
    } else {
        return _createRandomList(config.testLoad);
    }
}

const _createRandomList = (lentgth: number): Array<Scenario> => {
    const first = 1;
    const last = 5;
    let list = new Array<Scenario>();

    for (let i = 0; i < lentgth; i++) {
        const key = _rand(first, last);
        list.push(key);
    }

    return list;
};

const _rand = (first: number, last: number): number => {
    const min = Math.ceil(first);
    const max = Math.floor(last);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class TestExecution implements IExecution {
    private config: Config;
    private _executions: Array<Scenario>;
    private _index: number = 0;
    private _running: boolean = false;

    private static _instance?: IExecution;

    private constructor(config: Config, executions: Array<Scenario>) {
        this.config = config;
        this._executions = executions;
    }

    static getIstance(config: Config): IExecution {
        if (!TestExecution._instance) {
            const executions = _generateExecutions(config);
            console.log(`Executions: ${JSON.stringify(executions)}`);
            TestExecution._instance = new TestExecution(
                config,
                executions
            );
        }
        return TestExecution._instance;
    }

    hasNext(): boolean {
        return this._index < this.config.testLoad;
    }
    next(): Scenario {
        return this._executions[this._index++];
    }
    isRunning(): boolean {
        return this._running;
    }
    start(): void {
        this._running = true;
    }
    stop(): void {
        this._running = false;
        TestExecution._instance = null;
    }
}