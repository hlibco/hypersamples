import { State } from '../../state'
import { mockHttpEffect } from '../../utils/mockHttpEffect'

export function onEnter(state: State) {
  const newState = state.merge((s) => {
    s.pageLazy.colorsLoading = true
    s.pageLazy.planetsLoading = true
    s.pageLazy.colors = []
    s.pageLazy.planets = []
  })

  const propsColors = {
    successHandler: ColorsSuccessResponse,
    errorHandler: ColorsErrorResponse,
    delay: 1500,
    mockResponse: {
      ok: true,
      colors: ['yellow', 'green', 'blue', 'pink']
    }
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

function ColorsSuccessResponse(state: State, response) {
  return state.merge((s) => {
    s.pageLazy.colors = response.colors
    s.pageLazy.colorsLoading = false
  })
}

function ColorsErrorResponse(state: State, error) {
  return state.merge((s) => {
    s.pageLazy.colors = []
    s.pageLazy.colorsLoading = false
  })
}

function PlanetsSuccessResponse(state: State, response) {
  return state.merge((s) => {
    s.pageLazy.planets = response.planets
    s.pageLazy.planetsLoading = false
  })
}

function PlanetsErrorResponse(state: State, error) {
  return state.merge((s) => {
    s.pageLazy.planets = []
    s.pageLazy.planetsLoading = false
  })
}
