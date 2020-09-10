import React from 'react';
import ConverterFactory from '../utils/converterfactory';
import GangliaNoteTitle from "../widgets/GangliaNoteTitle";
import DateFormatter from "../widgets/DateFormatter";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = ConverterFactory();

export default function MarkdownViewer(props) {

  if (!props.doc) {
    return null;
  }
  
  // var title = StringUtils.cleanTitle(props.doc.title);
  var size = props.doc.text ? props.doc.text.length : 0;

  return (
    <div className="mde-preview">
      <h1><GangliaNoteTitle title={props.doc.title}/></h1>
      <p>
        <small><b>Updated:</b> <DateFormatter date={props.doc.updated_dt}/> | <b>Created:</b> <DateFormatter date={props.doc.created_dt}/> | {size} bytes</small>
      </p>
      <div className="mde-preview-content">
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.doc.text)}} />
      </div>
    </div>
  );
};

function joinList(list, joinChar) {
  return list ? list.join(joinChar) : "";
}