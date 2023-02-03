import { useEffect, useState } from 'react'

const useLocalStorage = (key, defaultMsg) => {
  const [msg, setMsg] = useState(defaultMsg)
  useEffect(() => {
    window.localStorage.setItem(key, msg)
  }, [key, msg])
  return [msg, setMsg]
}
export default useLocalStorage
