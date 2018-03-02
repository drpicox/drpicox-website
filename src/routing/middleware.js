import { routingChanged, ROUTING_PUSH } from '.'

const middleware = ({ dispatch }) => {
  const dispatchRoutingChanged = () => {
    const url = document.location.pathname
    dispatch(routingChanged(url))
  }

  window.addEventListener('popstate', dispatchRoutingChanged)
  setTimeout(dispatchRoutingChanged, 0)

  return next => action => {
    next(action)

    if (action.type === ROUTING_PUSH) {
      const { url } = action
      window.history.pushState({ page: 1 }, '@drpicox', url)
      dispatchRoutingChanged()
    }
  }
}
export default middleware
