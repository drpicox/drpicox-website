export const FETCH_TOPIC = 'FETCH_TOPIC'
export const fetchTopic = name => ({
  type: FETCH_TOPIC,
  name,
})

export const PUT_TOPIC = 'PUT_TOPIC'
export const putTopic = (name, content) => ({
  type: PUT_TOPIC,
  name,
  content,
})
