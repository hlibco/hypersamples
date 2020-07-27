import { h, text } from 'hyperapp'
import { Heading } from '../components/heading'
import { Layout } from '../components/layout'
import { State } from '../state'

// The async page screen
export function AsyncPage(s: State) {
  function SendHttp(state: State, shouldFail) {
    if (state.pageAsync.loadingFailure || state.pageAsync.loadingSuccess) {
      return state
    }

    const newState = {
      ...state,
      pageAsync: {
        response: null,
        error: null,
        loadingFailure: shouldFail ? true : false,
        loadingSuccess: !shouldFail ? true : false,
        shouldFail
      }
    }

    const props = {
      // default
      options: {},
      response: 'json',
      // custom
      url: 'http://...',
      successHandler: SuccessResponse,
      errorHandler: ErrorResponse,
      // used in the mockHttp
      shouldFail
    }

    return [newState, [httpEffect, props]]
  }

  function SuccessResponse(state, response) {
    return {
      ...state,
      pageAsync: {
        response,
        error: null,
        loadingSuccess: false
      }
    }
  }

  function ErrorResponse(state, error) {
    return {
      ...state,
      pageAsync: {
        response: null,
        error,
        loadingFailure: false
      }
    }
  }

  async function httpEffect(dispatch, props) {
    const mockHttp = (url, options): Promise<any> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            message: 'Success!',
            request: { url, options }
          })
        }, 1000)
      })

    try {
      const response = await mockHttp(props.url, props.options)
      if (!response.ok) {
        throw response
      }
      if (props.shouldFail) {
        throw new Error('This was supposed to fail')
      }
      dispatch(props.successHandler, response)
    } catch (error) {
      dispatch(props.errorHandler, error)
    }
  }

  const Reset = (state) => ({
    ...state,
    pageAsync: {
      response: null,
      error: null,
      loading: false
    }
  })

  const Button = (label: string, loading: boolean, action) =>
    h(
      'button',
      {
        onclick: action,
        class: {
          active: loading
        }
      },
      [
        loading && h('span', { class: 'loader' }),
        h(
          'span',
          {
            class: loading && 'hide'
          },
          text(label)
        )
      ]
    )

  const view = () =>
    h('div', { class: 'async-page' }, [
      Heading(
        'Async',
        'See an Effect in action. In this sample, you will execute an asynchronous function and the view is re-rendered with the response.'
      ),
      Button('Click to Succeed', s.pageAsync.loadingSuccess, [SendHttp, false]),
      Button('Click to Fail', s.pageAsync.loadingFailure, [SendHttp, true]),
      h(
        'button',
        {
          onclick: Reset,
          class: 'secondary'
        },
        text('Reset')
      ),
      h('br', {}),
      h('br', {}),
      h('p', {}, [
        h('b', {}, text('Result: ')),
        text(
          `${
            ((s.pageAsync.loadingSuccess || s.pageAsync.loadingFailure) &&
              'Loading...') ||
            (s.pageAsync.response && s.pageAsync.response.message) ||
            s.pageAsync.error ||
            'Please, click on the button above.'
          }`
        )
      ])
    ])
  return Layout(s, view)
}
