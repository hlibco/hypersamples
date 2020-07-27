export async function mockHttpEffect(dispatch, props) {
  try {
    console.log({ props })
    const response = await mockHttp(props, props.options)
    if (!response.ok) {
      throw response
    }
    if (props.shouldFail) {
      throw new Error('This was supposed to fail')
    }
    console.log({ response })
    dispatch(props.successHandler, response)
  } catch (error) {
    console.log({ error })
    dispatch(props.errorHandler, error)
  }

  async function mockHttp({ mockResponse }, options): Promise<any> {
    console.warn({ mockResponse, options })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse)
      }, props.delay)
    })
  }
}
