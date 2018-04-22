// Test Depenencies
import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'

// Components
import CommitListItem, { CommitContainer } from '../commit-list-item'

const commit = {
  sha: 'abcdef',
  commit: {
    message: 'Test Message',
    author: {
      date: '2018-02-21T18:34:35Z',
      name: 'Test Person'
    }
  }
}

describe('CommitListItem', () => {
  it('renders a div', () => {
    const wrapper = shallow(<CommitListItem commit={commit} />)

    assert.lengthOf(wrapper.find(CommitContainer), 1)
  })

  it('renders commit data', () => {
    const wrapper = shallow(<CommitListItem commit={commit}/>)
    const html = wrapper.html()

    assert.include(html, '#abcdef')
    assert.include(html, 'Test Person')
    assert.include(html, 'Test Message')
  })
})
