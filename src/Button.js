export default function Button(props) {
  const buttonDesing =
    props.isVisualize === "true"
      ? `btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800`
      : `btn-navbar`;

  return (
    <button className={buttonDesing} onClick={props.function}>
      {props.name}
    </button>
  );
}
