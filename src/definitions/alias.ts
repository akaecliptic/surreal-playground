import { ToastyEvent } from "definitions/shapes";

export type SurrealLogin = (user?: string, pass?: string, ns?: string, db?: string) => Promise<void>;
export type SurrealQuery = ( val: string ) => Promise<string>;
export type SurrealScope = { ns: string, db: string };
export type SurrealConnection = (url?: string) => [ SurrealLogin, SurrealQuery ] | [];

export type SurrealBaseResponse = { status: string, time: string };
export type SurrealQueryResponse = [ { result: object[] } & SurrealBaseResponse ];

export type ElementRef<T = HTMLElement> = T | undefined;

export type QueryHistoryPeak = () => SurrealQueryResponse;
export type QueryHistoryPush = (query: string | SurrealQueryResponse)  => void;
export type QueryContextSetter = (query: SurrealQuery)  => void;
export type QueryContext = { query: SurrealQuery | null, history: SurrealQueryResponse[] };
export type UseQueryContext = () => {
    context: QueryContext,
    peek: QueryHistoryPeak,
    push: QueryHistoryPush,
    setter: QueryContextSetter
};

export type UseToasty = () =>  { 
    messages: ToastyEvent[]; 
    push: (message: ToastyEvent) => void; 
    pop: () => ToastyEvent | undefined;
}; 
