export const ROUTING_BACK = 'ROUTING_BACK'
export const routingBack = () => ({ type: ROUTING_BACK })

export const ROUTING_PUSH = 'ROUTING_PUSH'
export const routingPush = url => ({ type: ROUTING_PUSH, url })

export const ROUTING_CHANGED = 'ROUTING_CHANGED'
export const routingChanged = url => ({ type: ROUTING_CHANGED, url })
