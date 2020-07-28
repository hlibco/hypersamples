import { Router } from 'hyperway'

// This is how the global state of the application looks like.
export interface State {
  merge: (mergeFx?: (s: State) => void) => State

  router: Router
  lastUpdate: number

  displayMenu: boolean

  pageHome: {
    announcement: boolean
  }
  pageCounter: {
    counter: number
    clicks: number
  }
  pageTodo: {
    items: Array<{ title: string; done: boolean }>
  }
  pageAsync: {
    loadingSuccess: boolean
    loadingFailure: boolean
    response: any
    error: any
  }
  pageAccordion: { [idx: string]: boolean }
  pageToggle: {
    light: boolean
    ios: boolean
    skewed: boolean
    flat: boolean
    flip: boolean
  }
  pageModal: boolean
  pageConnection: {
    apiUrlSuccess: string
    apiUrlFailure: string
    error: Error | null
    status: string
  }
  pageLazy: {
    colorsLoading: boolean
    planetsLoading: boolean
    colors: string[]
    planets: string[]
  }
}
