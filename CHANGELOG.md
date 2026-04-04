# Changelog

## [1.1.0] - 2026-04-04

### Added

- Support for inherited theme detection from the nearest `data-vf-theme` ancestor when `theme="inherit"` is used
- Test coverage for inherited theme resolution via `data-theme`, `data-vf-theme`, fallback light mode, and explicit `light` / `dark` modes

### Changed

- Kept inherited theme priority as nearest `data-theme`, then nearest `data-vf-theme`, then fallback `light`
- Updated the built-in default light and dark code block palette to better match the current VueForge visual language
- Mapped default `CodeBlock` CSS variables to available `--vf-*` theme tokens with local fallbacks so the component stays fully standalone outside VueForge
- Documented `theme="inherit"` support for both `data-theme` and `data-vf-theme`

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
