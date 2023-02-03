import { useState } from 'react'
function useWindowScroll() {
  const [y, setY] = useState(0)
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    setY(h)
  })
  return [y]
}

export default useWindowScroll
