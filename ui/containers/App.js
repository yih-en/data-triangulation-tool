import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import * as PageActions from '../actions/PageActions';
import * as DashboardActions from '../actions/DashboardActions';
import * as QueryActions from '../actions/QueryActions';

import PageDashboard from '../containers/PageDashboard';
import PageQuery from '../containers/PageQuery';

class App extends Component {
  componentDidMount() {
    this.props.requestQueriesLinks()
  }

  componentDidUpdate() {
    this.props.requestQueriesLinks()
  }

  whichPage() {
    if(this.props.page == 'dashboard') {
      return 'query';
    }else {
      return 'dashboard';
    }
  }

  textPage(page) {
    if(page == 'query') {
      return "create new query"
    } else {
      return 'dashboard'
    }
  }

  changePageHandler(page) {
    if(page == 'query') {
      this.props.requestConnectionInfo()
      this.props.getInitialData({})
    }

    this.props.changePage(page)
  }

  render() {
    return (
      <div className='container'>
        <div className='header'>
          <h2>
            { _.capitalize(this.props.page) }
          </h2>
          <button
            className='button button-primary button-query'
            onClick={ () => this.changePageHandler(this.whichPage()) }>
            { _.capitalize(this.textPage(this.whichPage())) }
          </button>
        </div>
          { pages[this.props.page] }
      </div>
    )
  }
}

const pages = {
  'dashboard' : <PageDashboard></PageDashboard>,
  'query': <PageQuery></PageQuery>
}

function mapState(state) {
  return {
    page: state.page.page
  };
}

function mapDispatch(dispatch) {
  return {
    ...bindActionCreators(PageActions, dispatch),
    ...bindActionCreators(DashboardActions, dispatch),
    ...bindActionCreators(QueryActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);
