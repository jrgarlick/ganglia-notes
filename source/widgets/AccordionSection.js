import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
* This component is a very simple accordion shamelessly taken from this
* article: https://www.digitalocean.com/community/tutorials/react-react-accordion-component
*/

class AccordionSection extends Component {
  constructor(props) {
      super(props);
  }

  onClick() {
    this.props.onClick(this.props.label);
  }

  render() {
    const {
    //   onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div
        style={{
          background: isOpen ? '#eeeeee' : '#dddddd',
          border: '1px solid #008f68',
          padding: '3px 5px',
        }}
      >
        <div onClick={this.onClick.bind(this)} style={{ cursor: 'pointer' }}>
          {label}
          <div style={{ float: 'right' }}>
            {!isOpen && <span>&#9650;</span>}
            {isOpen && <span>&#9660;</span>}
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              background: '#eeeeee',
              border: '2px solid #dddddd',
              marginTop: 10,
              padding: '10px 20px',
            }}
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

AccordionSection.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AccordionSection;