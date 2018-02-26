import createDucksStore from '../../createDucksStore'
import { getTopic, fetchTopic, PUT_TOPIC } from '../'

const makeDeferred = () => {
  let resolve, reject
  let promise = new Promise((r, e) => {
    resolve = r
    reject = e
  })
  return { promise, resolve, reject }
}

const makeSpyMiddleware = () => {
  const spyMiddleware = () => {
    const actions = []
    const untils = {}

    spyMiddleware.actions = []
    spyMiddleware.until = type => {
      const action = actions.find(any => any.type === type)
      if (action) return action

      return this.untilNext(type)
    }
    spyMiddleware.untilNext = type => {
      untils[type] = untils[type] || makeDeferred()
      return untils[type].promise
    }

    return next => action => {
      next(action)
      actions.push(action)

      const until = untils[action.type]
      delete untils[action.type]
      if (until) until.resolve(action)
    }
  }
  return spyMiddleware
}

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
