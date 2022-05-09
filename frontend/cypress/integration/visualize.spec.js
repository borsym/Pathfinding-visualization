/* eslint-disable no-undef */
import testAlgorithms from "../support/testAlgorithms";
import testAlgorithmsWithWall from "../support/testAlgorithmsWithWall";
describe("Run the algorithms", () => {
  it("Check if the board is ready", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#profileClose").click();
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

  it("Visualize the algorithms with wall", () => {
    const algorithms = ["BFS", "DFS", "Dijkstra", "Astar"];
    // click on the id and relase
    cy.get("#node-10-16").trigger("mousedown");
    cy.get("#node-10-16").trigger("mouseup");
    testAlgorithmsWithWall(algorithms, false);
    cy.contains("Clear Board").click();
    cy.wait(1000);
  });

  it("Visualize the algorithms with wall and clearboard", () => {
    const algorithms = ["BFS", "Astar", "Dijkstra", "DFS"];
    // click on the id and relase
    cy.get("#node-10-16").trigger("mousedown");
    cy.get("#node-10-16").trigger("mouseup");
    cy.contains("Clear Board").click();
    testAlgorithms(algorithms, 15, 35);
    cy.wait(1000);
  });

  it("Maze generation", () => {
    cy.contains("Maze").click();
    cy.contains("Random").click();
    cy.wait(1000);
    cy.get("#visualize", { timeout: 30000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(8, 145, 178)");

    cy.contains("Maze").click();
    cy.contains("Recursive Division").click();
    cy.get("#visualize", { timeout: 30000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(8, 145, 178)");
    cy.wait(1000);
  });
});
