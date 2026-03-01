<!-- eslint-disable vue/no-v-html -->
<template>
  <section
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
import { computed, onBeforeUnmount, ref } from "vue";
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
let copiedTimer: ReturnType<typeof setTimeout> | null = null;

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
  props.theme === "inherit" ? undefined : props.theme,
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

onBeforeUnmount(() => {
  if (copiedTimer) {
    clearTimeout(copiedTimer);
    copiedTimer = null;
  }
});
</script>

<style lang="scss">
.vcb {
  display: grid;
  gap: var(--vcb-gap, 0);
  border: 1px solid var(--vcb-border-color, #cbd5e1);
  border-radius: var(--vcb-border-radius, 0.625rem);
  background: var(--vcb-background-color, #f8fbff);
  color: var(--vcb-text-color, #0f172a);
  font-family: var(
    --vcb-font-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    "Liberation Mono",
    "Courier New",
    monospace
  );
  font-size: var(--vcb-font-size, 0.8125rem);
  line-height: var(--vcb-line-height, 1.5);
}

.vcb__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vcb-header-gap, 0.75rem);
  padding: var(--vcb-header-padding, 0.55rem 0.75rem);
  border-bottom: 1px solid
    var(--vcb-header-border-color, rgba(148, 163, 184, 0.28));
}

.vcb__meta {
  display: inline-flex;
  align-items: center;
  gap: var(--vcb-meta-gap, 0.55rem);
  color: var(--vcb-meta-color, #475569);
  font-size: var(--vcb-meta-font-size, 0.75rem);
}

.vcb__filename {
  color: var(--vcb-filename-color, #0f172a);
  font-weight: var(--vcb-filename-font-weight, 600);
}

.vcb__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--vcb-actions-gap, 0.45rem);
}

.vcb__copy {
  border: 1px solid
    var(--vcb-action-border-color, rgba(148, 163, 184, 0.38));
  border-radius: var(--vcb-action-border-radius, 0.375rem);
  background: var(--vcb-action-background-color, #ffffff);
  color: var(--vcb-action-text-color, #0f172a);
  padding: var(--vcb-action-padding, 0.2rem 0.55rem);
  font-size: var(--vcb-action-font-size, 0.75rem);
}

.vcb__pre {
  margin: 0;
  padding: var(--vcb-padding, 0.75rem 0.9rem);
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
  color: var(--vcb-line-number-color, #64748b);
  min-width: var(--vcb-line-number-min-width, 2.1rem);
  user-select: none;
}

.vcb__line-content {
  white-space: inherit;
}

.vcb__token_keyword {
  color: var(--vcb-token-keyword-color, #8b2fc9);
}

.vcb__token_string {
  color: var(--vcb-token-string-color, #0f7b45);
}

.vcb__token_number {
  color: var(--vcb-token-number-color, #c2410c);
}

.vcb__token_comment {
  color: var(--vcb-token-comment-color, #64748b);
}

.vcb__token_variable {
  color: var(--vcb-token-variable-color, #0f4c81);
}

.vcb__token_identifier {
  color: var(--vcb-token-identifier-color, #0369a1);
}

.vcb__token_function {
  color: var(--vcb-token-function-color, #1d4ed8);
}

.vcb__token_property {
  color: var(--vcb-token-property-color, #6d28d9);
}

.vcb__token_operator {
  color: var(--vcb-token-operator-color, #be185d);
}

.vcb__token_tag {
  color: var(--vcb-token-tag-color, #0f4c81);
}

.vcb__token_selector {
  color: var(--vcb-token-selector-color, #0f4c81);
}

.vcb__token_component {
  color: var(--vcb-token-component-color, #0369a1);
}

.vcb__token_attribute {
  color: var(--vcb-token-attribute-color, #7c3aed);
}

.vcb__token_directive {
  color: var(--vcb-token-directive-color, #a21caf);
}

.vcb[data-theme="dark"],
:root[data-theme="dark"] .vcb:not([data-theme="light"]),
[data-theme="dark"] .vcb:not([data-theme="light"]) {
  --vcb-background-color: var(
    --vcb-dark-background-color,
    #0a1425
  );
  --vcb-text-color: var(--vcb-dark-text-color, #e2e8f0);
  --vcb-border-color: var(
    --vcb-dark-border-color,
    rgba(148, 163, 184, 0.35)
  );
  --vcb-header-border-color: var(
    --vcb-dark-header-border-color,
    rgba(148, 163, 184, 0.35)
  );
  --vcb-meta-color: var(--vcb-dark-meta-color, #93a4bf);
  --vcb-filename-color: var(
    --vcb-dark-filename-color,
    #e2e8f0
  );
  --vcb-action-border-color: var(
    --vcb-dark-action-border-color,
    rgba(148, 163, 184, 0.45)
  );
  --vcb-action-background-color: var(
    --vcb-dark-action-background-color,
    rgba(15, 23, 42, 0.7)
  );
  --vcb-action-text-color: var(
    --vcb-dark-action-text-color,
    #e2e8f0
  );
  --vcb-line-number-color: var(
    --vcb-dark-line-number-color,
    #64748b
  );
  --vcb-token-keyword-color: var(
    --vcb-dark-token-keyword-color,
    #c084fc
  );
  --vcb-token-string-color: var(
    --vcb-dark-token-string-color,
    #86efac
  );
  --vcb-token-number-color: var(
    --vcb-dark-token-number-color,
    #fca5a5
  );
  --vcb-token-comment-color: var(
    --vcb-dark-token-comment-color,
    #94a3b8
  );
  --vcb-token-variable-color: var(
    --vcb-dark-token-variable-color,
    #bfdbfe
  );
  --vcb-token-tag-color: var(
    --vcb-dark-token-tag-color,
    #93c5fd
  );
  --vcb-token-selector-color: var(
    --vcb-dark-token-selector-color,
    #93c5fd
  );
  --vcb-token-component-color: var(
    --vcb-dark-token-component-color,
    #67e8f9
  );
  --vcb-token-attribute-color: var(
    --vcb-dark-token-attribute-color,
    #c4b5fd
  );
  --vcb-token-directive-color: var(
    --vcb-dark-token-directive-color,
    #f0abfc
  );
  --vcb-token-identifier-color: var(
    --vcb-dark-token-identifier-color,
    #7dd3fc
  );
  --vcb-token-function-color: var(
    --vcb-dark-token-function-color,
    #93c5fd
  );
  --vcb-token-property-color: var(
    --vcb-dark-token-property-color,
    #a5b4fc
  );
  --vcb-token-operator-color: var(
    --vcb-dark-token-operator-color,
    #f0abfc
  );
}

.vcb_disabled {
  opacity: var(--vcb-disabled-opacity, 0.6);
}
</style>
