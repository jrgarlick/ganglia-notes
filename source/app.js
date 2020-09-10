import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, hashHistory } from 'react-router';
import NavBar from './components/navbar';
import SearchAppContainer from './components/searchappcontainer';
import SearchApp from './components/searchapp';
import { makeSearchService } from './services/solrsearchservice';
import { HistoryService } from './services/historyservice.ts';
import solrConf from './conf/solrconf';
import TasksContainer from './components/tasks/taskscontainer';

const searchService = makeSearchService(solrConf);
const historyService = new HistoryService(solrConf);

const App = (props) =>
  <div>
    <NavBar/>
    {props.children}
  </div>;

const About = () =>
  <h1>About</h1>;

let Tasks = (props) => {
  let taskId = props.params.taskId;
  console.log(props);
  return <div><h1>Tasks</h1><p>{taskId}</p></div>;
}

const Contact = () =>
  <h1>Contact</h1>;

const History = () =>
  <h1>History</h1>;

// set the searchService on the SearchAppContainer. 
// need to explictly pass props.location from Router.
const SearchAppContainer2 = (props) => {
  console.log(props);
  return <SearchAppContainer params={props.params} location={props.location} searchService={searchService} historyService={historyService} />;
}

const tasksComponent = (props) => {
  return <TasksContainer params={props.params}/>;
}

const RoutedApp = () =>
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="" component={History} />
      <Route exact path="notes" component={SearchAppContainer2} />
      <Route exact path="notes/:documentId" component={SearchAppContainer2} />
      <Route path="tasks" component={tasksComponent} />
      <Route exact path="tasks/:taskPath" component={tasksComponent} />
      <Route path="about" component={About} />
      <Route path="history" component={History} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>;

ReactDOM.render(<RoutedApp/>, document.getElementById('app'));
