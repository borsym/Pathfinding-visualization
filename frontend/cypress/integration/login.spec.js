/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/* eslint-disable no-undef */
/// <reference types="cypress" />

// import { getLoginButton, getTitle } from "../support/commands";
describe("Home", () => {
  it("can log in and view dashbord", () => {
    cy.login();
    cy.visit("http://localhost:3000/");
    cy.contains("Sign in with Google").click();
    // getLoginButton().click();
    // getTitle().should("contain.text", "Clients");
  });

  // afterEach(() => {
  //   cy.logout();
  // });
});

