// Dependencies
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import CommitListItem from './commit-list-item'

export const CommitContainer = styled.div`
  border-radius: 5px;
  padding: 15px;
  border-top: 10px solid #E87C7B;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
`

const Title = styled.div`
  color: #E87C7B;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`

export class CommitList extends Component {
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

export default connect((state) => ({ commits: state.commits }))(CommitList)
