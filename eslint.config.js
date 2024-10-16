import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      ...reactPlugin,
      ...reactHooksPlugin,
      ...nextPlugin,
    },
  },
  prettier,
];
