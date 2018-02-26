import findNextMerge from './findNextMerge'

const mergeTrees = (trees, mergers) => {
  const result = []

  let currentIndex = 1
  let currentTree = trees[0]
  while (currentIndex < trees.length) {
    const nextTree = trees[currentIndex]

    const merge = findNextMerge(currentTree, nextTree, mergers)
    if (merge) {
      currentTree = merge(currentTree, nextTree)
    } else {
      result.push(currentTree)
      currentTree = nextTree
    }
    currentIndex += 1
  }
  result.push(currentTree)

  if (currentIndex < trees.length) {
    result.push(trees[currentIndex])
  }

  return result
}

export default mergeTrees
