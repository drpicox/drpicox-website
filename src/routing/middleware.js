import { routingChanged, ROUTING_PUSH } from '.'

const middleware = ({ dispatch }) => {
  window.addEventListener('popstate', ev => {
    const url = document.location.pathname
    dispatch(routingChanged(url))
  })
  return next => action => {
    next(action)

    if (action.type === ROUTING_PUSH) {
      const { url } = action
      window.history.pushState({ page: 1 }, '@drpicox', url)
      dispatch(routingChanged(url))
    }
  }
}
export default middleware
