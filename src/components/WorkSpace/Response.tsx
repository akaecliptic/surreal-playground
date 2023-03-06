import { ElementRef } from "definitions/alias";
import useQueryContext from "hooks/useQueryContext";
import { prettyPrintJson } from "pretty-print-json";
import { Component, createEffect } from "solid-js";
import styles from "styles/components/Response.module.scss";

const Response: Component = () => {
    const { context, peek } = useQueryContext();
    let output: ElementRef<HTMLPreElement>;

    createEffect( () => {
        if (!context.history.length || !peek()) return;

        const results: object[] = peek()[0].result;
        output!.innerHTML = prettyPrintJson.toHtml(results);
    });

    return (
        <section id={styles.container}>
            <pre ref={output} class={'json-container ' + styles.output} />
        </section>
    );
};

export default Response;
