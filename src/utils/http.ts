import { request } from '@hyperapp/http'
import { State } from '../state'

// Main interface to send an HTTP POST request to a backend API
// This is arbitrary, but the sample protocol is a 'cmd' string and
// an 'args' object
export function sendRequest(
  cmd: string,
  args: any,
  action: (s: State, d: object) => any
) {
  const body = JSON.stringify({ ...args, cmd })
  return request({
    url: args.url,
    options: {
      method: 'POST',
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
      body
    },
    expect: 'text',
    // provide our handler() filter to post-process the response before
    // passing it on to the action
    action: handler(action)
  })
}

// Wraps an action to process a response from server
function handler(action: (s: State, data: object) => any) {
  return (state: State, response: any) => {
    // for error handling, capture the error
    const err = (s: State, e: Error): State => ({
      ...s,
      pageConnection: {
        ...s.pageConnection,
        status: 'Unexpected error',
        error: e
      }
    })

    try {
      // check for error
      if (response instanceof Error) return err(state, response)

      // For example, parse the JSON response here
      // const res = JSON.parse(response);
      const res = response

      // update connection status to remove any prior error object
      // heartbeat() depends on connection_error being set or unset
      // to determine if an error occurred
      const successState = {
        ...state,
        pageConnection: {
          ...state.pageConnection,
          status: res,
          error: null
        }
      }
      return action(successState, res)
    } catch (e) {
      return action(err(state, e), {})
    }
  }
}
