import parseText from './parseText'

const parseTree = ([e, p, ...lines], rules) => {
  if (p && p.minidown === 'false') return [e, p, ...lines]

  const result = [e, p]

  const trees = []
  lines.forEach(line => {
    if (typeof line === 'string') {
      trees.push(...parseText(line, rules))
    } else {
      trees.push(line)
    }
  })

  trees.forEach(tree => {
    if (Array.isArray(tree)) {
      result.push(parseTree(tree, rules))
    } else {
      result.push(tree)
    }
  })

  return result
}

export default parseTree
