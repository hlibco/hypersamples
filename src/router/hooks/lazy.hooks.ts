import { State } from '../../state'
import { mockHttpEffect } from '../../utils/mockHttpEffect'

export function onEnter(state: State) {
  const newState = state.clone()
  newState.pageLazy.colorsLoading = true
  newState.pageLazy.planetsLoading = true
  newState.pageLazy.colors = []
  newState.pageLazy.planets = []

  const propsColors = {
    successHandler: ColorsSuccessResponse,
    errorHandler: ColorsErrorResponse,
    delay: 1500,
    mockResponse: {
      ok: true,
      colors: ['yellow', 'green', 'blue', 'pink']
    }
  }

  function ColorsSuccessResponse(s: State, response) {
    const nS = s.clone()
    nS.pageLazy.colors = response.colors
    nS.pageLazy.colorsLoading = false
    return nS
  }

  function ColorsErrorResponse(s: State, error) {
    const nS = s.clone()
    nS.pageLazy.colors = []
    nS.pageLazy.colorsLoading = false
    return nS
  }

  const propsPlanets = {
    successHandler: PlanetsSuccessResponse,
    errorHandler: PlanetsErrorResponse,
    delay: 3000,
    mockResponse: {
      ok: true,
      planets: ['Earth', 'Mars', 'Pluto']
    }
  }

  function PlanetsSuccessResponse(s: State, response) {
    const nS = s.clone()
    nS.pageLazy.planets = response.planets
    nS.pageLazy.planetsLoading = false
    console.log({ nS })
    return nS
  }

  function PlanetsErrorResponse(s: State, error) {
    const nS = s.clone()
    nS.pageLazy.planets = []
    nS.pageLazy.planetsLoading = false
    console.log({ nS })
    return nS
  }

  return [
    newState,
    [mockHttpEffect, propsColors],
    [mockHttpEffect, propsPlanets]
  ]
}

export function onLeave(state, props) {
  console.log('leave /lazy', props)
  return state
}
