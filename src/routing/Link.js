import React from 'react'
import { connect } from 'react-redux'
import { routingPush } from '.'

const LinkPresentation = ({ children, onClick }) => (
  <div href={''} onClick={onClick}>
    {children}
  </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(routingPush(ownProps.to)),
})

const Link = connect(undefined, mapDispatchToProps)(LinkPresentation)

export default Link
