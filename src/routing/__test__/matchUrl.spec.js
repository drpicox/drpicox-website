import createDucksStore from '../../createDucksStore'
import { routingChanged, makeMatchUrl } from '../'

describe('matchUrl', () => {
  let store
  beforeEach(() => (store = createDucksStore()))

  const givenUrl = url => ({
    matchPath: path => {
      store.dispatch(routingChanged(url))
      const match = makeMatchUrl()(store.getState(), { path })
      return match
    },
  })

  it('should match /', () => {
    const match = givenUrl('/').matchPath('/')
    expect(match).toEqual({ url: '/' })
  })

  it('should match /foo', () => {
    const match = givenUrl('/foo').matchPath('/foo')
    expect(match).toEqual({ url: '/foo' })
  })

  it('should match /foo/:bar', () => {
    const match = givenUrl('/foo/baz').matchPath('/foo/:bar')
    expect(match).toEqual({ url: '/foo/baz', bar: 'baz' })
  })
})
