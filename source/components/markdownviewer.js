import React from 'react';
import moment from 'moment';
import ConverterFactory from '../utils/converterfactory';
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = ConverterFactory();

export default function MarkdownViewer(props) {

  if (!props.doc) {
    return null;
  }
  
  const createdDate = moment(props.doc.created_dt+"").format('YYYY-MM-DD hh:mm:ss a');
  const updatedDate = moment(props.doc.updated_dt+"").format('YYYY-MM-DD hh:mm:ss a');
  const title = props.doc.title.replace(/#|@/g, "");
  const size = props.doc.text ? props.doc.text.length : 0;

  return (
    <div className="mde-preview">
      <h1>{title}</h1>
      <p>
        <small><b>Updated:</b> {updatedDate} | <b>Created:</b> {createdDate} | {size} bytes</small>
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