import update from 'react-addons-update';
import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import MarkdownViewer from './markdownviewer';
import MarkdownEditor from './markdowneditor';
import Pager from './pager';
import ErrorBoundary from './errorboundary';
import { SET_FILTER_ACTION,
         CLEAR_FILTERS_ACTION,
         SET_QUERY_ACTION,
         SET_PAGE_ACTION } from "../actions";


class MarkdownController extends Component {
  constructor(props, context) {
    super(props, context);
    console.log("CONSTRUCTOR MARKDOWNCONTROLLER: ");
    console.log(props);
    this.state = {
      activeDocument: null,
      viewMode: props.viewMode ? props.viewMode : "view",
      title: "",
      text: "",
      originalText: ""
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  
  static getDerivedStateFromProps(props, state) {
    if (state.viewMode === "view" && props.doc) {
      return {
        activeDocument: props.doc,
        title: props.doc.title,
        text: props.doc.text
      };
    }
    return null;
  }

  render() {
    let toolbar = null;
    let documentPane = null;
    
     if (!this.state.activeDocument) {
      return <div className="edit-toolbar">
        <div><button className="btn" onClick={this.newDocument.bind(this)}>New</button></div>
      </div>;
    }

    let viewMode = this.state.viewMode;

    if (this.state.activeDocument && viewMode === "view") {
      toolbar = <div className="edit-toolbar">
        <div><button className="btn" onClick={this.newDocument.bind(this)}>New</button> <button className="btn" onClick={this.editDocument.bind(this)}>Edit</button></div>
      </div>;
      documentPane = <MarkdownViewer doc={this.state.activeDocument}/>

    } else if (this.state.activeDocument && viewMode === "edit") {
      toolbar = <div className="edit-toolbar">
        <div><button className="btn" onClick={this.saveDocument.bind(this)}>Save</button> <button className="btn" onClick={this.cancelEditDocument.bind(this)}>Cancel</button></div>
      </div>;
      documentPane = 
        <MarkdownEditor
          title={this.state.title}
          text={this.state.text}
          onTitleChange={this.onTitleChange}
          onTextChange={this.onTextChange} />
    }

    return <div>
      {toolbar}
      {documentPane}
      {toolbar}
    </div>;
  }

  newDocument() {
    console.log("New Document");
    this.setState({
      previousDocument: this.state.activeDocument,
      activeDocument: {
        title: "",
        text: "",
        originalText: ""
      },
      title: "",
      text: "",
      originalText: "",
      viewMode: "edit"
    });
  }

  editDocument() {
    console.log("Edit Document");
    this.setState({
      previousDocument: this.state.activeDocument,
      viewMode: "edit"
    });
  }

  cancelEditDocument() {
    this.setState({
      activeDocument: this.state.previousDocument,
      previousDocument: null,
      viewMode: "view"
    });
  }

  saveDocument() {
    console.log("saveDocument");

    var newDoc = JSON.parse(JSON.stringify(this.state.activeDocument));
    newDoc.title = this.state.title;
    newDoc.text = this.state.text;
    newDoc.tags_ss = this.parseTags('#', this.state.title, this.state.text);
    newDoc.mentions = this.parseTags('@', this.state.title, this.state.text);
    newDoc.updated_dt = new Date().toISOString();

    this.props.onDocumentChange(newDoc);

    this.setState({
      activeDocument: newDoc,
      viewMode: "view"
    });

    console.log(newDoc);
  }

  onTitleChange(title) {
    this.setState({
      title: title
    });
  }

  onTextChange(text) {
    this.setState({
      text: text
    });
  }

  parseTags(prefix, title, tags) {
    let parsedTags = [];
    let tagPatternString = "\\"+prefix+"(\\w{3}\\w*)";
    let tagPattern = new RegExp(tagPatternString,"g");
    [title, tags].forEach((item) => {
      item.split("\n").forEach((line) => {
        let result;
        while(result = tagPattern.exec(line)) {
          parsedTags.push(result[1].toLowerCase());
        }
      })
    });
    
    return parsedTags.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }
}

MarkdownController.propTypes = {
  activeDocument: PropTypes.object,
  previousDocument: PropTypes.object,
  viewMode: PropTypes.string
};

export default MarkdownController;
