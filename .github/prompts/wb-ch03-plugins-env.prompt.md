---
description: "Implement Chapter 3: main webpack plugins, environment variables, static assets, Babel plugins, and config validation"
name: "WB 03 Plugins And Env"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 3 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch03-plugins-env`

Requirements:

- Build a standalone TypeScript project using webpack and Babel.
- Use `HtmlWebpackPlugin` to generate the final HTML shell.
- Copy at least one static asset into `dist`.
- Inject environment values with `DefinePlugin` or `EnvironmentPlugin`.
- Add one Babel plugin, preferably `@babel/plugin-transform-runtime`, and explain why it is included.
- Add a script that validates the webpack config with `webpack configtest`.

Deliverables:

- `.env` files or a comparable environment setup
- webpack config showing plugin usage clearly
- Babel config with one plugin
- one static file copied into output
- `README.md` explaining plugin responsibilities and environment replacement

Verification:

- install dependencies
- run `npm run build`
- run the config validation script