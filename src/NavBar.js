import Button from "./Button";
import "./style/index.css";
export default function NavBar() {
  return (
    <nav className="flex justify-center items-center mx-auto bg-slate-800 p-4">
      <Button name="Valami" />
      <Button name="Valami" />
      <Button name="Clear Board" />
      <Button name="Struktograms" />
      <Button
        name="Visualize"
        isVisualize="true"
        // className=" bg-cyan-600 hover:bg-cyan-500 hover:text-blue-800"
      />
      <Button name="Algorithms" />
      <Button name="Maze" />
      <Button name="Speed" />
      <Button name="Type" />
    </nav>
  );
}
