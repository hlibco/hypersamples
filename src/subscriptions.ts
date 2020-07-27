import { every } from '@hyperapp/time'
import { Hyperway } from 'hyperway'
import { routes } from './router/routes'
import { State } from './state'
import { setStateIntoLocalStorage } from './utils/local-storage'

// subscriptions
const subRoutes = Hyperway.subscribe(
  (router) => (state: State): State => ({ ...state, router }),
  routes
)

const subUpdate = (s: State, d: number) => ({ ...s, lastUpdate: d })

const subLoading = (dispatch, props) => {
  const action = (state) => {
    console.log('Loading subscription...')
    return { ...state, loading: false }
  }
  setTimeout(() => dispatch(action), props.delay)
}
const loading = (delay) => [subLoading, { delay }]

export const subscriptions = (s: State) => [
  subRoutes,
  every(1000, subUpdate),
  loading(1500),
  setStateIntoLocalStorage(s as any)
]
