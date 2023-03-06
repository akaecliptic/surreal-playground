import { Component, createEffect, createSignal } from "solid-js";
import { FiAlertCircle, FiInfo, FiX } from "solid-icons/fi";
import { ToastyEvent } from "definitions/shapes";
import useToasty from "hooks/useToasty";
import styles from "styles/components/Toasty.module.scss";

const Toasty: Component = () => {
    const { messages, pop } = useToasty();
    const [ working, setWorking ] = createSignal<ToastyEvent>();

    createEffect( () => {
        const popped: ToastyEvent | undefined = pop();
        if (!messages.length || !popped) return;
        setWorking(popped);
        setTimeout( () => setWorking(), popped.duration || 2500);
    });

    return (
        <div id={styles.container} class={ (working()) ? styles[working()!.channel] : '' }>
            { (working()?.channel === 'info') ?  <FiInfo /> : <FiAlertCircle /> }
            <h4>{working()?.message}</h4>
            <FiX id={styles.cancel} onclick={() => setWorking()}/>
        </div>
    );
};

export default Toasty;
