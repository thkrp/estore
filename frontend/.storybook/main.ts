import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    'stories': ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        'storybook-addon-react-router-v6'
    ],
    'framework': {
        'name': '@storybook/react-webpack5',
        'options': {}
    },
    'docs': {
        'autodocs': 'tag'
    },
    'staticDirs': ['..\\public', 'images'],
    webpackFinal: config => {
        return {
            ...config,
            plugins: config.plugins.filter(plugin => {
                return plugin.constructor.name !== 'ESLintWebpackPlugin';
            }),
        }
    }
};
export default config;
