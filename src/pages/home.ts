import { h, text } from 'hyperapp'
import html from 'hyperlit'
import check from '../../public/images/icon-check.svg'
import { HomeLayout } from '../components/layout'
import { State } from '../state'

// The home screen
export function HomePage(s: State) {
  const itemView = (str) =>
    h('li', {}, [h('img', { src: check, alt: 'check' }), text(str)])
  const featureView = ([str1, str2]: string[]) =>
    h('li', {}, [
      h('p', {}, [h('span', { class: 'feature' }, text(str1)), text(str2)])
    ])

  const infoView = (_state: State) => html`<div class="info">
    This is an unofficial collection of components and recipes for
    <b> Hyperapp V2</b>.
  </div>`

  const bulma = () => html`<section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
    </div>
  </section>`

  const storyView = () =>
    h('div', { class: 'story' }, [
      h('p', {}, text(`Hi 👋,`)),
      h(
        'p',
        {},
        text(
          `Would you like to build powerful web applications with an unparallel development experience?`
        )
      ),
      h('p', {}, [text(`Meet `), h('b', {}, text('Hyperapp')), text('.')])
    ])

  const featuresView = () =>
    h('div', {}, [
      h('h2', {}, text('Hyperapp Key Features')),
      h(
        'ul',
        { class: 'features' },
        [
          ['Minuscule size', `Less than 2Kb. It's impressive!`],
          [
            'Built-in state management',
            `No more 3rd party tools to manage state.`
          ],
          [
            'Immutable state',
            `Fewer bugs to keep you entertained. The new state is derived from the current state, but the current state does not mutate.`
          ],
          [
            'Minimal API',
            `Hyperapp has a very small API with only 5 concepts you need to know: State, View, Actions, Subscriptions and Effects.`
          ],
          [
            'JSX/TSX',
            'Hyperapp supports JSX/TSX and other template options for you to explore.'
          ],
          [
            'Parcel Module Bundler (zero configuration)',
            'Setting up and maintaining a module bundler (like Webpack, Rollup, Fuse-box) while your project evolves can be intimidating. Hyperapp plays well with Parcel to support Live Reload, Typescript support, SCSS, SASS, Stylus, CSS-in-JS support and more.'
          ]
        ].map(featureView)
      )
    ])

  const page = () =>
    h('div', { class: 'home-page' }, [
      infoView(s),
      false && bulma(),
      h(
        'h2',
        {},
        text(
          'Hyperapp Helps Productive Front-end Javascript Developers to Excel'
        )
      ),
      storyView(),
      featuresView(),
      h('hr', {}),
      h('h2', {}, text(`What's the purpose of this website?`)),
      h(
        'p',
        {},
        text(
          `When front-end developers evaluate a new framework or view library, it's common to have questions like "Does it support SCSS?", "How do I manage state?", "Can I use Typescript?" and more. The source-code of this website answers the following questions:`
        )
      ),
      h(
        'ul',
        {},
        [
          'Routes',
          'Templates',
          'Links & Active Routes',
          'Interactivity (UI reacts to state change)',
          'State Management',
          'API Request/Response',
          'Forms',
          'Styles (SCSS)',
          'SVG & Image formats',
          'Announcement banner',
          'Loading state (Async Functions / Effect)',
          'TypeScript'
        ].map(itemView)
      ),
      h('br', {}),
      h(
        'p',
        { style: { color: '#888' } },
        text(`Subscription example: Last update at ${s.lastUpdate}`)
      )
    ])
  return HomeLayout(s, page)
}
