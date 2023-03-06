import { Component, createEffect, createSignal, Show } from "solid-js";
import { SurrealQueryResponse } from "definitions/alias";
import styles from "styles/components/Stats.module.scss";
import useQueryContext from "hooks/useQueryContext";

const Stats: Component = () => {
    const { context, peek: peekQuery } = useQueryContext();
    const [ status, setStatus ] = createSignal<string>('');
    const [ time, setTime ] = createSignal<string>('');

    const formatStats = () => {
        const recent: SurrealQueryResponse = peekQuery();

        if (!recent) {
            setStatus('');
            setTime('');
            return;
        }

        setStatus(recent[0].status);
        setTime(recent[0].time);
    };

    createEffect( () => {
        if ( !context.history.length ) return;
        formatStats();
    });

    return (
        <footer id={styles.container}>
            <Show when={ time() && status() } fallback={<span></span>}>
                <div>
                    <span>Status: { status() }</span>
                    <span> | </span>
                    <span>Time: { time() }</span>
                </div>
            </Show>
            <span>{ (context.query) ? 'connected' : 'no connection'}</span>
        </footer>
    );
};

export default Stats;
