'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};
exports.default = preview;
