const Footer = ({ info }) => {
  const num = info.reduce((acc, cur) => acc + cur.exercises, 0)
  console.log(num)
  return (
    <p>Number of exercises {num}</p>
  )
}

export default Footer