import { h } from 'hyperapp'
import html from 'hyperlit'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

export function TogglePage(s: State) {
  const page = () =>
    h('div', { class: 'toggle-sample' }, [
      Heading(
        'Toggle',
        'The toggles below have their state saved in local storage. Click in some of them and refresh the page to see their state being loaded from the local storage.'
      ),
      Container(s)
    ])

  return Layout(s, page)
}

function Container(s: State) {
  return html`<div>
    <ul class="tg-list">
      <li class="tg-list-item">
        <h4>Light</h4>
        <input
          class="tgl tgl-light ${(s.pageToggle.light && 'tgl-light-on') || ''}"
          id="cb1"
          type="checkbox"
          checked=${s.pageToggle.light}
        />
        <label class="tgl-btn" for="cb1" onclick=${Toggle('light')(s)}></label>
      </li>
      <li class="tg-list-item">
        <h4>iOS</h4>
        <input
          class="tgl tgl-ios ${(s.pageToggle.ios && 'tgl-ios-on') || ''}"
          id="cb2"
          type="checkbox"
          checked=${s.pageToggle.ios}
        />
        <label class="tgl-btn" for="cb2" onclick=${Toggle('ios')}></label>
      </li>
      <li class="tg-list-item">
        <h4>Skewed</h4>
        <input
          class="tgl tgl-skewed ${(s.pageToggle.skewed && 'tgl-skewed-on') ||
          ''}"
          id="cb3"
          type="checkbox"
          checked=${s.pageToggle.skewed}
        />
        <label
          class="tgl-btn"
          data-tg-off="OFF"
          data-tg-on="ON"
          for="cb3"
          onclick=${Toggle('skewed')}
        ></label>
      </li>
      <li class="tg-list-item">
        <h4>Flat</h4>
        <input
          class="tgl tgl-flat ${(s.pageToggle.flat && 'tgl-flat-on') || ''}"
          id="cb4"
          type="checkbox"
          checked=${s.pageToggle.flat}
        />
        <label class="tgl-btn" for="cb4" onclick=${Toggle('flat')}></label>
      </li>
      <li class="tg-list-item">
        <h4>Flip</h4>
        <input
          class="tgl tgl-flip ${(s.pageToggle.flip && 'tgl-flip-on') || ''}"
          id="cb5"
          type="checkbox"
          checked=${s.pageToggle.flip}
        />
        <label
          class="tgl-btn"
          data-tg-off="Nope"
          data-tg-on="Yeah!"
          for="cb5"
          onclick=${Toggle('flip')}
        ></label>
      </li>
    </ul>
    <br />
    <br />
    <p>State: ${JSON.stringify(s.pageToggle)}</p>
    <div></div>
  </div> `
}

function Toggle(id: string) {
  return (s: State) => ({
    ...s,
    pageToggle: {
      ...s.pageToggle,
      [id]: !s.pageToggle[id]
    }
  })
}
