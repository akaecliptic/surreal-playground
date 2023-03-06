import { Component } from "solid-js";
import Side from "components/Side";
import Stats from "components/Stats";
import WorkSpace from "components/WorkSpace";
import Toasty from "components/Toasty";

const App: Component = () => {
	return ( 
		<>
			<Toasty />
			<Side />
			<WorkSpace />
			<Stats />
		</>
	);
};

export default App;
