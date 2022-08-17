module.exports = {
    easeOutQuad: (x) => {
        return 1 - (1 - x) * (1 - x);
    },
    easeOutSine: (x) => {
        return Math.sin((x * Math.PI) / 2);
    },
};