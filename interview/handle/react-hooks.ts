function render() { }
function useState<T>(initialState: T): [T, (newState: T) => void] {
  let state
  state = state || initialState
  function setState(newState: T) {
    state = newState
    render()
  }
  return [state, setState]
}
function debounce<T>(fn: T, delay: number): T {

}