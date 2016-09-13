import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import fieldComponent from './FieldComponent';
import * as Input from './Input';
import LogicForm from './LogicForm';
import Result from './Result';

import * as QueryActions from '../actions/QueryActions';

export const fields = [
  'name',
  'initial_data',
  'logics[].type',
  'logics[].connection_name',
  'logics[].name',
  'logics[].description',
  'logics[].query',
  'logics[].logic_type',
  'logics[].transform'
];

const TextField = fieldComponent(Input.TextInput);
const SelectField = fieldComponent(Input.SelectInput);

const data = {}

class Form extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.query !== this.props.query) {
      this.props.initializeForm(nextProps.query.data)
    }
  }

  save(data) {
    QueryActions.saveForm(data)(this.props.dispatch)
  }

  run(data) {
    this.props.runForm(data)
  }

  changeTypeHandler(index) {
    return (e) => {
      this.props.changeLogicType(index, e.target.value)
    }
  }

  renderResult(index) {
    if(_.isUndefined(this.props.query.result)){ return }

    const currentStack =  this.props.query.result.stack[index]
    if(currentStack[0] === 'sql') {
      return(
        <Result queries={currentStack}></Result>
      )
    } else {
      return(
        <div>{currentStack[1]}</div>
      )
    }
  }

  renderExistingForm(logics) {
    return(
      logics.map(
        (logic, index) => (
          <div key={index} className='query-form'>
            <div className="pull-right">
              <button type="button" className='button button-alert' onClick = {
                () => { logics.removeField(index)}
              } >
                Remove
              </button>
            </div>

            <SelectField
              label='Type'
              optionList={[['transformation', 'transform'], ['sql', 'query']]}
              {...logic.logic_type}>
            </SelectField>
            <LogicForm
              changeLogicType={this.changeTypeHandler(index)}
              connectionInfo={this.props.query.info}
              {...logic}></LogicForm>
            { this.renderResult(index) }
          </div>
        )
      )
    )
  }

  render() {
    const {
     fields: {
       name,
       initial_data,
       result,
       logics,
       status
     },
     handleSubmit,
     invalid,
     resetForm,
     submitting
     } = this.props

    return(
      <form>
        <div className='outer-form'>
          <TextField label='Name' className='inline-form' {...name}></TextField>
          <TextField label='Initial Data' className='inline-form' {...initial_data}></TextField>
        </div>
        <div>
          { this.renderExistingForm(logics) }
        </div>
        <button type='button' className='button button-normal' onClick={() => {
          logics.addField({ logic_type: 'sql' })
        }}>Add Query
        </button>
        <button type='button' className='button button-normal' onClick={handleSubmit(this.save.bind(this))}>
          Save Form
        </button>
        <button type='button' className='button button-run' onClick={handleSubmit(this.run.bind(this))}>
          Run
        </button>
        <button type="button" className='button button-alert' disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.query
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(QueryActions, dispatch)
  }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Form)

export default reduxForm(
  { form: 'form', fields },
  state => ({
    initialValues: {}
  })
)(connected)
