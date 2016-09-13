import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import Form from '../components/Form';
import ErrorComponent from '../components/ErrorComponent';
import * as QueryActions from '../actions/QueryActions';
import * as DashboardActions from '../actions/DashboardActions';

class PageQuery extends Component {
  render() {
    return (
      <div>
        <Form></Form>
        {
          this.props.query.error &&
          <ErrorComponent error={this.props.query.error}></ErrorComponent>
        }
        {
          this.props.query.status &&
          <div className='success'>{this.props.query.status }</div>
        }
      </div>
    )
  }
}

function mapState(state) {
  return {
    query: state.query
  }
}

function mapDispatch(dispatch) {
  return { ...bindActionCreators(QueryActions, dispatch) }
}

export default connect(mapState, mapDispatch)(PageQuery);
