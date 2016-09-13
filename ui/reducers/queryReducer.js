const initialState = {};

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_SAVE_QUERY':
      return Object.assign({}, state, {
        status: action.status,
        data: action.data
      })
    case 'SUCCESS_RUN_QUERY':
      return Object.assign({}, state, {
        result: action.result,
        error: undefined,
        status: undefined
      })
    case 'CHANGE_LOGIC_TYPE':
      return Object.assign({}, state, {
        logicType: action.logicType
      })
    case 'GET_INITIAL_DATA':
      return Object.assign({}, state, {
        data: action.data,
        result: undefined,
        error: undefined,
        status: undefined
      })
    case 'GET_CONNECTION_INFO':
      return Object.assign({}, state, {
        info: action.info,
        error: undefined,
        status: undefined
      })
    case 'ERROR':
      return Object.assign({}, state, action.error)
    default:
      return state
  }
}
