// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import RepoListItem from './repo-list-item'

@connect(state => ({ repos: state.repos }))
export default class RepoList extends Component {
  static propTypes = {
    repos: PropTypes.array
  }

  render() {
    const { repos } = this.props

    return (
      <div>
        {repos.length > 0 ?
          repos.map(repo => <RepoListItem key={repo.name} repo={repo}/>) :
          "Organization does not exist, or has no repositories."
        }
      </div>
    )
  }
}
