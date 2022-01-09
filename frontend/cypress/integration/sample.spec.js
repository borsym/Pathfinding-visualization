/// <reference types="cypress" />
import testAlgorithms from "../support/testAlgorithms";
describe("Visit frontend", () => {
  it("Visit the frontend page and make interraction with the buttons", () => {
    cy.visit("http://localhost:3000/");
    const navbar = [
      "Clear Board",
      "Algorithms",
      "Struktograms",
      "Visualize",
      "Maze",
      "Speed",
      "Type",
    ];

    navbar.forEach((value) => {
      cy.contains(value);
    });

    cy.contains("Visualize").click();
    cy.contains("You have to pick an algorithm!", { timeout: 1000 });
  });

  it("Check if the board is ready", () => {
    for (let i = 0; i < 20; i += 2) {
      for (let j = 0; j < 50; j += 5) {
        if (!((i === 10 && j === 15) || (i === 10 && j === 35))) {
          cy.get(`#node-${i}-${j}`).should("have.class", "node-style");
        }
      }
    }
  });

  it("Test the algorithms without any wall without Clear Board", () => {
    const algorithms = ["BFS", "DFS", "Dijkstra"]; //, "DFS", "Dijkstra", "A*"];
    testAlgorithms(algorithms, 15, 35);
    cy.wait(1000);
  });

  it("Put walls into the grid and run the algorithms again", () => {
    // its not 100% working sometimes skips the walls....
    for (let i = 8; i <= 15; i++) {
      cy.get(`#node-${i}-17`).trigger("mousedown");
    }
    cy.get(`#node-13-17`).trigger("mouseup", { which: 1 });

    // cy.request("http://localhost:3000/wallUpdate", "post");
    const algorithms = ["BFS", "DFS", "Dijkstra"]; //, "DFS", "Dijkstra", "A*"];
    testAlgorithms(algorithms, 35, 35);
    cy.contains("Clear Board").click();
  });
});
