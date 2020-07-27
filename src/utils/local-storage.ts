const LOCAL_STORAGE_KEY = 'hypersamples_state'

export function getStateFromLocalStorage() {
  const state = JSON.parse(
    window?.localStorage?.getItem(LOCAL_STORAGE_KEY) || '{}'
  )
  return state
}

export function setStateIntoLocalStorage(state: {
  [key: string]: string | number | boolean | null
}) {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...state, router: undefined })
  )
}

export function clearStateFromLocalStorage() {
  setStateIntoLocalStorage({})
}
