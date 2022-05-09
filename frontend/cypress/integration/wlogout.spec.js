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
describe("Logout", () => {
  it("logout", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#profileClose").click();
    cy.contains("Profile").click();
    cy.contains("Sign out").click();
  });
});
