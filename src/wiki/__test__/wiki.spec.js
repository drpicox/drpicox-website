import makeSpyMiddleware from 'spy-middleware'
import createDucksStore from '../../createDucksStore'
import { getTopic, fetchTopic, PUT_TOPIC } from '../'

describe('wiki', () => {
  let spyMiddleware
  let store
  beforeEach(() => {
    spyMiddleware = makeSpyMiddleware()
    store = createDucksStore(undefined, spyMiddleware)
  })

  it('should add a reducer for wiki topics', () => {
    const state = store.getState()

    expect(state).toMatchObject({ wiki: {} })
  })

  it('should load a topic into the wiki object', async () => {
    fetch.mockResponse('This is the readme')
    store.dispatch(fetchTopic('README'))

    await spyMiddleware.untilNext(PUT_TOPIC)

    const topic = getTopic(store.getState(), { name: 'README' })
    expect(topic).toEqual('This is the readme')
  })
})
