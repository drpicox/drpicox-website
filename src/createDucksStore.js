import { applyMiddleware, compose, createStore } from 'redux'
import ducksReducer from 'ducks-reducer'
import ducksMiddleware from 'ducks-middleware'

import * as wiki from './wiki'

const ducks = { wiki }
const reducer = ducksReducer(ducks)
const middleware = ducksMiddleware(ducks)

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
/* eslint-enable */

const createDucksStore = (preloadState, ...extraMiddleware) =>
  createStore(
    reducer,
    composeEnhancers(applyMiddleware(middleware, ...extraMiddleware)),
  )

export default createDucksStore
