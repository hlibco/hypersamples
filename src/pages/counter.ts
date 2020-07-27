import { h, text } from 'hyperapp'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

// The counter screen
export function CounterPage(s: State) {
  const page = () =>
    h('div', { class: 'counter-page' }, [
      Heading(
        'Counter',
        'Event listeners are applied to both buttons to update the state. The view will automatically re-render when the state changes.'
      ),

      h('div', { class: 'counter' }, [
        h('div', { class: 'display' }, text(s.pageCounter.counter)),
        h(
          'button',
          {
            onclick: (state) => ({
              ...state,
              pageCounter: {
                ...state.pageCounter,
                counter: state.pageCounter.counter - 1,
                clicks: state.pageCounter.clicks + 1
              }
            })
          },
          text('-')
        ),
        h(
          'button',
          {
            onclick: (state) => ({
              ...state,
              pageCounter: {
                ...state.pageCounter,
                counter: state.pageCounter.counter + 1,
                clicks: state.pageCounter.clicks + 1
              }
            })
          },
          text('+')
        ),
        h('br', {}),
        h('br', {}),
        h('p', {}, text(`Total clicks: ${s.pageCounter.clicks}`))
      ])
    ])
  return Layout(s, page)
}
