import { app, h } from 'hyperapp'
import { INITIAL_STATE, State } from './state'
import { subscriptions } from './subscriptions'

app({
  init: INITIAL_STATE,
  view: (s: State) => s.router.view(s) || h('div', {}),
  node: document.getElementById('app'),
  subscriptions
})
