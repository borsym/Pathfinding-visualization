export default function Button(props) {
  //   if (props.isVisualize === "true") {
  //     return (
  //   <button
  //     className={`btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800`}
  //   >
  //     {props.name}
  //   </button>;
  //     );
  //   } else {
  //     return <button className={`btn-navbar`}>{props.name}</button>;
  //   }
  const buttonDesing =
    props.isVisualize === "true"
      ? `btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800`
      : `btn-navbar`;
  return <button className={buttonDesing}>{props.name}</button>;
}
