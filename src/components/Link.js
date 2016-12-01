import React, { Component, PropTypes } from 'react';

export default class Link extends Component {

  constructor() {
    super();

    this.boundOnClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (!event.button && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      const { name, params, options } = this.props;
      this.context.router.navigate(name, params, options);
    }
  }

  render() {
    const {
      children,
      name,
      params
    } = this.props;
    const {
      router
    } = this.context;

    const href = router.buildUrl(name, params);

    if (router.isActive(name, params)) {
      return <span>{children}</span>;
    }

    return <a href={href} onClick={this.boundOnClick}>{children}</a>;
  }
}

Link.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.object, // eslint-disable-line
  options: PropTypes.object, // eslint-disable-line
  children: PropTypes.node.isRequired
};

Link.contextTypes = {
  router: PropTypes.object.isRequired
};
