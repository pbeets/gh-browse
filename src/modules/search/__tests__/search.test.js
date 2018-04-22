// Test Dependencies
import { assert } from 'chai'

// Modules
import reducer, { setQuery } from '../search'

const SEARCH_STORE_INITIAL_STATE = {
  commits: [],
  query: {
    term: '',
    orderBy: 'desc',
    sortBy: 'stars'
  },
  time: 0,
  repos: []
}

const query = {
  orderBy: 'desc',
  sortBy: 'forks',
  term: 'pizza'
}

describe('search module actions', () => {
  it('should create an action to set query', () => {
    const expectedAction = {
      type: 'SET_QUERY',
      payload: query
    }

    assert.deepEqual(setQuery(query), expectedAction)
  })
})

describe('search module store', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reducer(undefined, {}), SEARCH_STORE_INITIAL_STATE)
  })

  it('should set a query', () => {
    assert.deepEqual(reducer({}, setQuery(query)).query, query)
  })
})
