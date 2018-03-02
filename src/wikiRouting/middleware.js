import { ROUTING_CHANGED } from '../routing'
import { fetchTopic } from '../wiki'

const wikiRoutingMiddleware = ({ dispatch, getState }) => {
  const fetchTopicForUrl = url => {
    if (url === '/') {
      dispatch(fetchTopic('README'))
    }
    const matchPage = url.match(/^\/w\/(\w+)$/)
    if (matchPage) {
      const page = matchPage[1]
      dispatch(fetchTopic(page))
    }
  }

  return next => action => {
    next(action)

    if (action.type === ROUTING_CHANGED) {
      fetchTopicForUrl(action.url)
    }
  }
}

export default wikiRoutingMiddleware
