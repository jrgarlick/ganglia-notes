import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import AccordionSection from './AccordionSection';

/*
* This component is a very simple accordion shamelessly taken from this
* article: https://www.digitalocean.com/community/tutorials/react-react-accordion-component
*/

class Accordion extends Component {
  constructor(props) {
    super(props);

    const openSections = {};

    this.state = { openSections };
  }

  onClick(label) {
    const {
      state: { openSections },
    } = this;

    const isOpen = !!openSections[label];

    this.setState({
      openSections: {
        [label]: !isOpen
      }
    });
  };

  render() {
    const {
    //   onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div style={{border: '2px solid #999999' }}>
        {React.Children.map(children, (child) => (
          <AccordionSection
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={this.onClick.bind(this)}>
                {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
export default Accordion;