import { createSelector } from 'reselect'

const getPath = (state, { path }) => path

export const getUrl = state => state.routing

export const makeMatchUrl = () => {
  var lastPath
  let keys
  let strExp
  let regExp

  return createSelector([getUrl, getPath], (url, path) => {
    // inspired in https://github.com/angular/angular.js/blob/8b399545a5098cb2576594a26a03cd7268c55fb6/src/ngRoute/route.js#L251
    if (path !== lastPath) {
      keys = [{ name: 'url' }]

      strExp = path
        .replace(/([().])/g, '\\$1')
        .replace(/(\/)?:(\w+)(\*\?|[?*])?/g, function(_, slash, key, option) {
          var optional = option === '?' || option === '*?' ? '?' : null
          var star = option === '*' || option === '*?' ? '*' : null
          keys.push({ name: key, optional: !!optional })
          slash = slash || ''
          return (
            '' +
            (optional ? '' : slash) +
            '(?:' +
            (optional ? slash : '') +
            ((star && '(.+?)') || '([^/]+)') +
            (optional || '') +
            ')' +
            (optional || '')
          )
        })
        .replace(/([/$*])/g, '\\$1')

      regExp = new RegExp(`^${strExp}$`, 'i')
    }

    const match = url.match(regExp)
    if (match) {
      const result = {}
      keys.forEach(({ name }, index) => (result[name] = match[index]))
      return result
    }

    return undefined
  })
}
