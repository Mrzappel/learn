import { useState, useEffect } from 'react'

const Hello = () => {
  const [name, setName] = useState('zcc')

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(name)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [name])
  return (
    <div>
      <p>i am a hello components</p>
      <p onClick={() => setName('sss')}>{name}</p>
    </div>
  )
}
const Button = ({ passData }) => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(true)
  const handleClick = () => setCount(count + 1)

  const handleC = (e, msg) => {
    console.log(e, msg)
  }
  return (
    <>
      <button style={{ color: 'red' }} onClick={() => setFlag(!flag)}>
        {flag ? 'yes' : 'no'}点我销毁
      </button>
      {flag && <Hello />}
      <button onClick={e => handleC(e, 'xxxxxxx')}>aaaa</button>
      <button onClick={handleClick}>Clicked {count} times</button>
      <hr />
      <span>react组件通信：子传父</span>
      <button onClick={() => passData('hh')}>cccc</button>
    </>
  )
}

export default Button
