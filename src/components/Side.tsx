import { Component, } from "solid-js";
import Settings from "components/Side/Settings";
import styles from "styles/components/Side.module.scss";

const Side: Component = () => {
    return (
        <aside id={styles.container}>
            <div id={styles.panels}>
                <Settings />
            </div>
            <hr class='divider vertical'/>
        </aside>
    );
};

export default Side;
