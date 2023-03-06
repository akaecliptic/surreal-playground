import { Component } from "solid-js";
import Editor from "components/WorkSpace/Editor";
import Response from "components/WorkSpace/Response";

const WorkSpace: Component = () => {
    return (
        <main>
            <Editor />
            <Response />
        </main>
    );
};

export default WorkSpace;
