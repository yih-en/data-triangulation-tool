import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
var _ = require('lodash');

export default class Result extends Component {
  render() {
    return(
      <table>
        <tbody>
          <tr>
            {
              _.map(_.keys(this.props.queries[1][0]), (key) => (
                <th key={key}>{key}</th>
              ))
            }
          </tr>
          {
            _.map(this.props.queries[1], (query, index1) => (
              <tr key={index1}>
                { _.map(_.values(query), (value, index2) => (
                  <td key={index2}>{value}</td>
                )) }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

// ["sql", [{abc: "1k"}, {abc: "2k"}]]
