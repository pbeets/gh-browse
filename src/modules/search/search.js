// Dependencies
const INITIAL_STATE = {
  repos: [],
  query: ''
}

/**
 * Search store reducer for use w/ redux
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_QUERY':
      return Object.assign({}, state, {
        query: action.data
      })
    case 'SET_REPOS':
      return Object.assign({}, state, {
        repos: action.data
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
  // fetchRepos(query)

  return {
    type: 'SET_QUERY',
    data: query
  }
}

/**
 * Fetches list of repos of an organization
 */
export function fetchRepos(repoName) {
  if (repoName) {
    return fetch(`https://api.github.com/users/${repoName}/repos`, {
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
