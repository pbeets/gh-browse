// Test Depenencies
import React from 'react'
import { assert } from 'chai'
import { mount } from 'enzyme'

// Components
import { CommitList, CommitContainer } from '../commit-list'
import CommitListItem from '../commit-list-item'

const props = {
  commits: [{
    sha: 'abcdef',
    commit: {
      message: 'Test Message',
      author: {
        date: '2018-02-21T18:34:35Z',
        name: 'Test Person'
      }
    }
  }, {
    sha: 'zdefb',
    commit: {
      message: 'Another Message',
      author: {
        date: '2018-02-11T18:34:35Z',
        name: 'Test Person'
      }
    }
  }]
}

describe('CommitList', () => {
  it('shouldn\'t render anything if there are no commits', () => {
    const emptyProps = {
      commits: []
    }

    const wrapper = mount(<CommitList {...emptyProps}/>)
    assert.lengthOf(wrapper.find(CommitContainer), 0)
  })

  it('should render a div', () => {
    const wrapper = mount(<CommitList {...props} />)
    assert.lengthOf(wrapper.find(CommitContainer), 1)
  })

  it('should render two commit rows', () => {
    const wrapper = mount(<CommitList {...props} />)
    assert.lengthOf(wrapper.find(CommitListItem), 2)
  })
})