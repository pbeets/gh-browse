// Dependencies
import { debounce } from 'lodash'
import { handle } from 'redux-pack'

const INITIAL_STATE = {
  query: {
    term: '',
    orderBy: 'desc',
    sortBy: 'stars'
  },
  time: 0,
  repos: []
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
        success: prevState => {
          // We need to check to see if the current response is from an older
          // request, in which case we should discard the results.
          return action.meta.time > state.time ? {
            ...prevState,
            time: action.meta.time,
            repos: action.payload ? action.payload.items : []
          } : prevState
        }
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
 * Executes search with all the query params in the
 * query object.
 * @param {object} query 
 */
export function search(query) {
  return {
    type: 'FETCH_REPOS',
    meta: {
      time: Date.now()
    },
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
    }).then(data => { return data })
  }

  return Promise.resolve()
}

function fetchCommits(repoName) {

}
