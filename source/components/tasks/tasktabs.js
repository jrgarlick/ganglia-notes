import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class TaskTabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.figureOutState(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.taskPath !== this.props.taskPath) {
      return this.figureOutState(this.props);
    }
    return {};
  }

  render() {
    return (
      <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
        <TabList>
          <Tab>Backlog</Tab>
          <Tab>Kanban</Tab>
          <Tab>My Status</Tab>
          {this.state.taskId !== undefined ? <Tab>Task Details</Tab> : ""}
        </TabList>
        <TabPanel>
          <h2>Simple list of tasks</h2>
        </TabPanel>
        <TabPanel>
          <h2>Kanban board here</h2>
        </TabPanel>
        <TabPanel>
          <h2>Task status outline pages</h2>
        </TabPanel>
        {this.state.taskId !== undefined ? <TabPanel><h2>this is a status page for {this.state.taskId}</h2></TabPanel> : ""}
      </Tabs>);
  }

  figureOutState(props) {
    let tabIndex = 0;
    let taskId = undefined;
    if (props.taskPath === "kanban") {
      tabIndex = 1;
    } else if (props.taskPath === "status") {
      tabIndex = 2;
    } else if (props.taskPath !== undefined) {
      tabIndex = 3;
      taskId = props.taskPath;
    }
    return {
      tabIndex: tabIndex,
      taskId: taskId
    };
  }
}

export default TaskTabs;