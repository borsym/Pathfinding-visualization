/* eslint-disable no-undef */
// run with npx cypress open
/// <reference types="cypress" />
describe("Check Navbar", () => {
  it("everything is loaded in the navbar", () => {
    cy.visit("http://localhost:3000/");

    const navbar = [
      "Profile",
      "Distance Formula",
      "Clear Board",
      "Questions",
      "Visualize",
      "Algorithms",
      "Maze",
      "Speed",
      "Type",
    ];

    cy.get("#profileClose").click(); // close the profile
    navbar.forEach((value) => {
      cy.contains(value);
    });
  });
});

describe("interact with Navbar", () => {
  it("interaction with Profile", () => {
    cy.contains("Profile").click();
    cy.contains("Name");
    cy.contains("Help");
    cy.get("#closeProfile").click();
  });

  it("interaction with distance formula", () => {
    cy.contains("Distance Formula").click();
    const formulas = ["Euclidean", "Manhattan", "Chebyshev"];
    formulas.forEach((value) => {
      cy.contains(value);
    });
    cy.contains("Manhattan").click();
    cy.contains("Distance Formula: Manhattan");
    cy.contains("Distance Formula").click();
    cy.contains("Euclidean").click();
    cy.contains("Distance Formula: Euclidean");
  });

  it("interaction with Clear Board", () => {
    cy.contains("Clear Board").click();
  });

  it("interaction with Questions", () => {
    cy.contains("Questions").click();
    cy.contains("You have to pick an algorithm!");
  });

  it("interaction with Visualize", () => {
    cy.contains("Visualize").click();
    cy.contains("You have to pick an algorithm!");
  });

  it("interaction with ALgorithms", () => {
    cy.contains("Algorithms").click();
    const algorithms = ["BFS", "DFS", "Dijkstra", "Astar"];
    algorithms.forEach((value) => {
      cy.contains(value).click();
      cy.contains(`Visualize ${value}`);
      switch (value) {
        case "BFS":
          cy.contains(
            "Breath-first Search is unweighted and guarantees the shortest path!"
          );
          break;
        case "DFS":
          cy.contains(
            "Depth-first Search is unweighted and does not guarantee the shortest path!"
          );
          break;
        case "Dijkstra":
          cy.contains(
            "Dijkstra's Algorithm is weighted and guarantees the shortest path!"
          );
          break;
        case "Astar":
          cy.contains(
            "A* Search is weighted and guarantees the shortest path!"
          );
          break;
        default:
          break;
      }
      cy.contains("Algorithms").click();
    });
  });

  it("interaction with Maze", () => {
    cy.contains("Maze").click();
    const algorithms = ["Random", "Recursive Division"];
    algorithms.forEach((value) => {
      cy.contains(value);
    });
  });

  it("interaction with Speed", () => {
    cy.contains("Speed").click();
    const algorithms = ["Fast", "Slow", "Normal"];
    algorithms.forEach((value) => {
      cy.contains(value);
    });

    cy.contains("Normal").click();
    cy.contains("Speed: Normal");
  });

  it("interaction with Type", () => {
    cy.contains("Type").click();
    const algorithms = ["Grass [3]", "Water [5]", "Stone [8]"];
    algorithms.forEach((value) => {
      cy.contains(value);
    });

    cy.contains("Water").click();
    cy.contains("Type: Water [5]");
  });
});
