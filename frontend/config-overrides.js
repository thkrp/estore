module.exports = function override(config, _) {
    config.resolve.alias = {
        ...config.resolve.alias,
       '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
}