import minidown from '../minidown'

describe('minidown', () => {
  it('fenced code is placed inside [pre]', () => {
    const tree = minidown('```\nlet i = 0;\n```')

    expect(tree).toEqual([['pre', null, 'let i = 0;']])
  })

  it('ordinary text is placed inside [p]', () => {
    const tree = minidown('hello')

    expect(tree).toEqual([['p', null, 'hello']])
  })

  it('text with dashes are converted into unordered lists [ul,[li]]', () => {
    const tree = minidown('- hello')

    expect(tree).toEqual([['ul', null, ['li', null, 'hello']]])
  })

  it('two ordinary lines are placed inside one [p]', () => {
    const tree = minidown('hello\nworld')

    expect(tree).toEqual([['p', null, 'hello\nworld']])
  })

  it('two ordinary lines separated by a blank line are placed inside two [p]', () => {
    const tree = minidown('hello\n\nworld')

    expect(tree).toEqual([['p', null, 'hello'], ['p', null, 'world']])
  })

  it('two item lists are merged into a single unordered list', () => {
    const tree = minidown('- hello\n- world')

    expect(tree).toEqual([
      ['ul', null, ['li', null, 'hello'], ['li', null, 'world']],
    ])
  })

  it('decorates _parts_ with [em]', () => {
    const tree = minidown('hi _bob_')

    expect(tree).toEqual([['p', null, 'hi ', ['em', null, 'bob']]])
  })

  it('decorates `code` with [code]', () => {
    const tree = minidown('increment `count`')

    expect(tree).toEqual([['p', null, 'increment ', ['code', null, 'count']]])
  })

  it('decorates nested', () => {
    const tree = minidown('- _increment `count`_')

    expect(tree).toEqual([
      [
        'ul',
        null,
        ['li', null, ['em', null, 'increment ', ['code', null, 'count']]],
      ],
    ])
  })

  it('do not decorates inside [code]', () => {
    const tree = minidown('`let i = _global_`')

    expect(tree).toEqual([['p', null, ['code', null, 'let i = _global_']]])
  })

  it('do not decorates inside [pre]', () => {
    const tree = minidown('```\nlet i = `awesome`\n```')

    expect(tree).toEqual([['pre', null, 'let i = `awesome`']])
  })

  it('should parse a reasonable markdown', () => {
    const tree = minidown(
      `
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
    `,
    )

    expect(tree).toEqual([
      ['h1', null, 'Heading'],
      ['h2', null, 'Sub-heading'],
      ['p', null, 'Paragraphs are separated\nby a blank line.'],
      [
        'p',
        null,
        'Two spaces at the end of a line',
        ['br', null],
        'produces a line break.',
      ],
      [
        'p',
        null,
        'Text attributes ',
        ['em', null, 'emph'],
        ', \n',
        ['strong', null, 'strong'],
        ', ',
        ['code', null, 'code'],
        '.',
      ],
      ['p', null, 'Horizontal rule:'],
      ['hr', null],
      ['p', null, 'Bullet list:'],
      [
        'ul',
        null,
        ['li', null, 'apples'],
        ['li', null, 'oranges'],
        ['li', null, 'pears'],
      ],
      ['p', null, 'Numbered list:'],
      [
        'ol',
        null,
        ['li', null, 'wash'],
        ['li', null, 'rinse'],
        ['li', null, 'repeat'],
      ],
      ['p', null, 'Alternative headings:'],
      ['h1', null, 'First'],
      ['h2', null, 'Second'],
      ['h3', null, 'Third'],
      ['h4', null, 'Fourth'],
      ['h5', null, 'Fifth'],
      ['h6', null, 'Sixth'],
      ['p', null, 'Fenced code:'],
      ['pre', null, '$ npm install ducks-reducer'],
      ['p', null, 'Fenced code with language:'],
      [
        'pre',
        {lang: 'javascript'},
        "expect(minidown('hello')).toEqual([['p', null, 'hello']])",
      ],
    ])
  })
})
