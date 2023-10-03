import '@testing-library/jest-dom/extend-expect';

// Fix for "matchMedia not present, legacy browsers require a polyfill jest" error
function matchMedia() {
    return {
        matches: false,
        addListener() {},
        removeListener() {}
    };
}
window.matchMedia = window.matchMedia || matchMedia;
