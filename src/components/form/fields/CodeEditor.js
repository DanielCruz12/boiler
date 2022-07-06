import React, { useState, useEffect } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/yonce.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "./theme/vscode-dark.css";
import { WrapperCodeEditor } from "./Styles";
const defaultOptions = {
  lineNumbers: true,
  theme: "yonce",
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};
const CodeEditor = ({ options, onChange, style, ...props }) => {
  const [code, setCode] = useState();
  const updateCode = (code) => {
    setCode(code);
    if (onChange) {
      onChange(code);
    }
  };
  useEffect(() => {
    if (props.code) {
      setCode(props.code);
    }
  }, [props.code]);
  return (
    <WrapperCodeEditor
      style={{
        height: props.height || 200,
        minWidth: props.minWidth || 240,
        overflow: "hidden",
        ...style,
      }}
    >
      <CodeMirror
        options={options || defaultOptions}
        autoFocus
        value={code}
        onChange={updateCode}
      />
    </WrapperCodeEditor>
  );
};
export default CodeEditor;
