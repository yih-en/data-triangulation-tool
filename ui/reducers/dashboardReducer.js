const initialState = [];

export default function dashboardReducer(state=[], action) {
  switch (action.type) {
    case 'GET_QUERY_LINKS':
      return action.links
    default:
      return state
  }
}
