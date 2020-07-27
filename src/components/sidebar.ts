import { h, text } from 'hyperapp'
import { routeTo } from 'hyperway'
import logo from '../../public/images/hyper-samples.png'
import { State } from '../state'
import { Github } from './icons'

export const sidebar = (s: State): any => {
  const activate = (state, path) => state.router.path === path && 'active'

  const links = [
    ['/counter', 'Counter'],
    ['/todo', 'To-do List'],
    ['/modal', 'Modal'],
    ['/toggle', 'Toggle'],
    ['/accordeon', 'Accordeon'],
    ['/async', 'Async'],
    ['/connection', 'Connection'],
    ['/lazy', 'Lazy']
  ]

  const menuItem = (tuple) =>
    h(
      'li',
      { class: activate(s, tuple[0]) },
      h('a', { onclick: routeTo(tuple[0]), href: tuple[0] }, text(tuple[1]))
    )

  const ToggleMenu = (state) => ({ ...state, displayMenu: !state.displayMenu })

  const component = h('div', { class: 'sidebar' }, [
    h('img', { src: logo, alt: 'HyperSamples' }),
    h(
      'div',
      { class: 'mobile-menu-toggle', onclick: ToggleMenu },
      text('MENU')
    ),
    // h('div', { class: ['menu', s.displayMenu && 'show'] }, [
    h('div', { class: ['menu'] }, [
      h('ul', {}, [
        h(
          'li',
          { class: activate(s, '/') },
          h('a', { onclick: routeTo('/'), href: '/' }, text('Home'))
        ),
        h('li', { class: 'subheader' }, text('Samples')),
        ...links.map(menuItem)
      ]),

      h('ul', {}, [
        h('li', { class: 'subheader' }, text('Resources')),
        h(
          'li',
          {},
          h(
            'a',
            {
              href: 'https://hyperapp.rocks/',
              rel: 'noreferrer',
              target: '_blank'
            },
            text('Hyperapp Projects')
          )
        )
      ]),

      h(
        'a',
        {
          href: 'https://github.com/hlibco/hypersamples',
          rel: 'noopener',
          class: 'github'
        },
        [Github(), text('Github')]
      ),
      h(
        'a',
        {
          href: 'https://www.hlibco.com',
          rel: 'noopener',
          class: 'author'
        },
        [h('span', {}, text('Created by')), h('em', {}, text('Felipe Hlibco'))]
      )
    ])
  ])

  return component
}
