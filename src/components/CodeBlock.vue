<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    ref="rootElement"
    class="vcb"
    :class="{ 'vcb_disabled': disabled }"
    :data-theme="resolvedTheme"
    :aria-label="ariaLabel"
  >
    <header v-if="showHeader || $slots.actions" class="vcb__header">
      <div v-if="showHeader" class="vcb__meta">
        <span v-if="filename" class="vcb__filename">{{
          filename
        }}</span>
        <span class="vcb__language"
          >{{ languageLabel }}: {{ language }}</span
        >
      </div>
      <div class="vcb__actions">
        <slot name="actions" />
        <button
          v-if="copyable"
          type="button"
          class="vcb__copy"
          :disabled="disabled"
          @click="copyCode"
        >
          {{ copied ? copiedLabel : copyLabel }}
        </button>
      </div>
    </header>

    <pre
      class="vcb__pre"
      :class="{ 'vcb__pre_wrap': wrap }"
      :style="preStyle"
    ><code><span
            v-for="(line, index) in lines"
            :key="index"
            class="vcb__line"
        ><span v-if="showLineNumbers" class="vcb__line-number">{{ index + 1 }}</span><span
                class="vcb__line-content"
                v-html="renderedLines[index] ?? ''"
            /></span></code></pre>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { highlightCodeBlock } from "../services/code-highlight";
import type { CodeBlockCopyPayload, CodeBlockProps } from "../types";

defineOptions({ name: "VcbCodeBlock" });

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: "",
  language: "plaintext",
  filename: "",
  showHeader: true,
  showLineNumbers: false,
  copyable: true,
  copyLabel: "Copy",
  copiedLabel: "Copied",
  copiedDuration: 1200,
  languageLabel: "Language",
  disabled: false,
  wrap: false,
  highlight: true,
  maxHeight: "",
  ariaLabel: "Code block",
  theme: "inherit",
});

const emits = defineEmits<{
  (event: "copy", payload: CodeBlockCopyPayload): void;
}>();

const copied = ref(false);
const rootElement = ref<HTMLElement | null>(null);
const inheritedTheme = ref<"light" | "dark">("light");
let copiedTimer: ReturnType<typeof setTimeout> | null = null;
let themeObserver: MutationObserver | null = null;

const normalizedCode = computed(() => props.code.replace(/\r\n/g, "\n"));
const lines = computed(() => {
  if (!normalizedCode.value) {
    return [""];
  }

  return normalizedCode.value.split("\n");
});

const renderedLines = computed(() =>
  highlightCodeBlock(
    props.language,
    normalizedCode.value,
    props.highlight,
  ).split("\n"),
);
const resolvedTheme = computed(() =>
  props.theme === "inherit" ? inheritedTheme.value : props.theme,
);

const preStyle = computed(() => {
  if (!props.maxHeight) {
    return undefined;
  }

  return {
    maxHeight: props.maxHeight,
  };
});

const copyCode = async () => {
  if (props.disabled) {
    return;
  }

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(normalizedCode.value);
    }
  } finally {
    emits("copy", { text: normalizedCode.value });

    copied.value = true;
    if (copiedTimer) {
      clearTimeout(copiedTimer);
    }
    copiedTimer = setTimeout(() => {
      copied.value = false;
      copiedTimer = null;
    }, props.copiedDuration);
  }
};

const normalizeThemeValue = (value: string | null) =>
  value === "dark" ? "dark" : "light";

const findClosestThemeValue = (
  element: HTMLElement | null,
  attributeName: "data-theme" | "data-vf-theme",
) => {
  let currentElement = element?.parentElement ?? null;

  while (currentElement) {
    if (currentElement.hasAttribute(attributeName)) {
      return normalizeThemeValue(currentElement.getAttribute(attributeName));
    }

    currentElement = currentElement.parentElement;
  }

  return null;
};

const syncInheritedTheme = () => {
  if (props.theme !== "inherit") {
    return;
  }

  inheritedTheme.value =
    findClosestThemeValue(rootElement.value, "data-theme") ??
    findClosestThemeValue(rootElement.value, "data-vf-theme") ??
    "light";
};

