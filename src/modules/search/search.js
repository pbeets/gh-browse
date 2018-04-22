// Dependencies
import { handle } from 'redux-pack'

const INITIAL_STATE = {
  commits: [],
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
        start: prevState => ({ ...prevState, commits: [] }),
        failure: prevState => ({ ...prevState, repos: [] }),
        success: prevState => {
          // We need to check to see if the current response is from an older
          // request, in which case we should discard the results as they are stale.
          return action.meta.time > state.time ? {
            ...prevState,
            time: action.meta.time,
            repos: action.payload ? action.payload.items : []
          } : prevState
        }
      })

    case 'FETCH_COMMITS':
      return handle(state, action, {
        success: prevState => ({ ...prevState, commits: action.payload ? action.payload : [] })
      })

    default:
      return state
  }
}

/**
 * Sets the query to search repos of an organization.
 * Currently supports the following options
 * - term
 * - sortBy ('stars' and 'forks')
 * - orderBy
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
 * Fetches list of repos of an organization.
 * 
 * Note: Github does not let you sort by stars or forks
 * using the /user/:user or /orgs/:org endpoints, so we
 * use the search endpoint instead
 */
function fetchRepos({ term, sortBy, orderBy }) {
  if (term) {
    return fetch(`https://api.github.com/search/repositories?q=user:${term}&sort=${sortBy}&order=${orderBy}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    }).then(handleResponse)
  }

  return Promise.resolve()
}

/**
 * Actiopn creator to fetch on commits of a particular repository.
 * @param {string} owner
 * @param {string} repo 
 */
export function loadCommits(owner, repo) {
  return {
    type: 'FETCH_COMMITS',
    promise: fetchCommits(owner, repo)
  }
}

/**
 * Fetches list of commits by repo.
 * @param {string} owner
 * @param {string} repo
 */
function fetchCommits(owner, repo) {
  if (owner && repo) {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    }).then(handleResponse)
  }
}

/**
 * Returns response as json Promise
 * @param {Response} res 
 */
function handleResponse(res) {
  if (res.ok) {
    return res.json()
  }

  throw Response.error(res.statusText)
}
