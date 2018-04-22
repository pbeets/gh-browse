// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Modules
import { search, setQuery } from '../modules/search/search'

@connect(state => ({ query: state.query }), { search, setQuery })
export default class SearchBar extends Component {
  static propTypes = {
    query: PropTypes.object
  }

  handleInput = ({ currentTarget: { value } }) => {
    const { query, search, setQuery } = this.props

    query.term = value
    setQuery(query)
    search(query)
  }

  sortByForks = () => {
    const { setFilter } = this.props

    setFilter('forks')
  }

  sortByStars = () => {
    const { setFilter } = this.props

    setFilter('stars')
  }

  render() {
    const { query: { term } } = this.props

    return (
      <div>
        <input type="text" value={term} onChange={this.handleInput} placeholder="Search organization..."/>
        <button type="button" onClick={this.sortByStars}>
          Sort by Stars
        </button>
        <button type="button" onClick={this.sortByForks}>
          Sort by Forks
        </button>
      </div>
    )
  }
}
