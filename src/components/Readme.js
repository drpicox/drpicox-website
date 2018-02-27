import React from 'react'
import MinidownComponent from '../minidown-component'

const Readme = () => {
  return (
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
  )
}

export default Readme
