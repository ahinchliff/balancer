import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
  class requireAuth extends Component {

    componentWillMount() {
      if (this.props.user === false) {
        this.props.history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user === false) {
        this.props.history.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  return connect(mapStateToProps)(withRouter(requireAuth));
}