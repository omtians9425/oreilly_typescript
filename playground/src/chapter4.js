/**
 * Chapter 4 Function
 */
function greet(name) {
    return 'hello ' + name;
}
var greet2 = function (name) {
    return 'hello ' + name;
};
var greet3 = function (name) {
    return 'hello ' + name;
};
var greet4 = function (name) { return 'hello ' + name; };
var greet5 = new Function('name', 'return "hello " + name');
// option parameter
function log(message, userId) {
    var time = new Date().toLocaleDateString();
    console.log(time, message, userId || 'Not signed in');
}
log('Page loaded');
log('User signed in', 'gj91tj');
// default parameter
function log1(message, userId) {
    if (userId === void 0) { userId = 'Not signed in'; }
    var time = new Date().toISOString();
    console.log(time, message, userId);
}
log1('Page loaded');
log1('User signed in', 'gj91tj');
// rest parameter: Function can have one rest parameter at the end of argument
function sumVariadicSafe(hoge) {
    if (hoge === void 0) { hoge = 'hoge'; }
    var numbers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        numbers[_i - 1] = arguments[_i];
    }
    console.log(hoge);
    return numbers.reduce(function (total, n) { return total + n; }, 0);
}
console.log(sumVariadicSafe('hoge', 1, 5, 3));
