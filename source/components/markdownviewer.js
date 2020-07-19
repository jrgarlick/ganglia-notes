import React from 'react';
import moment from 'moment';
import ConverterFactory from '../utils/converterfactory';
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = ConverterFactory();

export default function MarkdownViewer(props) {

  if (!props.doc) {
    return null;
  }
  
  const formattedDate = moment(props.doc.created_dt+"").format('YYYY-MM-DD h:mm:ss a');

  return (
    <div>
      <h1>{props.doc.title}</h1>
      <p><small>{formattedDate}</small></p>
      <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.doc.text)}} />
    </div>
  );
};