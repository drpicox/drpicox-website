const findNextRule = (text, rules) => {
  let firstMatch
  let firstTransform
  let firstTextIndex = text.length
  rules.forEach(([regExp, transform]) => {
    const match = text.match(regExp)
    if (match && match.index < firstTextIndex) {
      firstMatch = match
      firstTransform = transform
      firstTextIndex = match.index
    }
  })

  return {match: firstMatch, transform: firstTransform}
}
export default findNextRule
