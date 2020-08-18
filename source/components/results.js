import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import StickyLink from "../widgets/stickylink";

/*
 * A component implementing a simple results list.
 *
 * props are:
 *  searchResults: an array of objects holding data for each result
 */

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const results = this.props.searchResults.map((hit) => {
      var title = hit.title.replace(/#|@/g, "");
      return <div key={hit.id} className="app_hit">
        <div><strong><StickyLink to={`/notes/${hit.id}`}>{title}</StickyLink></strong></div>
        <div className="app_vsp03 text-muted"><em><small>{hit.created_dt}</small></em></div>
      </div>;
    });

    return <div>{results}</div>;
  }
}

Results.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Results;
