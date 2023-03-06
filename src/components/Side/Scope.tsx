import { Component, Setter } from "solid-js";
import styles from "styles/components/Scope.module.scss";

export type PropScope = {
    name: string;
    hint: string;
    setter: Setter<string>;
};

const Scope: Component<PropScope> = (props) => {
    return (
        <div id={styles.container}>
            <label for={props.name}>{props.name}: </label>
            <input 
                type='text' name={props.name} 
                placeholder={props.hint} 
                oninput={e => props.setter(e.currentTarget.value || props.hint)}/>
        </div>
    );
};

export default Scope;
