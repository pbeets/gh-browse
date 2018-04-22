// Dependencies
import { handle } from 'redux-pack'
import { debounce } from 'lodash'

const INITIAL_STATE = {
  repos: [],
  query: {
    term: '',
    orderBy: 'desc',
    sortBy: 'stars'
  }
}

/**
 * Search store reducer for use w/ redux
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_QUERY':
      return { ...state, query: {...action.payload }}

    case 'FETCH_REPOS':
      return handle(state, action, {
        success: prevState => ({ ...prevState, repos: action.payload ? action.payload.items : [] })
      })

    default:
      return state
  }
}

/**
 * Sets the query to search repos of an organization
 * @param {string} query
 */
export function setQuery(query) {
  return {
    type: 'SET_QUERY',
    payload: query
  }
}

/**
 * Since we are not authenticated, we debounce queries as not to hit
 * the API limit that quickly.
 */
const debouncedSearch = debounce(search, 500)

/**
 * Executes search with all the query params in the
 * query object.
 * @param {object} query 
 */
export function search(query) {
  return {
    type: 'FETCH_REPOS',
    promise: fetchRepos(query)
  }
}

/**
 * Sets the metric to sort by, currently we support only
 * 'stars' and 'forks'
 * @param {string} sortBy 
 */
export function setSortBy(sortBy) {
  return {
    type: 'SET_SORT_BY',
    sortBy
  }
}

/**
 * Fetches list of repos of an organization.
 * 
 * Note: Github does not let you sort by stars or forks
 * using the /user/:user or /orgs/:org endpoints, so we
 * use the search endpoint instead
 */
export function fetchRepos({ term, sortBy, orderBy }) {
  if (term) {
    return fetch(`https://api.github.com/search/repositories?q=user:${term}&sort=${sortBy}&order=${orderBy}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    }).then(res => {
      if (res.ok) {
        return res.json()
      }

      throw Response.error(res.statusText)
    })
  }

  return Promise.resolve()
}

function fetchCommits(repoName) {

}
