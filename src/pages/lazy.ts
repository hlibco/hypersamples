import { h, text } from 'hyperapp'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

// The lazy page screen
export function LazyPage(s: State) {
  const view = () =>
    h('div', {}, [
      Heading(
        'Lazy',
        'Load a list of colors and planets before the page loads. Each list loads at a different speed to illustrate the option of using multiple loading states and multiple effects.'
      ),
      LazyComponent({
        loading: s.pageLazy.colorsLoading,
        items: s.pageLazy.colors,
        label: 'Colors'
      }),
      LazyComponent({
        loading: s.pageLazy.planetsLoading,
        items: s.pageLazy.planets,
        label: 'Planets'
      })
    ])
  return Layout(s, view)
}

const LazyComponent = ({ loading, items, label }) => {
  return h('p', {}, [
    h('b', {}, text(`${label}: (${items.length}) `)),
    text(`${(loading && 'Loading...') || JSON.stringify(items)}`)
  ])
}
