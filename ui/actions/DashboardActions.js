var $  = require('jquery')

export function getQueriesLinks(links){
  return {
    type: 'GET_QUERY_LINKS',
    links
  }
}

export function requestQueriesLinks() {
  return(dispatch, getState) => {
    $.ajax({ url: 'http://localhost:9292/queries_links'}).done((res) => {
      dispatch(getQueriesLinks(JSON.parse(res)))
    })
  }
}
