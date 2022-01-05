export default (algorithms, start, end) => {
  algorithms.forEach((value) => {
    cy.contains("Algorithms").click();
    cy.contains(value).click();
    cy.contains("Visualize").click();
    cy.wait(1000);
    cy.get("#visualize", { timeout: 20000 })
      .should("have.css", "background-color")
      .and("eq", "rgb(8, 145, 178)");
    for (let i = start; i <= end; i++) {
      cy.get(`#node-${10}-${i}`).should("have.class", "bg-yellow-200");
    }

    //check if the board is clear
  });
};
