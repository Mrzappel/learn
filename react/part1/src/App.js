// import logo from './logo.svg';
// import './App.css';

import Button from './Button'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import useLocalStorage from './hooks/useLocalStorage'
import useWindowScroll from './hooks/useWindowScroll'
import Input from './Input'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// const App = () => (
//   <div>
//     <p>hello world, it's my react app</p>
//   </div>
// )

// const Hello = (props) => {
//   return (
//     <div> hello {props.name}, you are {props.age} years old</div>
//   )
// }
// const App = () => {
//   const time = new Date()
//   const x = 100
//   const y = 200
//   const name = 'Charels'
//   const age = 18
//   return (
//     <>
//       <Hello name="Lishishi" />
//       <Hello name="Liuyifei" />
//       <Hello name={name} age={age} />
//       <p>now is {time.toString()}</p>
//       <p>{x} + {y} = {x + y}</p>
//     </>
//   )
// }

const App = () => {
  const [y] = useWindowScroll()
  const info = [
    {
      part: 'Fundamentals of React',
      exercises: 10,
    },
    {
      part: 'Using props to pass data',
      exercises: 7,
    },
    {
      part: 'State of a component',
      exercises: 14,
    },
  ]
  const course = 'react learning'
  const passData = val => {
    console.log(val)
  }
  const [msg, setMsg] = useLocalStorage('name', 'liudehua')
  return (
    <div style={{ height: '10000px' }}>
      <Header course={course} />
      <Content info={info} />
      <Footer info={info} />
      <Button passData={passData} />
      <Input>
        <div onClick={() => setMsg('wangyuyan')}>{msg}this is child hh</div>
      </Input>
      <p>{y}</p>
    </div>
  )
}
export default App
