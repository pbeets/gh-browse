// Dependencies
import React, { Component } from 'react'

// Components
import RepoList from './components/repo-list'
import SearchBar from './components/search-bar'

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <RepoList />
      </div>
    );
  }
}

export default App
