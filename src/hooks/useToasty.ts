import { createStore } from "solid-js/store";
import { UseToasty } from "definitions/alias";
import { ToastyEvent } from "definitions/shapes";

const [messages, setMessages] = createStore<ToastyEvent[]>([]);

const useToasty: UseToasty = () => {

    const pop = () => {
        let popped: ToastyEvent | undefined;
        setMessages( old => { 
            popped = old.pop(); 
            return old;
        });
        return popped;
    };

    const push = (message: ToastyEvent) => {
        setMessages( old => [...old, message]);
    };

    return { messages, push, pop };
};

export default useToasty;
