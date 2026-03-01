import type { App, Plugin } from "vue";
import CodeBlock from "./components/CodeBlock.vue";

export { default as CodeBlock } from "./components/CodeBlock.vue";
export {
  escapeCodeHtml,
  highlightCodeBlock,
  highlightCodeLine,
} from "./services/code-highlight";
export {
  SUPPORTED_CODE_BLOCK_LANGUAGES,
  type CodeBlockCopyPayload,
  type CodeBlockLanguage,
  type CodeBlockProps,
  type CodeBlockTheme,
  type SupportedCodeBlockLanguage,
} from "./types";

const plugin: Plugin = {
  install(app: App) {
    app.component("CodeBlock", CodeBlock);
    app.component("VueCodeBlock", CodeBlock);
  },
};

export default plugin;
