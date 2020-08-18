import update from 'react-addons-update';
import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import MarkdownController from './markdowncontroller';
import Pager from './pager';
import ErrorBoundary from './errorboundary';
import solrConf from '../conf/solrconf';
import Accordion from '../widgets/Accordion';
import AnchorPass from '../widgets/anchorpass';
import { SET_FILTER_ACTION,
         CLEAR_FILTERS_ACTION,
         SET_QUERY_ACTION,
         SET_PAGE_ACTION,
         makeClearFiltersAction,
         makeLoadDocAction } from "../actions";


class SearchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoc: null,
      documentId: props.documentId
    };
  }
  
  render() {
    let row2 = null;
    let row3 = null;

    const qp = this.props.queryParams;
    const sr = this.props.searchResults;

    if (sr) {
      if (sr.results) {
        row3 = <div className="row app_vsp15">
          <Stats qtime={sr.queryTime}
            numFound={sr.totalFound}
            start={sr.start}
            len={sr.results.length} />

          <div className="col-sm-2">
            <Accordion>
              <div label="Filters">
                <small><AnchorPass title={"Reset filters"} onClick={this.resetFilters.bind(this)}/></small>

                <h5 className="app_vsp15">Dates:</h5>
                <FacetList facets={sr.facets.date_range}
                  handleActions={this.handleActions.bind(this)}
                  fieldname="created_dt" />

                <h5 className="app_vsp15">Tags:</h5>
                <FacetList facets={sr.facets.tags}
                  handleActions={this.handleActions.bind(this)}
                  fieldname="tags_ss"
                  multiSelect="true" />

                <h5 className="app_vsp15">Mentions:</h5>
                <FacetList facets={sr.facets.mentions}
                  handleActions={this.handleActions.bind(this)}
                  fieldname="mentions"
                  multiSelect="true" />
              </div>
            </Accordion>

            <h4 className="app_vsp15"></h4>
            <Pager numFound={sr.totalFound}
              start={sr.start}
              len={sr.results.length}
              handleActions={this.handleActions.bind(this)}
              pageSize={sr.pageSize} />
            <Results searchResults={sr.results} />
          </div>

          <div className="col-sm-10">
            <ErrorBoundary>
              <MarkdownController documentId={this.props.documentId} searchRefresh={this.refreshFilters.bind(this)}/> 
            </ErrorBoundary>
          </div>
        </div>;
      }
    }

    const busy = this.props.busy ? <h4>searching...</h4> : null;

    return <div className="container">
      <div className="row">
        <QueryInput initialQuery={qp.query} handleActions={this.handleActions.bind(this)} onClickReset={this.resetQueryString.bind(this)}/>
      </div>
      {row3}
      {busy}
    </div>;
  }

  resetFilters() {
    let queryParams = this.props.queryParams;
    queryParams.filters = [];
    this.props.setQueryParams(queryParams);
  }

  resetQueryString() {
    let queryParams = this.props.queryParams;
    queryParams.query = "";
    this.props.setQueryParams(queryParams);
  }

  refreshFilters() {
    this.props.setQueryParams(this.props.queryParams);
  }

  handleActions(actions) {
    let queryParams = this.props.queryParams;

    actions.forEach(act => {
      if (act.type === SET_FILTER_ACTION) {
        const f = queryParams.filters || [];    // default empty array
        queryParams = update(queryParams, {
          filters: { $set: act.apply ?
            f.concat([act.filter]) :            // add the new filter
            f.filter(x => x != act.filter)      // or remove it
        }});
      }
      else if (act.type === CLEAR_FILTERS_ACTION) {
        if (queryParams.filters) {
          const prefix = act.fieldname + ":";
          const filters = queryParams.filters.filter(x =>
            !x.startsWith(prefix));
          queryParams = update(queryParams, { filters: { $set: filters }});
        }
      }
      else if (act.type === SET_QUERY_ACTION) {
        queryParams = update(queryParams, { query: { $set: act.query }});
      }
      else if (act.type === SET_PAGE_ACTION) {
        queryParams = update(queryParams, { page: { $set: act.page }});
      }
    });

    // now queryParams is fully mutated, set it
    this.props.setQueryParams(queryParams);
  }
  
}

SearchApp.propTypes = {
  queryParams: PropTypes.object,
  searchResults: PropTypes.object,
  busy: PropTypes.bool,
  setQueryParams: PropTypes.func.isRequired,
  selectedDoc: PropTypes.func
};

export default SearchApp;
