const { series } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps linkShared',
        linkShared: {
            script: series(
                'cd shared && npm link',
                'npm i',
                'cd ../backend && npm link "app-shared"',
                'cd ../frontend && npm link "app-shared"'
            ),
            description: 'Links shared lib into frontend and backend'
        }
    }
};
