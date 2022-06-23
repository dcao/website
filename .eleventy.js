module.exports = config => {
    config.addPassthroughCopy('css')
    return {
        passthroughFileCopy: true
    }
};
