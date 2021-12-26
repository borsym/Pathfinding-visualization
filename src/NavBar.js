import Button from "./Button";
import Dropdown from "./Dropdown";
import "./style/index.css";
export default function NavBar() {
  const optionsAlgorithms = ["Options", "Visualize", "Clear", "Cica"];
  const optionsMazes = ["Rekurziv", "Iterativ", "Valami"];
  const optionsSpeed = ["Fast", "Normal", "Slow"];
  const optionsType = ["Dirt", "Water", "Stone"];
  const clearBoard = (e) => {
    e.preventDefault();
    console.log("Clear board");
  };

  return (
    <nav className="flex justify-center items-center mx-auto bg-slate-800 p-4">
      <Button name="Valami" />
      <Button name="Valami" />
      <Button name="Clear Board" function={clearBoard} />
      <Button name="Struktograms" />
      <Button
        name="Visualize"
        isVisualize="true"
        // className=" bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800"
      />
      <Dropdown name="Algorithms" options={optionsAlgorithms} />
      <Dropdown name="Maze" options={optionsMazes} />
      <Dropdown name="Speed" options={optionsSpeed} />
      <Dropdown name="Type" options={optionsType} />
    </nav>
  );
}
