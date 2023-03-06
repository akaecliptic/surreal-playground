import Surreal from "surrealdb.js"; 
import { createSignal } from "solid-js";
import { SurrealConnection, SurrealLogin, SurrealQuery, SurrealScope } from "definitions/alias";
import { createStore } from "solid-js/store";

export const defaultURL: string = 'http://localhost:8000';
export const defaultAuth: string = 'root';
export const defaultScope: string = 'test';

const testUrl = (url: string): boolean => {
	if (!url || url.length === 0) return false;

	return (/^http(s?):\/\/localhost:[0-9]{2,5}/i).test(url);
};

const createConnection: SurrealConnection = (url = defaultURL) => {

	if ( url !== defaultURL && !testUrl(url) ) return [];

	const formattedUrl: string = (url.endsWith('/rpc')) ? url : url + '/rpc';
	const [ database ] = createSignal<Surreal>(new Surreal(formattedUrl));
	const [ scope, setScope ] = createStore<SurrealScope>({ ns: defaultScope, db: defaultScope });

	const login: SurrealLogin = async (user = defaultAuth, pass = defaultAuth, ns = defaultScope, db = defaultScope) => {
		try {
			await database().signin({ user, pass });
			setScope({ ns, db });
		} catch ( error ) {
			return Promise.reject(error);
		}
	};
	
	const query: SurrealQuery = async ( val ) => {
		try {
			await database().use(scope.ns, scope.db);
			const data = await database().query(val);
			return JSON.stringify(data, null, 3);
		} catch ( error ) {
			return Promise.reject(error);
		}
	};

	return [ login, query ];
};

export default createConnection;
