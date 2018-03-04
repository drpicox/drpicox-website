import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Header from './components/Header'
import WikiPage from './components/WikiPage'
import createDucksStore from './createDucksStore'
import { Link, Route } from './routing'

const store = createDucksStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <div>
            <Link to="/la">
              <button>La</button>
            </Link>
            <Link to="/lo">
              <button>Lo</button>
            </Link>
            <Link to="/w/SomePage">
              <button>SomePage</button>
            </Link>
            <Route path="/" component={WikiPage} />
            <Route path="/w/:name" component={WikiPage} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
