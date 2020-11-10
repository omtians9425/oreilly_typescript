/**
 * Chapter 3 Type
 */

let e: true = true // literal type
const num: number = 100 // not literal type
const num1 = 100 // literal type

let oneMillion = 1_000_000

// bigint type
let bigint = 100n

// symbol type
const hoge: unique symbol = Symbol('a') // unique symbol: 'type of hoge'
const hoge1 = hoge // symbol
// const hoge2: unique symbol = hoge // cannot compile: type of hoge is not assignable to type of hoge2
console.log(hoge == hoge1)

// object type
let object: object = {
    a: 'x'
}
let objectLiteral = {
    a: 'x'
}

let f = {
    firstName: 'john',
    lastName: 'barrowman'
}

class Person {
    constructor(
        public firstName: string,
        public lastName: string
    ) { }
}

f = new Person('matt', 'smith') // Structual (Duck) typing

let obj: {
    b: number
    c?: string, // undefined is OK
    [key: number]: boolean // index signature
}

obj = { b: 10 }
obj = { b: 1, c: undefined }
obj = { b: 1, c: 'd' }
obj = { b: 1, 10: true, 3150: false }

// index signature
let airplaneSeatingAssignments: {
    [seatNumber: string]: string // We can use any word for the key name
} = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates',
}

let user: {
    readonly firstName: string
} = {
    firstName: 'abby'
}

// Type alias
type Age = number
type Person1 = {
    name: string,
    age: Age
}

// Union and Intersection
type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

let union: CatOrDogOrBoth = {
    name: 'Bonkers',
    purrs: true,
    barks: true,
    wags: true
}

let intersection: CatAndDog = {
    name: 'Domino',
    barks: true,
    purrs: true,
    wags: true
}

// array and casting
let arr = [1, 'a'] // (number | string)[]
arr.map(_ => {
    if (typeof _ === 'number') {
        return _ * 3
    }
    return _.toUpperCase()
})