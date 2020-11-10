"use strict";
/**
 * Chapter2
 */
console.log('Hello TypeScript!');
let a = 1 + 2;
let b = a + 3;
let c = {
    apple: a,
    bannana: b
};
let d = c.apple * 4;
/**
 * Chapter 3
 */
let e = true; // literal type
const num = 100; // not literal type
const num1 = 100; // literal type
let oneMillion = 1000000;
// bigint type
let bigint = 100n;
// symbol type
const hoge = Symbol('a'); // unique symbol: 'type of hoge'
const hoge1 = hoge; // symbol
// const hoge2: unique symbol = hoge // cannot compile: type of hoge is not assignable to type of hoge2
console.log(hoge == hoge1);
// object type
let object = {
    a: 'x'
};
let objectLiteral = {
    a: 'x'
};
let f = {
    firstName: 'john',
    lastName: 'barrowman'
};
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
f = new Person('matt', 'smith'); // Structual (Duck) typing
let obj;
obj = { b: 10 };
obj = { b: 1, c: undefined };
obj = { b: 1, c: 'd' };
obj = { b: 1, 10: true, 3150: false };
// index signature
let airplaneSeatingAssignments = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates',
};
let user = {
    firstName: 'abby'
};
let union = {
    name: 'Bonkers',
    purrs: true,
    barks: true,
    wags: true
};
let intersection = {
    name: 'Domino',
    barks: true,
    purrs: true,
    wags: true
};
// array and casting
let arr = [1, 'a']; // (number | string)[]
arr.map(_ => {
    if (typeof _ === 'number') {
        return _ * 3;
    }
    return _.toUpperCase();
});
/**
 * Chapter 4 Function
 */
function greet(name) {
    return 'hello ' + name;
}
let greet2 = function (name) {
    return 'hello ' + name;
};
let greet3 = (name) => {
    return 'hello ' + name;
};
let greet4 = (name) => 'hello ' + name;
let greet5 = new Function('name', 'return "hello " + name');
// option parameter
function log(message, userId) {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId || 'Not signed in');
}
//# sourceMappingURL=index.js.map