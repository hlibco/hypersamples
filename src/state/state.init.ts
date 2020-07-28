import { Hyperway, Router } from 'hyperway'
import clone from 'rfdc'
import { getStateFromLocalStorage } from '../utils/local-storage'
import { State } from './state.interface'

const LOCAL_STORAGE_STATE = getStateFromLocalStorage()

export const INITIAL_STATE: State = {
  merge(mergeFx): State {
    const s = clone()(this)
    return (mergeFx && mergeFx(s)) || s
  },
  router: Hyperway.init() as Router,

  // @deprecate
  lastUpdate: 0,

  displayMenu: false,

  pageHome: {
    announcement: true
  },

  pageCounter: {
    counter: 0,
    clicks: 0
  },

  pageTodo: {
    ...(LOCAL_STORAGE_STATE.pageTodo || {
      items: []
    })
  },

  pageAsync: {
    loadingSuccess: false,
    loadingFailure: false,
    response: null,
    error: null
  },

  pageAccordion: { ...(LOCAL_STORAGE_STATE.pageAccordion || {}) },

  pageToggle: {
    ...(LOCAL_STORAGE_STATE.pageToggle || {
      light: false,
      ios: false,
      skewed: false,
      flat: false,
      flip: false
    })
  },

  pageModal: false,

  pageConnection: {
    apiUrlSuccess: 'https://httpstat.us/200',
    apiUrlFailure: 'https://httpstat.us/400',
    error: null,
    status: 'idle'
  },

  pageLazy: {
    colorsLoading: false,
    planetsLoading: false,
    colors: [],
    planets: []
  }
}