onMounted(() => {
  syncInheritedTheme();

  if (typeof MutationObserver === "undefined" || !rootElement.value) {
    return;
  }

  themeObserver = new MutationObserver(() => {
    syncInheritedTheme();
  });

  themeObserver.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-theme", "data-vf-theme"],
  });
});

onBeforeUnmount(() => {
  if (copiedTimer) {
    clearTimeout(copiedTimer);
    copiedTimer = null;
  }

  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
});
</script>

<style lang="scss">
.vcb {
  display: grid;
  gap: var(--vcb-gap, 0);
  border: 1px solid
    var(--vcb-border-color, var(--vf-color-border, #d9dde3));
  border-radius: var(
    --vcb-border-radius,
    var(--vf-radius-surface, var(--vf-radius, 0.625rem))
  );
  background: var(--vcb-background-color, var(--vf-color-surface, #ffffff));
  color: var(--vcb-text-color, var(--vf-color-text, #1f232b));
  font-family: var(
    --vcb-font-family,
    var(
      --vf-font-family-mono,
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      "Liberation Mono",
      "Courier New",
      monospace
    )
  );
  font-size: var(--vcb-font-size, var(--vf-font-size-sm, 0.8125rem));
  line-height: var(--vcb-line-height, var(--vf-line-height-normal, 1.5));
}

.vcb__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vcb-header-gap, 0.75rem);
  padding: var(--vcb-header-padding, 0.55rem 0.75rem);
  border-bottom: 1px solid
    var(--vcb-header-border-color, var(--vf-color-border, #d9dde3));
}

.vcb__meta {
  display: inline-flex;
  align-items: center;
  gap: var(--vcb-meta-gap, 0.55rem);
  color: var(--vcb-meta-color, var(--vf-color-muted, #616773));
  font-size: var(--vcb-meta-font-size, var(--vf-font-size-sm, 0.75rem));
}

.vcb__filename {
  color: var(--vcb-filename-color, var(--vf-color-text, #1f232b));
  font-weight: var(
    --vcb-filename-font-weight,
    var(--vf-font-weight-semibold, 600)
  );
}

.vcb__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--vcb-actions-gap, 0.45rem);
}

.vcb__copy {
  border: 1px solid
    var(--vcb-action-border-color, var(--vf-color-border, #d9dde3));
  border-radius: var(
    --vcb-action-border-radius,
    var(--vf-radius-control-tight, 0.375rem)
  );
  background: var(
    --vcb-action-background-color,
    var(--vf-color-surface-muted, #f3f3f3)
  );
  color: var(--vcb-action-text-color, var(--vf-color-text, #1f232b));
  padding: var(
    --vcb-action-padding,
    var(--vf-button-padding-sm, 0.2rem 0.55rem)
  );
  font-size: var(--vcb-action-font-size, var(--vf-font-size-sm, 0.75rem));
}

.vcb__pre {
  margin: 0;
  padding: var(--vcb-padding, var(--vf-prose-code-block-padding, 0.75rem 0.9rem));
  overflow: auto;
  white-space: pre;
}

.vcb__pre_wrap {
  white-space: pre-wrap;
  word-break: break-word;
}

.vcb__line {
  display: flex;
  align-items: baseline;
  gap: var(--vcb-line-gap, 0.7rem);
}

.vcb__line-number {
  text-align: right;
  color: var(--vcb-line-number-color, var(--vf-color-muted, #616773));
  min-width: var(--vcb-line-number-min-width, 2.1rem);
  user-select: none;
}

.vcb__line-content {
  white-space: inherit;
}

.vcb__token_keyword {
  color: var(--vcb-token-keyword-color, var(--vf-color-help, #8553a1));
}

.vcb__token_string {
  color: var(--vcb-token-string-color, var(--vf-color-success, #2e7d32));
}

.vcb__token_number {
  color: var(--vcb-token-number-color, var(--vf-color-warn, #9f8400));
}

.vcb__token_comment {
  color: var(--vcb-token-comment-color, var(--vf-color-muted, #616773));
}

.vcb__token_variable {
  color: var(--vcb-token-variable-color, var(--vf-color-text, #1f232b));
}

.vcb__token_identifier {
  color: var(--vcb-token-identifier-color, var(--vf-color-info, #0069ba));
}

.vcb__token_function {
  color: var(--vcb-token-function-color, var(--vf-color-primary, #0e639c));
}

.vcb__token_property {
  color: var(--vcb-token-property-color, var(--vf-color-primary, #0e639c));
}

.vcb__token_operator {
  color: var(--vcb-token-operator-color, var(--vf-color-danger, #c72e39));
}

.vcb__token_tag {
  color: var(--vcb-token-tag-color, var(--vf-color-primary, #0e639c));
}

.vcb__token_selector {
  color: var(--vcb-token-selector-color, var(--vf-color-primary, #0e639c));
}

.vcb__token_component {
  color: var(--vcb-token-component-color, var(--vf-color-info, #0069ba));
}

.vcb__token_attribute {
  color: var(--vcb-token-attribute-color, var(--vf-color-help, #8553a1));
}

.vcb__token_directive {
  color: var(--vcb-token-directive-color, var(--vf-color-help, #8553a1));
}

.vcb[data-theme="dark"],
:root[data-theme="dark"] .vcb:not([data-theme="light"]),
[data-theme="dark"] .vcb:not([data-theme="light"]) {
  --vcb-background-color: var(
    --vcb-dark-background-color,
    var(--vf-color-surface, #252526)
  );
  --vcb-text-color: var(--vcb-dark-text-color, var(--vf-color-text, #d4d4d4));
  --vcb-border-color: var(
    --vcb-dark-border-color,
    var(--vf-color-border, #3c3c3c)
  );
  --vcb-header-border-color: var(
    --vcb-dark-header-border-color,
    var(--vf-color-border, #3c3c3c)
  );
  --vcb-meta-color: var(--vcb-dark-meta-color, var(--vf-color-muted, #9da0a6));
  --vcb-filename-color: var(
    --vcb-dark-filename-color,
    var(--vf-color-text, #d4d4d4)
  );
  --vcb-action-border-color: var(
    --vcb-dark-action-border-color,
    var(--vf-color-border, #3c3c3c)
  );
  --vcb-action-background-color: var(
    --vcb-dark-action-background-color,
    var(--vf-color-surface-muted, #2d2d30)
  );
  --vcb-action-text-color: var(
    --vcb-dark-action-text-color,
    var(--vf-color-text, #d4d4d4)
  );
  --vcb-line-number-color: var(
    --vcb-dark-line-number-color,
    var(--vf-color-muted, #9da0a6)
  );
  --vcb-token-keyword-color: var(
    --vcb-dark-token-keyword-color,
    var(--vf-color-help, #c586c0)
  );
  --vcb-token-string-color: var(
    --vcb-dark-token-string-color,
    var(--vf-color-success, #6a9955)
  );
  --vcb-token-number-color: var(
    --vcb-dark-token-number-color,
    var(--vf-color-warn, #d7ba7d)
  );
  --vcb-token-comment-color: var(
    --vcb-dark-token-comment-color,
    #6a9955
  );
  --vcb-token-variable-color: var(
    --vcb-dark-token-variable-color,
    var(--vf-color-text, #d4d4d4)
  );
  --vcb-token-tag-color: var(
    --vcb-dark-token-tag-color,
    var(--vf-color-primary, #569cd6)
  );
  --vcb-token-selector-color: var(
    --vcb-dark-token-selector-color,
    var(--vf-color-warn, #d7ba7d)
  );
  --vcb-token-component-color: var(
    --vcb-dark-token-component-color,
    var(--vf-color-info, #4ec9b0)
  );
  --vcb-token-attribute-color: var(
    --vcb-dark-token-attribute-color,
    #9cdcfe
  );
  --vcb-token-directive-color: var(
    --vcb-dark-token-directive-color,
    #c586c0
  );
  --vcb-token-identifier-color: var(
    --vcb-dark-token-identifier-color,
    #9cdcfe
  );
  --vcb-token-function-color: var(
    --vcb-dark-token-function-color,
    var(--vf-color-contrast, #dcdcaa)
  );
  --vcb-token-property-color: var(
    --vcb-dark-token-property-color,
    #9cdcfe
  );
  --vcb-token-operator-color: var(
    --vcb-dark-token-operator-color,
    #d4d4d4
  );
}

.vcb_disabled {
  opacity: var(--vcb-disabled-opacity, 0.6);
}
</style>
