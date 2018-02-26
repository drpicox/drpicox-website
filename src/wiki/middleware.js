import { FETCH_TOPIC, putTopic } from '.'

const wikiMiddleware = ({ dispatch }) => next => async action => {
  next(action)
  if (action.type === FETCH_TOPIC) {
    const response = await fetch(`/wiki/${action.name}.md`)
    const content = await response.text()
    dispatch(putTopic(action.name, content))
  }
}

export default wikiMiddleware
