const Content = ({ info }) => {
  return info.map((item, id) => (
    <p key={id}>
      {item.part}
      {item.exercises}
    </p>
  ))
}
// const Content = ({ info }) =>
//   info.map((item, id) => (
//     <p key={id}>
//       {item.part}
//       {item.exercises}
//     </p>
//   ))
export default Content
