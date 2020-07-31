import update from 'react-addons-update';
import React, { Component }  from 'react';
import { useRouteMatch } from "react-router";
import PropTypes from 'prop-types';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import MarkdownViewer from './markdownviewer';
import MarkdownEditor from './markdowneditor';
import Pager from './pager';
import ErrorBoundary from './errorboundary';
import MarkdownEditorToolbar from './markdowneditortoolbar';
import solrConf from "../conf/solrconf";
import { JournalService } from "../services/JournalService.ts";
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
      viewMode: props.viewMode ? props.viewMode : "new",
      title: "",
      text: "",
      originalText: "",
      documentId: props.documentId
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.journalService = new JournalService(solrConf);
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Updating Markdown Controller Props:");
    console.log(props);
    return this.journalService.loadDocument(this.state.documentId, this.loadDocument.bind(this));
    // if (state.viewMode === "view" && props.doc) {
    //   return {
    //     activeDocument: props.doc,
    //     title: props.doc.title,
    //     text: props.doc.text
    //   };
    // }
    // return null;
  }

  render() {
    let toolbar = null;
    let documentPane = null;
    let viewMode = this.state.viewMode;

    // let documentId = this.props.match.params.documentId;

    // let match = useRouteMatch("/notes/:documentId");
    // let documentId = match.params.documentId;
    
     if (!this.state.activeDocument) {
      return <MarkdownEditorToolbar 
                viewMode={"new"}
                onNewButtonClick={this.newDocument.bind(this)} />;
    }


    toolbar = <MarkdownEditorToolbar 
                viewMode={viewMode}
                onNewButtonClick={this.newDocument.bind(this)}
                onCancelButtonClick={this.cancelEditDocument.bind(this)} 
                onEditButtonClick={this.editDocument.bind(this)}
                onSaveButtonClick={this.saveDocument.bind(this)}/>

    if (this.state.activeDocument && viewMode === "view") {
      documentPane = <MarkdownViewer doc={this.state.activeDocument}/>

    } else if (this.state.activeDocument && viewMode === "edit") {
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

  loadDocument(doc) {
    console.log("Journal Service Document");
    console.log(doc);

    return({
      previousDocument: this.state.activeDocument,
      activeDocument: doc,
      title: doc.title,
      text: doc.text
    });
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
    let tagPatternString = "(^|\\s+)\\"+prefix+"(\\w{3}\\w*)";
    let tagPattern = new RegExp(tagPatternString,"g");
    [title, tags].forEach((item) => {
      item.split("\n").forEach((line) => {
        let result;
        while(result = tagPattern.exec(line)) {
          parsedTags.push(result[2].toLowerCase());
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
