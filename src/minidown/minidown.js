import mergeTrees from './lib/mergeTrees'
import parseText from './lib/parseText'
import parseTree from './lib/parseTree'

const rules = [
  [
    /```(.*?)\n((.|\n)+?)\n```/,
    ($0, $1, $2) => ['pre', { minidown: 'false', lang: $1 }, $2],
  ],
  [/\s*---+\s*/, () => ['hr', null]],
  [/\s*(\n|$)/, () => ['br', null]],
  [/(.*)\n===+\s*(\n|$)/, ($0, $1) => ['h1', null, $1]],
  [/(.*)\n---+\s*(\n|$)/, ($0, $1) => ['h2', null, $1]],
  [/\s*(#+)\s+(.*)\n?/, ($0, $1, $2) => ['h' + $1.length, null, $2]],
  [/\s*[-*+]\s+(.*)\n?/, ($0, $1) => ['ul', null, ['li', null, $1]]],
  [/\s*\d+\.\s+(.*)\n?/, ($0, $1) => ['ol', null, ['li', null, $1]]],
  [/(.*)(\n)?/, ($0, $1) => ['p', null, $1]],
]

const mergers = [
  ['p', 'p', ([e, p, l1], [, , l2]) => [e, p, l1 + '\n' + l2]],
  ['ul', 'ul', ([e, p, ...lis], [, , li]) => [e, p, ...lis, li]],
  ['ol', 'ol', ([e, p, ...lis], [, , li]) => [e, p, ...lis, li]],
]

const decorators = [
  [/_(.+?)_/, ($0, $1) => ['em', null, $1]],
  [/(\*\*)(.+?)\1/, ($0, $1, $2) => ['strong', null, $2]],
  [
    /Home|([A-Z][a-z]+){2,}/,
    $0 => ['a', { href: `/w/${$0}`, minidown: 'false' }, $0],
  ],
  [/`(.+?)`/, ($0, $1) => ['code', { minidown: 'false' }, $1]],
  [/ {2}(\n|$)/, () => ['br', null]],
]

const minidown = text =>
  mergeTrees(parseText(text, rules), mergers)
    .filter(([e]) => e !== 'br')
    .map(tree => parseTree(tree, decorators))

export default minidown
