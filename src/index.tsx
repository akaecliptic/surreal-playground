/* @refresh reload */
import { render } from "solid-js/web";
import "styles/index.scss";
import App from "App";

const root: HTMLElement  = document.getElementById('root') as HTMLElement;

render( () => <App />, root);
