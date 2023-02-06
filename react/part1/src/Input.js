import { useState } from 'react'
const Input = ({ children }) => {
  const [msg, setMsg] = useState('aaa')
  const handleChange = e => {
    setMsg(e.target.value)
    console.log(msg)
  }
  return (
    <>
      <input type='text' value={msg} onChange={handleChange} />
      <p>you msg is {msg}</p>
      {children}
    </>
  )
}
export default Input
