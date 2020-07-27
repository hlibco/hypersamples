import html from 'hyperlit'
import { Close as CloseIcon } from '../components/icons'
import { sidebar } from '../components/sidebar'
import { State } from '../state'

export function Layout(s: State, child) {
  return html`<div>
    ${sidebar(s)}
    <div class="main">
      ${child()}
    </div>
  </div>`
}

export function HomeLayout(s: State, child) {
  const Close = (state) => ({
    ...state,
    pageHome: {
      ...state.pageHome,
      announcement: false
    }
  })

  const announcement =
    s.pageHome.announcement &&
    html`<div class="announcement">
      <b>Update:${' '}</b><span>This website uses${' '}</span
      ><a href="https://hyperapp.dev/" class="highlight">Hyperapp v2.0.8</a>
      <div class="close" onclick=${Close}>
        ${CloseIcon()}
      </div>
    </div>`

  return html`<div>${announcement}${Layout(s, child)}</div>`
}
