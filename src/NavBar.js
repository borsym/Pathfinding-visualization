import "./style/index.css";
export default function NavBar() {
  return (
    <nav className="flex justify-center items-center mx-auto bg-slate-800 p-4">
      <button className="btn-navbar">Valami</button>
      <button className="btn-navbar">Valami</button>
      <button className="btn-navbar">Clear Board</button>
      <button className="btn-navbar">Struktograms</button>
      <button className="btn-navbar bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800">
        Visualize
      </button>
      <button className="btn-navbar">Algorithms</button>
      <button className="btn-navbar">Maze</button>
      <button className="btn-navbar">Speed</button>
      <button className="btn-navbar">Type</button>
    </nav>
  );
}
