import React from "react";
import Editor from "@monaco-editor/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="// some comment"
      />
    </div>
  );
}

export default App;
