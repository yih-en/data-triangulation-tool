import React, { Component } from 'react';
var _ = require('lodash');

export default (Field) => class extends Component {
  render() {
    const props = _.omit(
      this.props,
      [
        'initialValue',
        'autofill',
        'onUpdate',
        'valid',
        'invalid',
        'dirty',
        'pristine',
        'active',
        'touched',
        'visited',
        'autofilled'
      ]
    )

    return (
      <div className ={this.props.className}>
        <label>{this.props.label}</label>
        <Field {...props}></Field>
      </div>
    )
  }
}
