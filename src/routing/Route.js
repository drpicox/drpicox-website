import React from 'react'
import { connect } from 'react-redux'
import { makeMatchUrl } from '.'

const RoutePresentation = props => {
  const { component: Component } = props

  if (Component) {
    return <Component {...props} />
  }
  return null
}

const makeMapStateToProps = () => {
  const matchUrl = makeMatchUrl()
  const mapStateToProps = (state, ownProps) => {
    const match = matchUrl(state, { path: ownProps.path })
    if (match) {
      return match
    }
    return {
      component: null,
    }
  }
  return mapStateToProps
}

const Route = connect(makeMapStateToProps)(RoutePresentation)

export default Route
