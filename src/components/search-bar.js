// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Modules
import { setQuery } from '../modules/search/search'

@connect(null, { setQuery })
export default class SearchBar extends Component {
  handleInput = ({ currentTarget: { value } }) => {
    const { setQuery } = this.props
    console.log('setting query')
    setQuery(value)
  }

  render() {
    const { query } = this.props

    return (
      <div>
        <input type="text" value={query} onChange={this.handleInput} />
      </div>
    )
  }
}
