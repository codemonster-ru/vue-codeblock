<script setup lang="ts">
import { computed, ref } from "vue";
import { CodeBlock } from "../index";

const exampleCode: string = [
  "import { createApp } from 'vue';",
  "import VueForge from '@codemonster-ru/vueforge-core';",
  "import '@codemonster-ru/vueforge-core/styles.css';",
  "import '@codemonster-ru/vueforge-layouts/styles.css';",
  "",
  "createApp(App).use(VueForge).mount('#app');",
].join("\n");

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
        Demo page for local development and component preview.
      </p>
      <button
        type="button"
        class="demo-page__theme-toggle"
        @click="toggleTheme"
      >
        {{ themeLabel }}
      </button>
    </div>

    <CodeBlock
      language="ts"
      :code="exampleCode"
      max-height="420px"
      :theme="theme"
    />
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

:deep(.vcb) {
  max-width: 760px;
  margin: 0 auto;
}
</style>
