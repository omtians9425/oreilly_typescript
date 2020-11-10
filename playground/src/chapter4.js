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
