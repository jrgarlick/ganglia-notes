import React, { Component } from 'react';
// import MarkdownView from 'react-showdown';
import ReactMde from "react-mde";
import ConverterFactory from '../utils/converterfactory';
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = ConverterFactory();

export default function MarkdownEditor(props) {

  var handleTitleChange = (event) => {
    props.onTitleChange(event.target.value);
  }

  var handleTextChange = (text) => {
    props.onTextChange(text);
  }

  const [selectedTab, setSelectedTab] = React.useState("write"); //<"write" | "preview">

  return (
    <form>
      <div>
        <div>
          <label>Title</label>
          <input type="text" name="docTitle" value={props.title} onChange={handleTitleChange}/>
        </div>
        <ReactMde
          value={props.text}
          onChange={handleTextChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
    </form>
  );
}
