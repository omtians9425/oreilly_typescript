/**
 * Class and Interface
 */

type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
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
        file: File,
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
        private file: File,
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
        throw new Error('Not Implemented')
    }

    add(value: number): this { // 'this' as a return type. Convenient for builder pattern.
        throw new Error('Not Implemented')
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