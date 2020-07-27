import { h, text } from 'hyperapp'
import { State } from '../state'

// The page not found screen
export function PageNotFound(s: State) {
  return h('div', { id: 'app' }, [h('h1', {}, text('PAGE NOT FOUND!'))])
}
