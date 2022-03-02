/* eslint-disable no-undef */
import testAlgorithms from "../support/testAlgorithms";
describe("Run the algorithms", () => {
  it("Check if the board is ready", () => {
    cy.visit("http://localhost:3000/");
    for (let i = 0; i < 20; i += 2) {
      for (let j = 0; j < 50; j += 5) {
        if (!((i === 10 && j === 15) || (i === 10 && j === 35))) {
          cy.get(`#node-${i}-${j}`).should("have.class", "node-style");
        }
      }
    }
  });

  it("Visualize the algorithms without any wall without Clear Board", () => {
    const algorithms = ["BFS", "Astar", "Dijkstra", "DFS"];
    testAlgorithms(algorithms, 15, 35);
    cy.wait(1000);
  });

  it("Visualize the algorithms with Clear Board", () => {
    const algorithms = ["BFS", "DFS", "Dijkstra", "Astar"];
    testAlgorithms(algorithms, 15, 35);
    cy.contains("Clear Board").click();
    cy.wait(1000);
  });

  it("Maze generation", () => {
    cy.contains("Maze").click();
    cy.contains("Random").click();
    cy.get("#visualize", { timeout: 30000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(8, 145, 178)");
  });
});
