import React, { Component } from 'react';
var _ = require('lodash');

export default class ErrorComponent extends Component {
  render() {
    return(
      <div className='error'>
        {this.props.error.message}
        { _.map(this.props.error.backtrace, (el, key) => (
            <div key={key}> {el[0]} </div>
          ))
        }
      </div>
    )
  }
}
