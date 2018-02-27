import { ROUTING_CHANGED } from '.'

const reducer = (state = document.location.pathname, action) => {
  switch (action.type) {
    case ROUTING_CHANGED:
      return action.url
    default:
      return state
  }
}
export default reducer
