export const click = (e) =>
  e.dispatchEvent(new MouseEvent('click', { button: 0 }))
