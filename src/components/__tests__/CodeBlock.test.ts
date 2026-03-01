import { mount } from "@vue/test-utils";
import { vi } from "vitest";
import CodeBlock from "../CodeBlock.vue";

describe("CodeBlock", () => {
  it("renders highlighted TypeScript content and line numbers", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        language: "ts",
        code: "const value = 42;\nreturn value;",
        showLineNumbers: true,
      },
    });

    expect(wrapper.findAll(".vcb__line-number")).toHaveLength(2);
    expect(wrapper.html()).toContain("vcb__token_keyword");
    expect(wrapper.html()).toContain("vcb__token_number");
  });

  it("highlights Vue directives and expressions", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        language: "vue",
        code: `<Form
    v-model="values"
    :validate="validateForm"
    @submit-success="onSubmitSuccess"
>
    <template #default="{ values, setFieldValue }">
        <Input @update:model-value="v => setFieldValue('email', v)" />
    </template>
</Form>`,
        showHeader: false,
        copyable: false,
      },
    });

    expect(wrapper.html()).toContain("vcb__token_directive");
    expect(wrapper.html()).toContain("vcb__token_operator");
    expect(wrapper.html()).toContain("vcb__token_function");
    expect(wrapper.html()).toContain("vcb__token_variable");
  });

  it("highlights CSS selectors, properties, values, and numbers", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        language: "css",
        code: `/* app.css */
:root {
    --app-page-padding: 1rem;
}

body {
    margin: 0;
    font-family:
        ui-sans-serif,
        system-ui,
        sans-serif;
}`,
        showHeader: false,
        copyable: false,
      },
    });

    expect(wrapper.html()).toContain("vcb__token_comment");
    expect(wrapper.html()).toContain("vcb__token_selector");
    expect(wrapper.html()).toContain("vcb__token_property");
    expect(wrapper.html()).toContain("vcb__token_number");
    expect(wrapper.html()).toContain("vcb__token_variable");
  });

  it("highlights npm run scripts in bash blocks", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        language: "bash",
        code: "npm run verify:bundle-size",
        showHeader: false,
        copyable: false,
      },
    });

    expect(wrapper.html()).toContain("vcb__token_keyword");
    expect(wrapper.html()).toContain("vcb__token_function");
    expect(wrapper.html()).toContain("vcb__token_variable");
  });

  it("highlights npm install subcommands and scoped packages in bash blocks", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        language: "bash",
        code: "npm i @codemonster-ru/vueforge",
        showHeader: false,
        copyable: false,
      },
    });

    expect(wrapper.html()).toContain("vcb__token_keyword");
    expect(wrapper.html()).toContain("vcb__token_function");
    expect(wrapper.html()).toContain("vcb__token_string");
  });

  it("emits copy with raw code payload", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    const wrapper = mount(CodeBlock, {
      props: {
        code: "const demo = true;",
      },
    });

    await wrapper.get(".vcb__copy").trigger("click");

    expect(writeText).toHaveBeenCalledWith("const demo = true;");
    expect(wrapper.emitted("copy")).toEqual([[{ text: "const demo = true;" }]]);

    vi.unstubAllGlobals();
  });

  it("applies explicit dark theme marker on the root element", () => {
    const wrapper = mount(CodeBlock, {
      props: {
        code: "const demo = true;",
        theme: "dark",
      },
    });

    expect(wrapper.attributes("data-theme")).toBe("dark");
  });
});
