import { h } from 'hyperapp'
import html from 'hyperlit'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

export function AccordionPage(s: State) {
  const page = () =>
    h('div', { class: 'accordion-sample' }, [
      Heading(
        'Accordion',
        'This is a basic accordion that allows multiple cards open simultaneously.'
      ),
      Container(s)
    ])

  return Layout(s, page)
}

function Container(s: State) {
  const items = [
    {
      q: 'Does this product have what I need?',
      a: 'Totally. Totally does.'
    },
    {
      q: 'Can I use it all the time?',
      a: `Of course you can, we won't stop you.`
    },
    {
      q: 'Are there any restrictions?',
      a: 'Only your imagination my friend. Go forth!'
    }
  ]

  return html`<div class="accordion">
    ${items.map(
      (item, idx) =>
        html`
          <details ${{ ...{ open: s.pageAccordion[idx] } }}>
            <summary onclick=${Toggle(idx)}>
              ${item.q}
              <span
                class="control-icon control-icon-expand"
                width="24"
                height="24"
                role="presentation"
                >+
              </span>
              <span
                class="control-icon control-icon-close"
                width="24"
                height="24"
                role="presentation"
                >-
              </span>
            </summary>
            <p>${item.a}</p>
          </details>
        `
    )}
    <br />
    <br />
    <p>State: ${JSON.stringify(s.pageAccordion)}</p>
  </div>`
}

function Toggle(idx: number) {
  return (s: State) => {
    return {
      ...s,
      pageAccordion: {
        ...s.pageAccordion,
        [String(idx)]: !s.pageAccordion[String(idx)]
      }
    }
  }
}
