import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

const StickyLink = ({ to, children, location}) => {
  return <Link to={{ pathname: to, search: location.search }}>{children}</Link>
}
export default withRouter(StickyLink);