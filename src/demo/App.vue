<script setup lang="ts">
import { computed, ref } from "vue";
import { CodeBlock } from "../index";

type DemoBlock = {
  language: string;
  filename: string;
  code: string;
};

const plainTextCode = [
  "Vue Code Block smoke sample",
  "Paragraphs, punctuation, paths, URLs, numbers, and symbols should remain plain.",
  "",
  "Status: ready",
  "Path: src/components/CodeBlock.vue",
  "URL: https://example.test/docs?tab=syntax#tokens",
  "Math: 2 * (8 + 13) = 42",
  "Shell-ish text: npm run build -- --mode production",
  "JSON-ish text: { enabled: true, count: 3 }",
].join("\n");

const javaScriptCode = [
  "import { createApp, reactive } from 'vue';",
  "import Widget from './Widget.vue';",
  "",
  "const VERSION = '1.0.0';",
  "let retries = 0;",
  "var legacyFlag = false;",
  "",
  "function formatUser(user = {}) {",
  "  const name = user.name ?? 'Guest';",
  "  return `Hello, ${name.toUpperCase()}!`;",
  "}",
  "",
  "class ApiClient extends EventTarget {",
  "  #token;",
  "",
  "  constructor(token) {",
  "    super();",
  "    this.#token = token;",
  "  }",
  "",
  "  async request(path, options = {}) {",
  "    try {",
  "      const response = await fetch(`/api/${path}`, {",
  "        method: options.method || 'GET',",
  "        headers: { Authorization: `Bearer ${this.#token}` },",
  "      });",
  "      return await response.json();",
  "    } catch (error) {",
  "      console.error('Request failed', error);",
  "      throw error;",
  "    } finally {",
  "      retries += 1;",
  "    }",
  "  }",
  "}",
  "",
  "const state = reactive({ loading: false, items: [1, 2, 3] });",
  "const doubled = state.items.map((item) => item * 2).filter(Boolean);",
  "const matcher = /code-(block|line)/gi;",
  "const client = new ApiClient(import.meta.env.VITE_TOKEN);",
  "",
  "if (!legacyFlag && matcher.test('code-block')) {",
  "  createApp(Widget).provide('client', client).mount('#app');",
  "}",
].join("\n");

const typeScriptCode = [
  "import type { Component, InjectionKey } from 'vue';",
  "",
  "type Theme = 'light' | 'dark';",
  "type Nullable<T> = T | null;",
  "",
  "interface UserProfile {",
  "  readonly id: number;",
  "  name: string;",
  "  tags?: string[];",
  "}",
  "",
  "enum LoadState {",
  "  Idle = 'idle',",
  "  Loading = 'loading',",
  "  Ready = 'ready',",
  "}",
  "",
  "const profileKey: InjectionKey<UserProfile> = Symbol('profile');",
  "",
  "class Store<T extends { id: number }> {",
  "  private records = new Map<number, T>();",
  "",
  "  upsert(record: T): this {",
  "    this.records.set(record.id, record);",
  "    return this;",
  "  }",
  "",
  "  find(id: number): Nullable<T> {",
  "    return this.records.get(id) ?? null;",
  "  }",
  "}",
  "",
  "const resolveComponent = <TProps extends object>(",
  "  component: Component<TProps>,",
  "  props: Partial<TProps> = {},",
  ") => ({ component, props });",
  "",
  "const store = new Store<UserProfile>().upsert({",
  "  id: 7,",
  "  name: 'Ada',",
  "  tags: ['admin', 'reviewer'],",
  "});",
  "",
  "const theme = 'dark' satisfies Theme;",
  "const state: LoadState = store.find(7) ? LoadState.Ready : LoadState.Idle;",
  "export { profileKey, resolveComponent, state, theme };",
].join("\n");

const vueCode = [
  '<script setup lang="ts">',
  "import { computed, ref, watch } from 'vue';",
  "",
  "type Item = { id: number; label: string; done: boolean };",
  "",
  "const props = defineProps<{ title: string; disabled?: boolean }>();",
  "const emit = defineEmits<{ save: [items: Item[]] }>();",
  "const items = ref<Item[]>([",
  "  { id: 1, label: 'Write demo', done: true },",
  "  { id: 2, label: 'Find missing tokens', done: false },",
  "]);",
  "const completed = computed(() => items.value.filter((item) => item.done));",
  "",
  "watch(completed, (value) => console.info(`Completed: ${value.length}`));",
  "<\\/script>",
  "",
  "<template>",
  '  <section class="panel" :class="{ \'panel_disabled\': props.disabled }">',
  "    <header>",
  "      <h2>{{ props.title }}</h2>",
  '      <button type="button" @click="emit(\'save\', items)">Save</button>',
  "    </header>",
  "",
  '    <ul v-if="items.length">',
  "      <li",
  '        v-for="item in items"',
  '        :key="item.id"',
  '        :data-complete="item.done"',
  "      >",
  "        <label>",
  '          <input v-model="item.done" type="checkbox" />',
  "          <span>{{ item.label }}</span>",
  "        </label>",
  "      </li>",
  "    </ul>",
  "    <p v-else>No items</p>",
  "  </section>",
  "</template>",
  "",
  '<style scoped lang="scss">',
  ".panel {",
  "  display: grid;",
  "  gap: 0.75rem;",
  "  color: var(--panel-text, #1f232b);",
  "",
  "  &_disabled {",
  "    opacity: 0.6;",
  "  }",
  "}",
  "</style>",
].join("\n");

