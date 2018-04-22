// Dependencies
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Modules
import { search, setQuery } from '../modules/search/search'

const FilterLink = styled.a`
  float: right;
  font-weight: ${props => props.selected ? 'bold' : 'normal'}
  margin-left: 10px;
  cursor: pointer;
`

const FilterLabel = styled.h6`
  float: right;
  margin-top: 4px;
  font-size: 1.1rem;
  text-transform: uppercase;
`

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
    const { query, setQuery } = this.props

    query.term = value
    setQuery(query)
    this.search(query)
  }

  setSortBy = sortBy => {
    const { query, setQuery } = this.props

    query.sortBy = sortBy
    setQuery(query)
    this.search(query)
  }

  render() {
    const { query: { sortBy, term } } = this.props

    return (
      <form>
        <div className="u-cf u-full-width">
          <h5 className="u-pull-left">Repositories</h5>
          <FilterLink
            onClick={this.setSortBy.bind(null, 'forks')}
            selected={sortBy === 'forks'}
          >
            Forks
          </FilterLink>
          &nbsp;
          <FilterLink
            onClick={this.setSortBy.bind(null, 'stars')}
            selected={sortBy === 'stars'}
          >
            Stars
          </FilterLink>
          &nbsp;

          <FilterLabel>Sort By</FilterLabel>
        </div>
        <div>
          <input
            className="u-full-width"
            onChange={this.handleInput}
            placeholder="Search organization..."
            type="text"
            value={term}
          />
        </div> 
      </form>
    )
  }
}
