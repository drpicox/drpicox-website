import React, { Component } from 'react'

import minidown from '../minidown'

function createElement(ast) {
  if (typeof ast === 'string') {
    return ast
  }

  const [e, p, ...elements] = ast
  return React.createElement(e, p, ...createElements(elements))
}

function createElements(ast) {
  return ast.map(createElement)
}

export default class MinidownComponent extends Component {
  rendered = null

  render() {
    if (this.text !== this.props.text && this.props.text) {
      this.text = this.props.text
      let ast = minidown(this.text)
      this.rendered = React.createElement('div', null, ...createElements(ast))
    }

    return this.rendered
  }
}
