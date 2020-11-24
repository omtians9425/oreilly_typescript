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