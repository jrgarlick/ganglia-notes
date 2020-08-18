import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import SearchApp from './searchapp';

class SearchAppContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      response: null,
    };
  }

  /*
   * When the component mounts, do an initial search in case there is a
   * query in the location.
   */
  componentDidMount() {
    this.doSearch(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.doSearch(this.props);
    } 
  }

  /*
   * pass the query params to the search service and get the search results.
   * we need to pass props rather than use this.props because of the way that
   * componentDidMount() works.
   */
  doSearch(props) {
    // first, set busy indicator
    // NOTE: don't set response to null here, as it will cause the facet lists
    // to be unmounted/remounted if we change a filter, losing collapse state.
    // i.e.:  this.setState({ response: null, busy: true });
    this.setState({ busy: true });

    const qp = this.getQueryParams(props);
    if (qp.query) {
      this.props.searchService(qp, (response) => {
        this.setState({ response, busy: false });
      });
    } else {
      this.setState({ response: null, busy: false });
    }
  }

  /*
   * should return {
   *  query: string,
   *  filters: list-of-strings
   *  page: number
   * }
   */
  getQueryParams(props) {
    const query = props.location.query.q || '*';
    const page = parseInt(props.location.query.page || 0);
    let filters = [];
    if (props.location.query.filt) {
      if (props.location.query.filt instanceof Array) {
        filters = props.location.query.filt.slice(0);
      } else {
        filters = [ props.location.query.filt ];
      }
    }

    return { query, filters, page };
  }

  setQueryParams(queryParams) {
    this.context.router.push({ 
      pathname: this.context.router.location.pathname,
      query: {
        q: queryParams.query,
        filt: queryParams.filters,
        page: queryParams.page
      }});
  }

  render() {
    console.log("SearchAppContainer.render() - "+this.props.params.documentId);
    return <SearchApp queryParams={this.getQueryParams(this.props)}
                      searchResults={this.state.response}
                      setQueryParams={this.setQueryParams.bind(this)}
                      busy={this.state.busy} 
                      historyService={this.props.historyService}
                      documentId={this.props.params.documentId}/>;
  }
}

SearchAppContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

SearchAppContainer.propTypes = {
  searchService: PropTypes.func.isRequired
};

export default SearchAppContainer;
