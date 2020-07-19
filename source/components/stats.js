import PropTypes from 'prop-types';
import React from 'react';

const Stats = ({len, start, numFound, qtime}) => {
  if (len > 0) {
    const first = start + 1;
    const last = start + len;
    const stime = qtime / 1000;
    return <div>
      {`${first}-${last} of ${numFound} found (search time ${stime}s)`}
      </div>;
    } else {
      return <div>No results found</div>;
    }
};

Stats.propTypes = {
  qtime: PropTypes.number.isRequired,
  numFound: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired
};

export default Stats;
