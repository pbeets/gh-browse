// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Modules
import { loadCommits } from '../modules/search/search'

// Components
import RepoListItem from './repo-list-item'

export class RepoList extends Component {
  static propTypes = {
    // State props
    query: PropTypes.object,
    repos: PropTypes.array,

    // Action props
    loadCommits: PropTypes.func
  }

  state = {
    // Leaving this here for simplicity, but would normally
    // move this to the redux store.
    selectedRepo: ''
  }

  selectRepo = (owner, repo) => {
    const { loadCommits } = this.props

    this.setState({ selectedRepo: repo })
    loadCommits(owner, repo)
  }

  render() {
    const { repos } = this.props
    const { selectedRepo } = this.state

    return (
      <div>
        {repos.length > 0 ?
          repos.map(repo => 
            <RepoListItem
              key={repo.name}
              onClick={this.selectRepo.bind(null, repo.owner.login, repo.name)}
              repo={repo}
              selected={repo.name === selectedRepo}
            />
          ) : "Organization does not exist, or has no repositories."
        }
      </div>
    )
  }
}

export default connect(state => ({
  query: state.query,
  repos: state.repos
}), { loadCommits })(RepoList)
