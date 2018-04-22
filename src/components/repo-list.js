// Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import RepoListItem from './repo-list-item'

export default class RepoList extends Component {
  static propTypes = {
    repos: PropTypes.array
  }

  render() {
    const { repos = [{ name: 'Sample Repo' }] } = this.props

    return (
      <div>
        {repos.map(repo => <RepoListItem key={repo.name} repo={repo}/>)}
      </div>
    )
  }
}
