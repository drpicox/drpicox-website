import { connect } from 'react-redux'
import MinidownComponent from '../minidown-component'
import { getTopic } from '../wiki'

const mapStateToProps = (state, { name = 'Home' }) => {
  return {
    text: getTopic(state, { name }),
  }
}

const WikiPage = connect(mapStateToProps)(MinidownComponent)
export default WikiPage
