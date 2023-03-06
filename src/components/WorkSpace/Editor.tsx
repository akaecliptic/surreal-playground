import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { ElementRef } from "definitions/alias";
import { FiPlay } from "solid-icons/fi";
import styles from "styles/components/Editor.module.scss";
import useQueryContext from "hooks/useQueryContext";
import useToasty from "hooks/useToasty";

const Editor: Component = () => {
    const { push: toast } = useToasty();
    const { context, push } = useQueryContext();
    const [ lines, setLines ] = createSignal<string>('');
    const [ selected, setSelected ] = createSignal<string>('');
    const [ numbers, setNumbers ] = createSignal<number[]>([]);
    
    let editor: ElementRef<HTMLTextAreaElement>;
    let numberline: ElementRef<HTMLTextAreaElement>;

    const syncScrolls = () => numberline!.scrollTop = editor!.scrollTop;
    const clearHighlight = () => setSelected('');

    const run = async (input: string) => {
        if (!input || !context.query) return;

        try {
            const response: string = await context.query(lines());
            if (response === 'stub') return;
            push(response);
        } catch(error) {
            toast({ channel: 'alert', message: (error as Error).message });
        }
    };

    const readHighlight = () => {
        if (!window.getSelection()) setSelected(''); 

        const highlighted: Selection | null = window.getSelection();
        setSelected(() => (highlighted) ? highlighted.toString() : '');
    };

    const hotKey = (event: KeyboardEvent) => {
        if ( event.ctrlKey && event.key === 'Enter' && lines() ) run(selected() || lines());
    };

    onMount( () => {
        document.addEventListener( 'selectionchange', clearHighlight );
        window.addEventListener( 'keydown', hotKey );
    });
    
    onCleanup( () => {
        document.removeEventListener( 'selectionchange', clearHighlight );
        window.removeEventListener( 'keydown', hotKey );
    });

    createEffect( () => {
        const count: number[] = [];
        lines().split('\n').forEach( (_, index) => count.push(index + 1) );
        setNumbers(count);

        if(!lines()) clearHighlight();
    });

    return (
        <section id={styles.container}>
            <textarea ref={numberline} id={styles.numberline} wrap='off' readonly>
                { numbers().map( num => num + '\n' ) }
            </textarea>
            <textarea ref={editor} id={styles.editor} 
                wrap='off' oninput={ e => setLines(e.currentTarget.value) } 
                onscroll={syncScrolls} onselect={readHighlight} >
            </textarea>
            <div id={styles.bottom}>
                <button onclick={() => run(lines())} disabled={!context.query}>run <FiPlay /></button>
                <button onclick={() => run(selected())} disabled={!selected()}>run line<FiPlay /></button>
            </div>
        </section>
    );
};

export default Editor;
