import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import { DateRangeFilter } from 'src/'
import { SearchkitManager } from 'searchkit'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    const manager = SearchkitManager.mock()
    render(<DateRangeFilter searchkit={manager} id="test" field="test" min={0} max={2017} />, node, () => {
      expect(node.innerHTML).toContain('<div class="rc-slider"')
    })
  })
})