const htmlCode = [
  "<!doctype html>",
  '<html lang="en">',
  "  <head>",
  '    <meta charset="utf-8" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
  "    <title>Code Block Preview</title>",
  "  </head>",
  "  <body>",
  '    <main id="app" class="layout">',
  '      <article data-state="active">',
  "        <h1>Documentation</h1>",
  "        <p>Inline <strong>markup</strong>, entities &amp; attributes.</p>",
  '        <img src="/preview.png" alt="Preview" loading="lazy" />',
  '        <input type="email" placeholder="name@example.test" disabled />',
  "      </article>",
  "    </main>",
  '    <script type="module" src="/src/main.ts"><\\/script>',
  "  </body>",
  "</html>",
].join("\n");

const jsonCode = [
  "{",
  '  "name": "@codemonster-ru/vue-codeblock",',
  '  "version": "1.1.2",',
  '  "private": false,',
  '  "keywords": ["vue", "code", "highlight"],',
  '  "exports": {',
  '    ".": {',
  '      "import": "./dist/index.js",',
  '      "types": "./dist/index.d.ts"',
  "    }",
  "  },",
  '  "features": {',
  '    "copy": true,',
  '    "lineNumbers": true,',
  '    "maxHeight": null',
  "  },",
  '  "thresholds": [0, 1, 3.14, -42, 1e6]',
  "}",
].join("\n");

const bashCode = [
  "#!/usr/bin/env bash",
  "set -euo pipefail",
  "",
  "APP_ENV=${APP_ENV:-development}",
  'readonly ROOT_DIR="$(pwd)"',
  "",
  "npm install @codemonster-ru/vue-codeblock@latest --save",
  'npm run build -- --mode "$APP_ENV"',
  "",
  "for file in src/**/*.ts; do",
  '  if [[ -f "$file" ]]; then',
  '    echo "Checking: $file"',
  "  fi",
  "done",
  "",
  'case "$APP_ENV" in',
  "  production) npm run release:check ;;",
  "  test) npm run test -- --runInBand ;;",
  '  *) echo "Skipping release checks" ;;',
  "esac",
  "",
  "curl -fsSL \"https://example.test/api/status?env=$APP_ENV\" | jq '.ok'",
].join("\n");

const cssCode = [
  "@layer reset, components;",
  "",
  ":root {",
  "  --color-brand: #0e639c;",
  "  --space-2: 0.5rem;",
  "}",
  "",
  "@media (prefers-color-scheme: dark) {",
  "  :root {",
  "    --color-brand: rgb(96 165 250);",
  "  }",
  "}",
  "",
  ".code-card,",
  "[data-theme='dark'] .code-card:hover {",
  "  display: grid;",
  "  grid-template-columns: minmax(0, 1fr) auto;",
  "  gap: calc(var(--space-2) * 2);",
  "  width: min(100%, 72rem);",
  "  margin-inline: auto;",
  "  border: 1px solid color-mix(in srgb, var(--color-brand), white 72%);",
  "  border-radius: 8px;",
  "  background: linear-gradient(180deg, #ffffff, #f8fafc);",
  "  color: hsl(222 47% 11%);",
  "}",
  "",
  ".code-card::before {",
  "  content: 'demo';",
  "  font-weight: 700;",
  "}",
].join("\n");

const scssCode = [
  "$brand: #0e639c;",
  "$sizes: (sm: 0.75rem, md: 1rem, lg: 1.25rem);",
  "",
  "@mixin focus-ring($color: $brand) {",
  "  outline: 2px solid rgba($color, 0.45);",
  "  outline-offset: 2px;",
  "}",
  "",
  ".toolbar {",
  "  display: flex;",
  "  gap: map-get($sizes, sm);",
  "",
  "  &__button {",
  "    border: 1px solid darken($brand, 8%);",
  "    color: white;",
  "    background: $brand;",
  "",
  "    &:focus-visible {",
  "      @include focus-ring;",
  "    }",
  "  }",
  "}",
].join("\n");

const sassCode = [
  "$brand: #0e639c",
  "$space: 0.75rem",
  "",
  "=focus-ring($color: $brand)",
  "  outline: 2px solid rgba($color, 0.45)",
  "  outline-offset: 2px",
  "",
  ".toolbar",
  "  display: flex",
  "  gap: $space",
  "",
  "  &__button",
  "    border: 1px solid darken($brand, 8%)",
  "    color: white",
  "    background: $brand",
  "",
  "    &:focus-visible",
  "      +focus-ring",
].join("\n");

