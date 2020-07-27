import {
  AccordionPage,
  AsyncPage,
  ConnectionPage,
  CounterPage,
  HomePage,
  LazyPage,
  ModalPage,
  PageNotFound,
  ToDoPage,
  TogglePage
} from '../pages'
import { LazyHooks } from './hooks'

export const routes = {
  routes: {
    '/': HomePage,
    '/counter': CounterPage,
    '/todo': ToDoPage,
    '/modal': ModalPage,
    '/toggle': TogglePage,
    '/accordion': AccordionPage,
    '/async': AsyncPage,
    '/connection': ConnectionPage,
    '/lazy': {
      name: 'lazy',
      component: LazyPage,
      onEnter: LazyHooks.onEnter,
      onLeave: LazyHooks.onLeave
    },
    '*': PageNotFound
  },
  onEnter: (state, props) => {
    return state
  },
  onLeave: (state, props) => {
    return { ...state, displayMenu: false }
  }
}
