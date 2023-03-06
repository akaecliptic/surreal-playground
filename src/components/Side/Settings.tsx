import { Component, createSignal } from "solid-js";
import { FiRss } from "solid-icons/fi";
import Scope from "components/Side/Scope";
import createConnection, { defaultAuth, defaultURL, defaultScope } from "libs/surreal";
import useQueryContext from "hooks/useQueryContext";
import styles from "styles/components/Settings.module.scss";
import useToasty from "hooks/useToasty";

const Settings: Component = () => {
    const { setter: setQuery } = useQueryContext();
    const { push } = useToasty();

    const [ url, setURL ] = createSignal<string>(defaultURL);
    const [ user, setUser ] = createSignal<string>(defaultAuth);
    const [ pass, setPass ] = createSignal<string>(defaultAuth);
    const [ ns, setNS ] = createSignal<string>(defaultScope);
    const [ db, setDB ] = createSignal<string>(defaultScope);

    const loginWithCredentials = async () => {
        const [login, query] = createConnection(url());
        if ( !login || !query ) return;
        
        try {
            await login(user(), pass(), ns(), db());
            setQuery(query);
            push({ channel: 'info', message: 'Connection Successful' });
        } catch (error) {
            push({ channel: 'alert', message: (error as Error).message });
        }
    };

    return (
        <div>
            <div id={styles.container}>
                <input type='text' oninput={e => setURL(e.currentTarget.value)} placeholder={defaultURL}/>
                <button type='submit' onclick={loginWithCredentials}><FiRss /></button>
            </div>
            <Scope name='user' hint={defaultAuth} setter={setUser}/>
            <Scope name='pass' hint={defaultAuth} setter={setPass}/>
            <Scope name='ns' hint={defaultScope} setter={setNS}/>
            <Scope name='db' hint={defaultScope} setter={setDB}/>
        </div>
    );
};

export default Settings;
