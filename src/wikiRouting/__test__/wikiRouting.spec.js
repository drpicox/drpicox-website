import makeSpyMiddleware from 'spy-middleware'
import createDucksStore from '../../createDucksStore'
import { FETCH_TOPIC } from '../../wiki'
import { getUrl, routingChanged } from '../../routing'

describe('wikiRouting', () => {
  function setupStore(initialState) {
    spyMiddleware = makeSpyMiddleware()
    store = createDucksStore(initialState, spyMiddleware)
  }

  let spyMiddleware
  let store
  beforeEach(() => {
    setupStore()
  })

  it('does requires the routing duck', () => {
    const state = store.getState()
    const url = getUrl(state)

    expect(url).toBeDefined()
  })

  it('should issue a fetchTopic for README when "/" url', async () => {
    store.dispatch(routingChanged('/'))

    const fetchTopicAction = await spyMiddleware.until(FETCH_TOPIC)

    expect(fetchTopicAction).toMatchObject({
      name: 'README',
    })
  })

  it('should issue a fetchTopic for a page when "/w/:page" url', async () => {
    store.dispatch(routingChanged('/w/WikiPage'))

    const fetchTopicAction = await spyMiddleware.until(FETCH_TOPIC)

    expect(fetchTopicAction).toMatchObject({
      name: 'WikiPage',
    })
  })
})
