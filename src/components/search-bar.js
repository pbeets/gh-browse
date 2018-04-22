// Dependencies
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Modules
import { search, setQuery } from '../modules/search/search'

@connect(state => ({ query: state.query }), { search, setQuery })
export default class SearchBar extends Component {
  static propTypes = {
    // State props
    query: PropTypes.object,

    // Action props
    search: PropTypes.func,
    setQuery: PropTypes.func
  }

  constructor(props) {
    super(props)

    // Since we are not authenticated, we debounce queries as not to hit
    // the API limit that quickly.
    this.search = debounce(props.search, 500, { leading: true })
  }

  handleInput = ({ currentTarget: { value } }) => {
    const { query, search, setQuery } = this.props

    query.term = value
    setQuery(query)
    this.search(query)
  }

  setSortBy = sortBy => {
    const { query, search, setQuery } = this.props

    query.sortBy = sortBy
    setQuery(query)
    this.search(query)
  }

  render() {
    const { query: { term } } = this.props

    return (
      <div>
        <input
          onChange={this.handleInput}
          placeholder="Search organization..."
          type="text"
          value={term}
        />
        <button type="button" onClick={this.setSortBy.bind(null, 'stars')}>
          Sort by Stars
        </button>
        <button type="button" onClick={this.setSortBy.bind(null, 'forks')}>
          Sort by Forks
        </button>
      </div>
    )
  }
}