const demoBlocks: DemoBlock[] = [
  { language: "plaintext", filename: "plain.txt", code: plainTextCode },
  { language: "text", filename: "notes.text", code: plainTextCode },
  { language: "txt", filename: "readme.txt", code: plainTextCode },
  { language: "js", filename: "client.js", code: javaScriptCode },
  {
    language: "javascript",
    filename: "client.javascript",
    code: javaScriptCode,
  },
  { language: "ts", filename: "store.ts", code: typeScriptCode },
  {
    language: "typescript",
    filename: "store.typescript",
    code: typeScriptCode,
  },
  { language: "vue", filename: "Playground.vue", code: vueCode },
  { language: "html", filename: "index.html", code: htmlCode },
  { language: "json", filename: "package.json", code: jsonCode },
  { language: "bash", filename: "release.bash", code: bashCode },
  { language: "shell", filename: "release.shell", code: bashCode },
  { language: "sh", filename: "release.sh", code: bashCode },
  { language: "css", filename: "code-card.css", code: cssCode },
  { language: "scss", filename: "toolbar.scss", code: scssCode },
  { language: "sass", filename: "toolbar.sass", code: sassCode },
];

const theme = ref<"light" | "dark">("light");
const themeLabel = computed(() =>
  theme.value === "light" ? "Dark theme" : "Light theme",
);
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>

<template>
  <main class="demo-page" :data-theme="theme">
    <div class="demo-page__intro">
      <p class="demo-page__eyebrow">Local playground</p>
      <h1 class="demo-page__title">Vue Code Block</h1>
      <p class="demo-page__text">
        Exhaustive syntax samples for every supported language value.
      </p>
      <button
        type="button"
        class="demo-page__theme-toggle"
        @click="toggleTheme"
      >
        {{ themeLabel }}
      </button>
    </div>

    <div class="demo-page__grid">
      <CodeBlock
        v-for="block in demoBlocks"
        :key="block.language"
        :language="block.language"
        :filename="block.filename"
        :code="block.code"
        max-height="520px"
        show-line-numbers
        :theme="theme"
      />
    </div>

  </main>
</template>

<style scoped>
.demo-page {
  --vf-color-bg: #f6f8fb;
  --vf-color-surface: #ffffff;
  --vf-color-surface-muted: #f3f3f3;
  --vf-color-text: #1f232b;
  --vf-color-muted: #616773;
  --vf-color-border: #d9dde3;
  --vf-color-primary: #0e639c;
  --vf-color-success: #2e7d32;
  --vf-color-info: #0069ba;
  --vf-color-warn: #9f8400;
  --vf-color-help: #7245ae;
  --vf-color-danger: #c72e39;
  --vf-color-contrast: #252526;
  --vf-radius-control: 0.75rem;
  --vf-radius-control-tight: 0.5rem;
  --vf-radius-surface: 1rem;
  --vf-font-size-sm: 0.875rem;
  --vf-line-height-normal: 1.5;
  --vf-text-body-font-weight: 400;
  --vf-font-weight-semibold: 600;
  --vf-prose-code-block-padding: 0.75rem 1rem;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 48px 20px;
  background:
    radial-gradient(circle at top, rgba(14, 165, 233, 0.16), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  color: #0f172a;
  transition:
    background 180ms ease,
    color 180ms ease;
}

.demo-page[data-theme="dark"] {
  --vf-color-bg: #1e1e1e;
  --vf-color-surface: #252526;
  --vf-color-surface-muted: #2d2d30;
  --vf-color-text: #d4d4d4;
  --vf-color-muted: #9da0a6;
  --vf-color-border: #3c3c3c;
  --vf-color-primary: #2f7fd6;
  --vf-color-success: #3f8746;
  --vf-color-info: #1f76be;
  --vf-color-warn: #c6a25f;
  --vf-color-help: #8553a1;
  --vf-color-danger: #bf3f3f;
  --vf-color-contrast: #d7d7d7;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 30%),
    linear-gradient(180deg, #020617 0%, #111827 100%);
  color: #e2e8f0;
}

.demo-page__intro {
  max-width: 720px;
  margin: 0 auto 24px;
  text-align: center;
}

.demo-page__eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0369a1;
}

.demo-page__title {
  margin: 0 0 12px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1;
}

.demo-page__text {
  margin: 0 auto;
  max-width: 60ch;
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
}

.demo-page[data-theme="dark"] .demo-page__eyebrow {
  color: #7dd3fc;
}

.demo-page[data-theme="dark"] .demo-page__text {
  color: #cbd5e1;
}

.demo-page__theme-toggle {
  margin-top: 20px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: inherit;
  padding: 10px 16px;
  font: inherit;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.demo-page__theme-toggle:hover {
  transform: translateY(-1px);
}

.demo-page[data-theme="dark"] .demo-page__theme-toggle {
  border-color: rgba(148, 163, 184, 0.26);
  background: rgba(15, 23, 42, 0.72);
}

.demo-page__grid {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 560px), 1fr));
  gap: 24px;
  width: min(100%, 1280px);
  margin: 0 auto;
}

</style>
