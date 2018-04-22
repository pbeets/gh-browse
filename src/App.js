// Dependencies
import React from 'react'
import styled from 'styled-components'

// Components
import CommitList from './components/commit-list'
import RepoList from './components/repo-list'
import SearchBar from './components/search-bar'

const Header = styled.div`
  margin: 100px 0 50px 0;
  text-align: center;
`

const Footer = styled.div`
  margin-bottom: 100px;
`

export default () => (
  <div className="container">
    <Header>
      <h1>Github Browse</h1>
    </Header>
    <div className="row">
      <div className="six columns">
        <SearchBar/>
        <RepoList/>
      </div>
      <div className="six columns">
        <CommitList/>
      </div>
    </div>
    <Footer/>
  </div>
)
