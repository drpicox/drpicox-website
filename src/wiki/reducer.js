import { PUT_TOPIC } from '.'

const wikiReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_TOPIC:
      return {
        ...state,
        [action.name]: action.content,
      }

    default:
      return state
  }
}
export default wikiReducer
