import React, { Component } from 'react';
import moment from 'moment';

class DateFormatter extends Component {
  constructor(props) {
      super(props);
      this.state = { hover: false }
  }

  handleMouseIn() {
    this.setState({ hover: true })
  }
  
  handleMouseOut() {
    this.setState({ hover: false })
  }

  render() {
    const tooltipStyle = {
      display: this.state.hover ? 'inline' : 'none'
    }
    const timeAgoStyle = {
      display: !this.state.hover ? 'inline' : 'none'
    }
    
    var dateMoment = moment(this.props.date+"");
    var fullDate = dateMoment.format('YYYY-MM-DD hh:mm:ss a');
    var timeAgo = dateMoment.fromNow();

    return <span onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}><span style={timeAgoStyle}>{timeAgo}</span><span style={tooltipStyle}>{fullDate}</span></span>;
  }
}
export default DateFormatter;