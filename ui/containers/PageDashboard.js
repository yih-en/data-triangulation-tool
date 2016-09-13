import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
var _ = require('lodash');

import * as DashboardActions from '../actions/DashboardActions';
import * as QueryActions from '../actions/QueryActions';
import * as PageActions from '../actions/PageActions';

class PageDashboard extends Component {
  changePageAndLoadData(link) {
    return () => {
      this.props.requestInitialData(link)
      this.props.requestConnectionInfo()
      this.props.changePage('query')
    }
  }

  render() {
    return (
      <div>
        <div>
          {
            this.props.links.map((link) => (
              <div
                key={link}
                className='link'
                onClick={this.changePageAndLoadData(link).bind(this)}
              >
                {link}
              </div>

            ))
          }
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    links: state.dashboard
  }
}

function mapDispatch(dispatch) {
  return {
    ...bindActionCreators(DashboardActions, dispatch),
    ...bindActionCreators(QueryActions, dispatch),
    ...bindActionCreators(PageActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(PageDashboard);
