/**
 * Chapter 6. Advanced types
 */

// Typescript has covariance
type ExistingUser = {
    id: number
    name: string
}

type NewUser = {
    name: string
}

function deleteUser(user: { id?: number, name: string }) {
    delete user.id
}

let existingUser: ExistingUser = {
    id: 12345,
    name: 'Ima User'
}

deleteUser(existingUser)
console.log(existingUser.id) // NOTE: undefined but inferred as 'number' by TypeScript

// Contravariance is not allowed default
type LegacyUser = {
    id?: number | string
    name: string
}

let legacyUser: LegacyUser = {
    id: '79331',
    name: 'Xin Yang'
}

// deleteUser(legacyUser) // Not compilable

/**
 * BUT: function is contravariant
 * function A is subtype of function B -> parameters and this are contravariant, returned type is covariant
 */
class Animal { }
class Bird extends Animal {
    chirp() { }
}
class Crow extends Bird {
    caw() { }
}
// 'b' is contravariant, retured type of block is covariant
function clone(block: (b: Bird) => Bird): void {
    let parent = new Bird
    let babyBird = block(parent)
    babyBird.chirp()
}

function animalToBird(animal: Animal): Bird {
    return new Bird // tmp
}
function crowToBird(crow: Crow): Bird {
    return new Bird // tmp
}
function animalToAnimal(animal: Animal): Animal {
    return new Animal // tmp
}
function animalToCrow(animal: Animal): Crow {
    return new Crow // tmp
}

clone(animalToBird)
// clone(crowToBird) // Not compilable because argument is subtype
// clone(animalToAnimal) // Not compilable because returned type is supertype
clone(animalToCrow)

