# Chapter 7: Testing, Analysis, and Asset Optimization

Status: planned

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 07 Quality And Analysis](../../.github/prompts/wb-ch07-quality-analysis.prompt.md)

## Mini Project

Build a small media catalog inspector with a few testable utilities, analyzable bundles, and image assets worth optimizing.

## Focus Topics

- Jest integration
- `babel-jest`
- webpack bundle analyzer
- image optimization
- logging and diagnostics

## Learning Goal

Understand how testing, bundle inspection, and asset optimization fit around the main webpack and Babel workflow without obscuring the core build pipeline.

## Planned Deliverables

- `package.json`
- webpack config
- Babel config
- `tsconfig.json`
- Jest config or equivalent package setup
- sample unit tests
- analyzer script
- image optimization setup

## Implementation Checklist

1. Initialize a fresh standalone project in this folder.
2. Add Jest and `babel-jest`.
3. Create at least one shared utility with unit tests.
4. Add bundle analysis tooling and a dedicated script.
5. Add production image optimization.
6. Tune logging or stats so build output stays readable.
7. Run tests and the main build or analysis command.
8. Expand this README with findings from test and bundle analysis output.

## Verification Targets

- tests pass
- analyzer report can be generated
- production image handling improves output quality or size

## Notes

Capture actual bundle analysis observations here once the chapter is implemented.
