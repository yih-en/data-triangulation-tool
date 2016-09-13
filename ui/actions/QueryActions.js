var $  = require('jquery');
var _ = require('lodash');

export function successSaveApi(status, data) {
  return {
    type: 'SUCCESS_SAVE_QUERY',
    status,
    data
  }
}

export function successRunApi(result) {
  return {
    type: 'SUCCESS_RUN_QUERY',
    result
  }
}

export function changeLogicType(index, logicType) {
  return {
    type: 'CHANGE_LOGIC_TYPE',
    index,
    logicType
  }
}

export function getInitialData(data){
  return {
    type: 'GET_INITIAL_DATA',
    data
  }
}

export function getConnectionInfo(info){
  return {
    type: 'GET_CONNECTION_INFO',
    info
  }
}

export function error(error){
  return {
    type: 'ERROR',
    error
  }
}

export function requestInitialData(id) {
  return(dispatch, getState) => {
    $.ajax({ url: 'http://localhost:9292/query?id=' + id}).done((res) => {
      let response = JSON.parse(res)
      if(_.has(response, error)) {
        dispatch(error(response))
      } else {
        dispatch(getInitialData(response))
      }
    })
  }
}

export function requestConnectionInfo() {
  return(dispatch, getState) => {
    $.ajax({ url: 'http://localhost:9292/connection_info'}).done((res) => {
      let response = JSON.parse(res)
      if(_.has(response, error)) {
        dispatch(error(response))
      } else {
        dispatch(getConnectionInfo(response))
      }
    })
  }
}

export function saveForm(payload) {
  return (dispatch, getState) => {
    $.ajax({
      method: "POST",
      url: 'http://localhost:9292/save',
      data: JSON.stringify(payload)
    }).done(res => {
      let response = JSON.parse(res)
      if(_.has(response, 'error')) {
        dispatch(error(response))
      } else {
        dispatch(successSaveApi(response.status, response.data))
      }
    })
  }
}

export function runForm(payload) {
  return (dispatch, getState) => {
    $.ajax({
      method: "POST",
      url: 'http://localhost:9292/run',
      data: JSON.stringify(payload)
    }).done(res => {
      let response = JSON.parse(res)
      if(_.has(response, 'error')) {
        dispatch(error(response))
      } else {
        dispatch(successRunApi(response))
      }
    })
  }
}
