import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { makeLoadDocAction } from "../actions";

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
      return <div key={hit.id} className="app_hit">
        <div><strong><a href="#" onClick={() => this.dispatchLoadDocEvent(hit)}>{hit.title}</a></strong></div>
        <div className="app_vsp03 text-muted"><em><small>{hit.created_dt}</small></em></div>
        {/* <div className="app_vsp03">{hit.text.substring(0, 50)+"..."}</div> */}
      </div>;
    });

    return <div className="col-sm-2">
      {results}
    </div>;
  };

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
