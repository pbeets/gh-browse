// Dependencies
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

const CommitListItem = styled.div`
  margin-bottom: 30px;
`

const HashText = styled.div`
  font-size: 1.1rem;
  color: #99a;
`

export default ({ commit: { commit, sha } }) => (
  <CommitListItem>
    {commit.message}
    <HashText>
      {commit.author.name} - committed {moment(commit.author.date).fromNow()} - #{sha.substr(0, 6)}
    </HashText>
  </CommitListItem>
)
