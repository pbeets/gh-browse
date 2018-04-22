// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import CommitListItem from './commit-list-item'

const CommitContainer = styled.div`
  border-radius: 5px;
  padding: 15px;
  border-top: 10px solid #E87C7B;
  background-color: #fff;
`

const Title = styled.div`
  color: #E87C7B;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`

@connect((state) => ({ commits: state.commits }))
export default class CommitList extends Component {
  static propTypes = {
    commits: PropTypes.array
  }

  render() {
    const { commits } = this.props

    return commits.length > 0 ? (
      <CommitContainer>
        <Title>Commits</Title>
        {commits.map(commit => <CommitListItem key={commit.sha} commit={commit}/>)}
      </CommitContainer>
    ) : null
  }
}
