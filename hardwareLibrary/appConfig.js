module.exports = {
    mongoModule: {'url': 'mongodb://localhost:27017/ozuRobotikPlatform'},
    x: 5,
    add2: function(num) {
        return sum(TWO, num);
    },
    addX: function(num) {
        return sum(module.exports.x, num);
    }
}

