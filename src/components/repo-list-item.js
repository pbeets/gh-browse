// Dependencies
import React from 'react'
import styled from 'styled-components'

const ForkIcon = () => (
  <svg aria-label="fork" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img">
    <path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1
      3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34
      4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2
      1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0
      .65-.55 1.2-1.2 1.2z"/>
  </svg>
)

const StarIcon = () => (
  <svg aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
    <path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/>
  </svg>
)

const Icon = styled.span`
  vertical-align: text-top;
  margin-right: 2px;
  margin-left: 15px;
`

const IconBar = styled.div`
  text-align: right;
  font-size: 1.4rem;
`

const ListItem = styled.div`
  background-color: ${props => props.selected ? '#EFEAFD' : '#fff'};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #E8F4F9;
  }
`

const RepoTitle = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
`

export default ({ onClick, repo, selected }) => (
  <ListItem onClick={onClick} selected={selected}>
    <RepoTitle>{repo.name}</RepoTitle>
    <p>{repo.description}</p>
    <IconBar>
      <Icon><StarIcon/></Icon>{repo.stargazers_count}
      <Icon><ForkIcon/></Icon>{repo.forks_count}
    </IconBar>
  </ListItem>
)
