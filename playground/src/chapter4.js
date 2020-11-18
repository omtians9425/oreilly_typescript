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
var log2 = function (
// Contextual typing: We don't need to annotate types here since TypeScript infers it with the above call signature.
message, userId) {
    if (userId === void 0) { userId = 'Not signed in'; }
    var time = new Date().toISOString();
    console.log(time, message, userId);
};
log2('Page loaded');
log2('User signed in', 'gj91tj');
// Contextual typing
function times(f, n) {
    for (var i = 0; i < n; i++) {
        f(i);
    }
}
times(function (n) { return console.log(n); }, 4); // We don't annotate the type of n
var reserve = function (from, toOrDestination, destination) {
    if (toOrDestination instanceof Date && destination !== undefined) {
        // accomodation trip
    }
    else if (typeof toOrDestination === 'string') {
        // day trip
    }
};
// We can model the parameters of function since it's just an object.
function warnUser(warning) {
    if (warnUser.wasCalled) {
        return;
    }
    warnUser.wasCalled = true;
    console.log(warning);
}
warnUser.wasCalled = false;
warnUser('warning');
var assignedWarnUser = warnUser; // Assignable
var filter = function (array, f) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (f(item)) {
            result.push(item);
        }
    }
    return result;
};
console.log(filter([1, 2, 3], function (_) { return _ > 2; }));
console.log(filter(['a', 'b'], function (_) { return _ !== 'b'; }));
var names = [
    { firstName: 'beth' },
    { firstName: 'caitlyn' },
    { firstName: 'xin' },
];
console.log(filter(names, function (_) { return _.firstName.startsWith('b'); }));
var filter2 = function (array, f) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (f(item)) {
            result.push(item);
        }
    }
    return result;
};
// Implement map with generics
function map(array, f) {
    var result = [];
    array.forEach(function (element) {
        result.push(f(element));
    });
    return result;
}
console.log(map([1, 2, 3], function (_) { return _ * 2; }));
