import React from 'react'
import { connect } from 'react-redux'
import { routingPush } from '.'

const LinkPresentation = ({ children, onClick }) => (
  <a href="" onClick={onClick}>
    {children}
  </a>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: event => {
    event.preventDefault()
    dispatch(routingPush(ownProps.to))
  },
})

const Link = connect(undefined, mapDispatchToProps)(LinkPresentation)

export default Link
