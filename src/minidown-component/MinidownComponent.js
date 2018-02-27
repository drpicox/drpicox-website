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
  render() {
    let { text, render } = this
    if (text !== this.props.text) {
      text = this.props.text
      let ast = minidown(text)
      render = React.createElement('div', null, ...createElements(ast))
    }

    return render
  }
}
