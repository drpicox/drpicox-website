import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Readme from './components/Readme'
import createDucksStore from './createDucksStore'
import { Link, Route } from './routing'

const store = createDucksStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
              David Rodenas
            </a>
          </nav>
          <div>
            <Link to="/la">
              <button>La</button>
            </Link>
            <Link to="/lo">
              <button>Lo</button>
            </Link>
            <Route path="/:la" component={({ la }) => `${la} ${la}`} />
            <br />
            <Readme />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
