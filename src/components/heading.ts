import { h, text } from 'hyperapp'

export function Heading(primary, secondary) {
  return h('header', {}, [
    h('h1', {}, text(primary)),
    h('p', {}, text(secondary))
  ])
}
