const initialState = {
  page: "dashboard"
}

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.page
      })
    default:
      return state
  }
}
