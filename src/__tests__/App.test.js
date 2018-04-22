// Test Depenencies
import React from 'react'
import { assert } from 'chai'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'

// Store
import store from '../modules/store/store'

// Components
import App from '../App'
import CommitList from '../components/commit-list'
import RepoList from '../components/repo-list'
import SearchBar from '../components/search-bar'

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App/>
      </Provider>
    )
  })

  it('renders searchbar, repolist, commitlist', () => {
    const wrapper = shallow(<App />)

    assert.lengthOf(wrapper.find(CommitList), 1)
    assert.lengthOf(wrapper.find(RepoList), 1)
    assert.lengthOf(wrapper.find(SearchBar), 1)
  })
})
