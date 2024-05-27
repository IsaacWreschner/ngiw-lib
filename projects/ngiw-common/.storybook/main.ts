import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: ["../core-ui/src/**/*.mdx", "../core-ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
};
export default config;
