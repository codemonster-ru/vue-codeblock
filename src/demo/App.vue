<script setup lang="ts">
import { computed, ref } from "vue";
import { CodeBlock } from "../index";

const exampleCode: string = [
  '<script setup lang="ts">',
  "import { ref } from 'vue';",
  "",
  "const clicks = ref(0);",
  "</" + "script>",
  "",
  "<template>",
  '    <button @click="clicks += 1">Clicked {{ clicks }} times</button>',
  "</template>",
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
      language="vue"
      filename="CounterButton.vue"
      :code="exampleCode"
      :show-line-numbers="true"
      max-height="420px"
      :theme="theme"
    />
  </main>
</template>

<style scoped>
.demo-page {
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
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.16);
}
</style>
