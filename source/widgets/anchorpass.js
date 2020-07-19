import React, { Component }  from 'react';

export default function AnchorPass(props) {
  /*
  * Simple anchor tag that correctly handles clicks and passes the clicked value 
  * to the onClick callback method.
  * props: 
      onClick: callback to execute on click
      value: value to pass to handler
      label: label to use for anchor tag
  */
  const handleClick = (event) => {
    event.preventDefault();
    props.onClick(props.value);
  }

  return (
    <a href="#" onClick={handleClick}>{props.title}</a>
  );
}
