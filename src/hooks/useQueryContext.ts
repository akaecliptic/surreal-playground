import { createStore } from "solid-js/store";
import { QueryContext, QueryContextSetter, QueryHistoryPeak, QueryHistoryPush, SurrealQueryResponse, UseQueryContext } from "definitions/alias";

const [ store, setStore ] = createStore<QueryContext>({ query: null, history: [] });

const useQueryContext: UseQueryContext = () => {

    const pushQuery: QueryHistoryPush = (query) => {
        let recent: SurrealQueryResponse;
    
        if (typeof query === 'string') {
            recent = JSON.parse(query) as SurrealQueryResponse;
        } else {
            recent = query;
        }
    
        setStore( 'history', old => [...old, recent] );
    };
    
    const peakQuery: QueryHistoryPeak = () => {
        return store.history[ store.history.length - 1 ];
    };

    const setContext: QueryContextSetter = (query) => {
        setStore('query', () => query);
    };

    return {
        context: store,
        peek: peakQuery,
        push: pushQuery,
        setter: setContext
    };
};

export default useQueryContext;
