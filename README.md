# @codemonster-ru/vue-codeblock

[![npm version](https://img.shields.io/npm/v/%40codemonster-ru%2Fvue-codeblock)](https://www.npmjs.com/package/@codemonster-ru/vue-codeblock)
[![npm downloads](https://img.shields.io/npm/dw/%40codemonster-ru%2Fvue-codeblock)](https://www.npmjs.com/package/@codemonster-ru/vue-codeblock)
[![license](https://img.shields.io/npm/l/%40codemonster-ru%2Fvue-codeblock)](https://github.com/codemonster-ru/vue-codeblock/blob/main/LICENSE)

Standalone Vue 3 code block component with built-in syntax highlighting, light/dark theme support, copy actions, line numbers, and a small shared highlighting runtime you can also use outside the component.

## Install

```bash
npm i @codemonster-ru/vue-codeblock
```

## Use Cases

- package documentation
- design system docs
- internal developer portals
- settings/admin panels that need to render code examples

## Component Usage

Register the plugin:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VueCodeBlock from "@codemonster-ru/vue-codeblock";

createApp(App).use(VueCodeBlock).mount("#app");
```

Or import the component directly:

```vue
<script setup lang="ts">
import { CodeBlock } from "@codemonster-ru/vue-codeblock";
</script>

<template>
  <CodeBlock
    language="vue"
    filename="ButtonExample.vue"
    :show-line-numbers="true"
    :code="`<Button label=&quot;Save&quot; />`"
  />
</template>
```

If you want the package CSS explicitly:

```ts
import "@codemonster-ru/vue-codeblock/style.css";
```

## Runtime Usage

The package also exports the shared highlighter:

```ts
import {
  highlightCodeBlock,
  escapeCodeHtml,
} from "@codemonster-ru/vue-codeblock";

const html = highlightCodeBlock("ts", "const answer = 42;");
const escaped = escapeCodeHtml("<Button />");
```

## Props

| Prop              | Type                             | Default        | Purpose                              |
| ----------------- | -------------------------------- | -------------- | ------------------------------------ |
| `code`            | `string`                         | `''`           | Raw source code                      |
| `language`        | `CodeBlockLanguage`              | `'plaintext'`  | Language hint for highlighting       |
| `filename`        | `string`                         | `''`           | Optional filename in header          |
| `showHeader`      | `boolean`                        | `true`         | Shows the top meta/action bar        |
| `showLineNumbers` | `boolean`                        | `false`        | Renders line numbers                 |
| `copyable`        | `boolean`                        | `true`         | Shows copy action                    |
| `copyLabel`       | `string`                         | `'Copy'`       | Copy button text                     |
| `copiedLabel`     | `string`                         | `'Copied'`     | Temporary copied state label         |
| `copiedDuration`  | `number`                         | `1200`         | Copied state timeout in ms           |
| `languageLabel`   | `string`                         | `'Language'`   | Header label before language         |
| `disabled`        | `boolean`                        | `false`        | Disables actions                     |
| `wrap`            | `boolean`                        | `false`        | Enables wrapped lines                |
| `highlight`       | `boolean`                        | `true`         | Turns highlighting on/off            |
| `maxHeight`       | `string`                         | `''`           | Optional scroll container max height |
| `ariaLabel`       | `string`                         | `'Code block'` | Accessibility label                  |
| `theme`           | `'inherit' \| 'light' \| 'dark'` | `'inherit'`    | Theme mode override                  |

## Events

| Event  | Payload            |
| ------ | ------------------ |
| `copy` | `{ text: string }` |

## Slots

| Slot      | Purpose                                    |
| --------- | ------------------------------------------ |
| `actions` | Add custom actions next to the copy button |

## Supported Languages

Canonical built-in values:

`plaintext`, `text`, `txt`, `js`, `javascript`, `ts`, `typescript`, `vue`, `html`, `json`, `bash`, `shell`, `sh`, `css`, `scss`, `sass`

You can import them as `SUPPORTED_CODE_BLOCK_LANGUAGES`.

## Theming

The component ships with light and dark defaults. You can override it with:

- `theme="light"`
- `theme="dark"`
- `theme="inherit"` and an ancestor `data-theme="dark"`

Main CSS custom properties:

- `--vcb-background-color`
- `--vcb-text-color`
- `--vcb-border-color`
- `--vcb-padding`
- `--vcb-font-size`
- `--vcb-line-height`
- `--vcb-token-keyword-color`
- `--vcb-token-string-color`
- `--vcb-token-number-color`
- `--vcb-token-variable-color`
- `--vcb-token-function-color`
- `--vcb-token-property-color`
- `--vcb-token-directive-color`

Example:

```css
.docs-surface {
  --vcb-background-color: #081224;
  --vcb-border-color: rgba(96, 165, 250, 0.28);
  --vcb-token-keyword-color: #d8b4fe;
}
```

## Notes

- The built-in highlighter is lightweight and regex-based by design.
- It is tuned for documentation and UI examples, not for full IDE-grade parsing.
- If you need more languages later, extend the highlighter runtime rather than patching rendered HTML.
