/* eslint-disable no-undef */
describe("Question segment", () => {
  it("Start Question segment", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Algorithms").click();
    cy.contains("BFS").click();
    cy.contains("Questions").click();

    cy.get("#0").click();
    cy.get("#0", { timeout: 3000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(254, 226, 226)");

    cy.contains("Next").click();

    cy.get("#0").click();
    cy.get("#0", { timeout: 3000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(254, 226, 226)");

    cy.contains("Next").click();

    cy.wait(2000);
    cy.contains("Submit").click();
    cy.wait(2000);
    cy.contains("Next").click();

    cy.wait(2000);
    cy.contains("Submit").click();
    cy.wait(2000);
    cy.contains("Next").click();
  });
});
