# Changelog

## [2.0.0] - 2026-04-30

### Added

- Shiki-powered syntax highlighting for JavaScript, TypeScript, Vue, HTML, JSON, Bash, CSS, SCSS, and Sass
- Server-side rendering support for highlighted code via Vue `onServerPrefetch`
- Exhaustive local demo samples for every supported language value
- Regression coverage for Shiki highlighting, language aliases, and SSR output

### Changed

- Replaced the built-in regex highlighter with a fine-grained Shiki bundle that only includes supported languages and the `github-light` / `github-dark` themes
- Made exported highlighter helpers asynchronous: `highlightCodeBlock` and `highlightCodeLine` now return promises
- Render `plaintext`, `text`, and `txt` as escaped plain text
- Render plain escaped code immediately on the client while Shiki loads, reducing first-render flicker
- Lazily load Shiki language grammars on demand
- Updated package documentation for Shiki, async runtime helpers, supported languages, SSR behavior, and theme behavior

### Removed

- Removed the legacy regex token CSS classes and token color custom properties such as `--vcb-token-keyword-color`

## [1.1.2] - 2026-04-28

### Fixed

- Reset internal `pre` border and radius styles so `CodeBlock` remains stable inside external prose containers

## [1.1.1] - 2026-04-05

### Changed

- Refined the default surface styling so `CodeBlock` reads more like a documentation block and less like a heavy standalone widget
- Expanded the theming docs with the new surface-related CSS custom properties and default styling notes
- Refreshed the demo to better reflect VueForge-aligned default tokens and presentation

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
