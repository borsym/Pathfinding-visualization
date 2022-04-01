export default (algorithms) => {
  algorithms.forEach((value) => {
    cy.contains("Algorithms").click();
    cy.contains(value).click();
    cy.contains("Visualize").click();
    cy.wait(1000);
    cy.get("#visualize", { timeout: 30000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(8, 145, 178)");
    cy.get(`#node-10-16`).should("have.class", "node-wall");
    cy.get(`#node-10-15`).should("have.class", "bg-yellow-200");
    cy.get(`#node-10-35`).should("have.class", "bg-yellow-200");

    //check if the board is clear
  });
};
