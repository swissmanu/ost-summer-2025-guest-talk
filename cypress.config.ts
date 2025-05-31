import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  e2e: {
    supportFile: false,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});