import eslintConfigPrettier from "eslint-config-prettier"

export default [
  eslintConfigPrettier,
  {
    rules: {
      "react/jsx-no-target-blank": "off",
    },
  },
]
