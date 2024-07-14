const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3v887z',
  responseTimeout: 60000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: false,
    video: false,
    slowTestThreshold: 10000
  },
});
