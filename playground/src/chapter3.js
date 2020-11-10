/**
 * Chapter 3
 */
var e = true; // literal type
var num = 100; // not literal type
var num1 = 100; // literal type
var oneMillion = 1000000;
// bigint type
var bigint = 100n;
// symbol type
var hoge = Symbol('a'); // unique symbol: 'type of hoge'
var hoge1 = hoge; // symbol
// const hoge2: unique symbol = hoge // cannot compile: type of hoge is not assignable to type of hoge2
console.log(hoge == hoge1);
// object type
var object = {
    a: 'x'
};
var objectLiteral = {
    a: 'x'
};
var f = {
    firstName: 'john',
    lastName: 'barrowman'
};
var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person;
}());
f = new Person('matt', 'smith'); // Structual (Duck) typing
var obj;
obj = { b: 10 };
obj = { b: 1, c: undefined };
obj = { b: 1, c: 'd' };
obj = { b: 1, 10: true, 3150: false };
// index signature
var airplaneSeatingAssignments = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates'
};
var user = {
    firstName: 'abby'
};
var union = {
    name: 'Bonkers',
    purrs: true,
    barks: true,
    wags: true
};
var intersection = {
    name: 'Domino',
    barks: true,
    purrs: true,
    wags: true
};
// array and casting
var arr = [1, 'a']; // (number | string)[]
arr.map(function (_) {
    if (typeof _ === 'number') {
        return _ * 3;
    }
    return _.toUpperCase();
});
