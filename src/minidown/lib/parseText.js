import findNextRule from './findNextRule'

const parseText = (text, rules) => {
  const result = []

  let prevText
  while (text && text !== prevText) {
    prevText = text

    const {match, transform} = findNextRule(text, rules)
    if (match) {
      result.push(text.slice(0, match.index))
      result.push(transform(...match))
      text = text.slice(match.index + match[0].length)
    }
  }
  result.push(text)

  return result.filter(x => x)
}

export default parseText
