import { h, text } from 'hyperapp'
import hero from '../../public/images/hero-mac.jpg'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

// The modal screen
export function ModalPage(s: State) {
  const OpenModal = (state) => {
    // When the modal is shown, we want a fixed body
    document.body.style.position = 'fixed'
    document.body.style.top = `-${window.scrollY}px`
    return { ...state, pageModal: true }
  }
  const CloseModal = (state) => {
    // When the modal is hidden...
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
    return { ...state, pageModal: false }
  }

  const modal = () =>
    h('div', { class: 'modal' }, [
      h('div', { class: 'overlay', onclick: CloseModal }, []),
      h('div', { class: 'content' }, [
        h('h3', {}, text('Title goes here')),
        text('This is a modal box. Click on the button below to close it.'),
        h('br', {}),
        h('img', { src: hero, alt: 'Macbook HyperSamples' }),
        h('br', {}),
        h('br', {}),
        h('button', { onclick: CloseModal }, text('Close'))
      ])
    ])

  const page = () =>
    h('div', { class: 'modal-page' }, [
      Heading('Modal', 'Trigger an action to open/close a modal box.'),
      h('button', { onclick: OpenModal }, text('Open Modal')),
      s.pageModal && modal(),
      true
    ])
  return Layout(s, page)
}
