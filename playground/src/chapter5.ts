/**
 * Class and Interface
 */

type Color = 'Black' | 'White'
type File1 = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [
            new King('White', 'E', 1),
            new King('Black', 'E', 8),
        ]
    }
}

abstract class Piece {
    protected position: Position

    constructor(
        private readonly color: Color,
        file: File1,
        rank: Rank
    ) {
        this.position = new Position(file, rank)
    }

    moveTo(position: Position) {
        this.position = position
    }
    abstract canMoveTo(position: Position): boolean
}

class Position {
    constructor(
        private file: File1,
        private rank: Rank
    ) { }

    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
}

class King extends Piece {
    canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2
    }
}

class Set1 {
    has(value: number): boolean {
        return true // tmp
    }

    add(value: number): this { // 'this' as a return type. Convenient for builder pattern.
        return this // tmp
    }
}

class MutableSet1 extends Set1 { }

let set1 = new MutableSet1()
let set2 = set1.add(1) // type is `MutableSet1`

/**
 * Interface and type alias
 */
type Food = {
    calories: number
    tasty: boolean
}
type Sushi = Food & {
    salty: boolean
}

interface Food1 {
    calories: number
    tasty: boolean
}
interface Sushi1 extends Food1 {
    salty: boolean
}

// diff1: interface cannot define below aliases (use type operator)
type A = number
type B = A | string

// diff2: interface checks assignability for extended interfaces
interface C {
    good(x: number): string
    bad(x: number): string
}
interface D extends C {
    good(x: number | string): string
    // bad(x: string): string // Not Compilable: Type 'number' is not assignable to type 'string'.ts(2430)
}

type C1 = {
    good(x: number): string
    bad(x: number): string
}
type C2 = C1 & {
    good(x: number | string): string
    bad(x: string): string // Compilable
}

let c1: C1 = {
    good(x: number): string {
        return ''
    },
    bad(x: number): string {
        return ''
    }
}

let c2: C2 = {
    good(x: number): string {
        return ''
    },
    bad(x: number | string): string { // Overloaded signature is created
        return ''
    },
}

// diff3: interface is mergeable
interface User {
    name: string
}
interface User {
    age: number
}
let user1: User = {
    name: 'name',
    age: 1
}

// Typescript is nominal typing for class which has private or protected fields.
class AA {
    private x = 1
}
class BB extends AA { }
function takeAA(aa: AA) { }

takeAA(new AA)
takeAA(new BB)
// takeAA({x: 1}) // Not compilable

class G {
    constructor(
        protected hoge: number,
        huga: string
    ) { }

    f() {
        console.log(this.hoge)
        // console.log(this.fuga) // not compilable: only private and protected assigns value as property.
    }
}

let g: G = new G(1, 'huga')
g.f()

// Generics
class MyMap<K, V> {
    constructor(initialKey: K, initialValue: V) {
        // ...
    }
    get(key: K) {
        // ...
    }
    set(value: V): void {
        // ...
    }
    merge<K1, V1>(map: MyMap<K, V>): MyMap<K | K1, V | V1> {
        return this
    }
    static of<K, V>(k: K, v: V): MyMap<K, V> {
        return new MyMap(k, v)
    }
}
let myMap1 = new MyMap<string, number>('k', 1)
let myMap2 = new MyMap('k', true)

/**
 * Mixin
 */
// Constructor expresses "Type"
type ClassConstructor<T> = new (...args: any[]) => T

// Mixin
function withEZDebug<C extends ClassConstructor<{
    getDebugValue(): object
}>>(Class: C) {
    return class extends Class {
        // Optional since this constructor doesn't have additional logic
        constructor(...args: any[]) {
            super(...args)
        }

        debug() {
            let Name = this.constructor.name
            let value = this.getDebugValue()
            return Name + '(' + JSON.stringify(value) + ')'
        }
    }
}

// Target Class which takes mixin
class HardToDebugUser {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) { }

    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName
        }
    }
}

// Create new class with mixin
let User = withEZDebug(HardToDebugUser)
let user2 = new User(3, 'Emma', 'Gluzman')
user2.debug()

/**
 * Design pattern
 */

// Factory pattern
// Namespace as a type
interface Shoe {
    purpose: string
}

class BalletFlat implements Shoe {
    purpose = 'dancing'
}

class Boot implements Shoe {
    purpose = 'woodcutting'
}

class Sneaker implements Shoe {
    purpose = 'walking'
}

// Factory: Namespace as a value
let Shoe = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
        switch (type) {
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
        }
    }
}

let shoe = Shoe.create('boot') // inferred type: Shoe

// Excercise 3. Safer Shoe (More safe factory pattern)
// Define overload
type ShoeCreator = {
    create(type: 'balletFlat'): BalletFlat
    create(type: 'boot'): Boot
    create(type: 'sneaker'): Sneaker
}

let SafeShoe: ShoeCreator = {
    // Implement overload
    create(type: 'balletFlat' | 'boot' | 'sneaker') {
        switch (type) {
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
        }
    }
}

let safeShoe = SafeShoe.create('sneaker') // inferred type: Sneaker

// Builder pattern
class RequestBuilder {

    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null

    setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }
    setData(data: object): this {
        this.data = this.data
        return this
    }
    setURL(url: string): this {
        this.url = url
        return this
    }

    send() {
        // ...
    }
}

new RequestBuilder()
    .setURL('/url')
    .setMethod('get')
    .setData({ data: 'hoge' })
    .send()

// Excecise 4.b: safe order builder pattern
interface BuildableRequest {
    data?: object
    method: 'get' | 'post'
    url: string
}

class SafeOrderRequestBuilder {
    data?: object
    method?: 'get' | 'post'
    url?: string

    setData(data: object): this & Pick<BuildableRequest, 'data'> {
        return Object.assign(this, { data }) // assign returns union type: this & {data: object}
    }

    setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
        return Object.assign(this, { method })
    }

    setUrl(url: string): this & Pick<BuildableRequest, 'url'> {
        return Object.assign(this, { url })
    }

    build(this: BuildableRequest) {
        return this
    }
}

let builder = new SafeOrderRequestBuilder()
    .setData({})
    .setMethod('get')
    .setUrl('')
    .build()