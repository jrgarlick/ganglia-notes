import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import TaskTabs from './tasktabs';

class TasksContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div className="container"><div className="app_vsp15"><TaskTabs taskPath={this.props.params?.taskPath} /></div></div>;
  }
}

export default TasksContainer;