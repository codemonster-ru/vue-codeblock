# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.0.0] - 2026-03-01

### Added

- Initial stable release of `@codemonster-ru/vue-codeblock`
- Vue 3 code block component with copy action, line numbers, theming, and syntax highlighting
- Shared runtime exports for `highlightCodeBlock`, `highlightCodeLine`, and `escapeCodeHtml`
- GitHub Actions CI workflow for install, typecheck, test, and build
- GitHub Actions publish workflow for npm releases triggered by `v*` tags

### Changed

- Finalized public package metadata and exports for npm publishing
- Cleaned published type artifacts so demo declarations are no longer included in the package
