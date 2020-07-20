import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { makeLoadDocAction } from "../actions";
import AnchorPass from "../widgets/anchorpass"

/*
 * A component implementing a simple results list.
 *
 * props are:
 *  results: an array of objects holding data for each result
 */

// const Results = ({searchResults, handleActions}) => {

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      handleActions: {}
    }
  }

  render() {
    const results = this.props.searchResults.map((hit) => {
      var title = hit.title.replace(/#|@/g, "");
      return <div key={hit.id} className="app_hit">
        <div><strong><AnchorPass onClick={this.dispatchLoadDocEvent.bind(this)} title={title} value={hit}/></strong></div>
        <div className="app_vsp03 text-muted"><em><small>{hit.created_dt}</small></em></div>
      </div>;
    });

    return <div>{results}</div>;
  }

  dispatchLoadDocEvent(hit) {
    console.log("DipsatchLoadDocEvent");
    this.props.handleActions([makeLoadDocAction(hit)]);
  }
}

Results.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleActions: PropTypes.func,
};

export default Results;
