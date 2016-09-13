import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import fieldComponent from './FieldComponent';
import * as Input from './Input';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/sql';
import 'brace/theme/monokai';

var _ = require('lodash');

const TextField = fieldComponent(Input.TextInput);
const SelectField = fieldComponent(Input.SelectInput);

export default class LogicForm extends Component {
  generateOptionList(info) {
    let result = []

    _.map(info.connectionInfo, (el, index) => {
      result.push([el[0], el[1]])
    })
    return result
  }

  renderQueryType() {
    const {
      logic_type,
      connection_name,
      name,
      description,
      query,
      transforms,
      changeLogicType
    } = this.props

    return (
      <div>
        <TextField label="Name" className="inline-form form-input" {...name}></TextField>
        <TextField label="Description" className="inline-form" {...description}></TextField>
        { this.props.connectionInfo &&
          <SelectField
            label="Database"
            className="form-input"
            optionList={this.generateOptionList(this.props.connectionInfo)}
            {...connection_name}>
          </SelectField>
        }


        <div className="editor">
          <AceEditor
            mode="sql"
            theme="monokai"
            name="query"
            editorProps={{$blockScrolling: true}}
            showPrintMargin={true}
            {...query}
          />
        </div>
      </div>
    )
  }

  renderTransformType() {
    const {
      transform,
      name
    } = this.props

    return (
      <div className="form-input">
      <div>
        <TextField
          label="Name"
          className="inline-form"
          {...name} >
        </TextField>
        <TextField
          label="Transform"
          className="inline-form"
          {...transform}>
        </TextField>
      </div>
      </div>
     )
  }

  render() {
    return(
      <div>
        { this.props.logic_type.value == 'sql' && this.renderQueryType() }
        { this.props.logic_type.value == 'transformation' && this.renderTransformType() }
      </div>
    )
  }
}
