import mergeTrees from './lib/mergeTrees'
import parseText from './lib/parseText'
import parseTree from './lib/parseTree'

const rules = [
  [
    /```(.*?)\n((.|\n)+?)\n```/,
    ($0, $1, $2) => ['pre', $1 ? {lang: $1} : null, $2],
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
  [/`(.+?)`/, ($0, $1) => ['code', null, $1]],
  [/ {2}(\n|$)/, () => ['br', null]],
]

const excludedEntities = ['code', 'pre']

const minidown = text =>
  mergeTrees(parseText(text, rules), mergers)
    .filter(([e]) => e !== 'br')
    .map(tree => parseTree(tree, decorators, excludedEntities))

export default minidown
