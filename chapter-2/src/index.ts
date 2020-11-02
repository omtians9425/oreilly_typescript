console.log('Hello TypeScript!')

let a = 1 + 2
let b = a + 3
let c = {
    apple: a,
    bannana: b
}
let d = c.apple * 4

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