/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBmjHvoCSc63KtDGyvVRKND397aIPNo0L4",
  authDomain: "pathfinding-visualizer-d5941.firebaseapp.com",
  projectId: "pathfinding-visualizer-d5941",
  storageBucket: "pathfinding-visualizer-d5941.appspot.com",
  messagingSenderId: "106729206356",
  appId: "1:106729206356:web:11b7b018fa439ea2ee33c1",
  measurementId: "G-LCE01B1T7H",
});

attachCustomCommands({ Cypress, cy, firebase });
