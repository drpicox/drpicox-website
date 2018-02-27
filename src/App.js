import React, { Component } from 'react'

import MinidownComponent from './minidown-component'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            David Rodenas
          </a>
        </nav>
        <div>
          <MinidownComponent
            text={`
Heading
=======

Sub-heading
-----------
 
Paragraphs are separated
by a blank line.

Two spaces at the end of a line  
produces a line break.

Text attributes _emph_, 
**strong**, \`code\`.

Horizontal rule:

---

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. wash
  2. rinse
  3. repeat

Alternative headings:

# First
## Second
### Third
#### Fourth
##### Fifth
###### Sixth

Fenced code:

\`\`\`
$ npm install ducks-reducer
\`\`\`

Fenced code with language:

\`\`\`javascript
expect(minidown('hello')).toEqual([['p', null, 'hello']])
\`\`\`
    `}
          />
        </div>
      </div>
    )
  }
}

export default App
