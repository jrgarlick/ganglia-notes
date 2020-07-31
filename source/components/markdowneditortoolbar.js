import React, { Component }  from 'react';

export default function MarkdownEditorToolbar(props) {

    if (props.viewMode === "new") {
      toolbar = <div><button className="btn" onClick={props.onNewButtonClick}>New</button></div>;
      
    } else if (props.viewMode === "view") {
      toolbar = 
        <div>
          <button className="btn" onClick={props.onNewButtonClick}>New</button>&nbsp;
          <button className="btn" onClick={props.onEditButtonClick}>Edit</button>&nbsp;
          <button className="btn" onClick={props.onViewHistoryButtonClick}>View History</button>&nbsp;
          <button className="btn" onClick={props.onDeleteButtonClick}>Delete</button>&nbsp;
        </div>;

    } else if (props.viewMode === "edit") {
      toolbar = 
        <div>
          <button className="btn" onClick={props.onSaveButtonClick}>Save</button>&nbsp;
          <button className="btn" onClick={props.onSaveButtonClick}>Cancel</button>&nbsp;
        </div>;
    }

  return (
    <div className="edit-toolbar">
      {toolbar}
    </div>
  );

}