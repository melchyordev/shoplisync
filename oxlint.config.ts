import { defineConfig } from "oxlint";
import native from "oxlint-config-universe/native";

export default defineConfig({
  extends: [native],
  categories: {
    correctness: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "error",
  },
});
