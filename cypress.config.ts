export default {
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

  e2e: {
    experimentalRunAllSpecs : true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
