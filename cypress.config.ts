import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: true,
    supportFile: false,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});