import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onClick: () => {},
  };

  handleClick = event => {
    this.props.onClick(event);

    if (event.defaultPrevented === true) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (isAbsoluteURL(this.props.to)) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    // NOTE: target omitted on purpose.
    const { to, onClick, children, ...otherProps } = this.props;
    if (otherProps.target === undefined && isAbsoluteURL(to)) {
      otherProps.target = '_blank';
    }

    return (
      <a {...otherProps} href={to} onClick={this.handleClick}>{children}</a>
    );
  }
}

export default Link;

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function isAbsoluteURL(url) {
  if (url.indexOf('//') === 0) {
    return true;
  }

  if (url.indexOf('/') === 0) {
    return false;
  }

  return true;
}
