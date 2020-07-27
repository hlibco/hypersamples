import { h, text } from 'hyperapp'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'
import { sendRequest } from '../utils/http'

// The connection screen
export function ConnectionPage(s: State) {
  const page = () =>
    h('div', {}, [
      Heading(
        'Connection',
        `Make a call to an API via HTTP. If you're using Google Chrome, inspect the Network tab in the Chrome DevTools.`
      ),
      h('button', { onclick: GetSuccessStatus }, text('Test Success')),
      h('button', { onclick: GetFailureStatus }, text('Test Failure')),
      h('button', { onclick: Reset, class: 'secondary' }, text('Reset')),
      h('br', {}),
      h('br', {}),
      h('p', {}, text(`Status: ${s.pageConnection.status}`)),
      h('div', { id: 'info' }, [
        h('p', {}, [
          text('Success URL: '),
          h('code', {}, text(s.pageConnection.apiUrlSuccess))
        ]),
        h('p', {}, [
          text('Failure URL: '),
          h('code', {}, text(s.pageConnection.apiUrlFailure))
        ]),
        h('p', {}, text('State:')),
        h('p', {}, text(JSON.stringify(s.pageConnection)))
      ])
    ])

  return Layout(s, page)
}

// An action for user-triggered backend api request
function GetSuccessStatus(s: State) {
  return [
    s,
    sendRequest('status', { url: s.pageConnection.apiUrlSuccess }, GotStatus)
  ]
}

function GetFailureStatus(s: State) {
  return [
    s,
    sendRequest('status', { url: s.pageConnection.apiUrlFailure }, GotStatus)
  ]
}

function Reset(s: State) {
  return {
    ...s,
    pageConnection: {
      ...s.pageConnection,
      status: 'idle',
      error: null
    }
  }
}

// An action to handle a response from backend api
function GotStatus(s: State, res: object) {
  console.log('Got status: ' + JSON.stringify(res))
  return s
}
