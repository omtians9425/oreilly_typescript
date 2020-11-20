/**
 * Chapter 4 Function
 */

function greet(name: string) {
    return 'hello ' + name
}

let greet2 = function (name: string) {
    return 'hello ' + name
}

let greet3 = (name: string) => {
    return 'hello ' + name
}

let greet4 = (name: string) => 'hello ' + name

let greet5 = new Function('name', 'return "hello " + name')

// option parameter
function log(message: string, userId?: string) {
    let time = new Date().toLocaleDateString()
    console.log(time, message, userId || 'Not signed in')
}
log('Page loaded')
log('User signed in', 'gj91tj')

// default parameter
function log1(message: string, userId = 'Not signed in') {
    let time = new Date().toISOString()
    console.log(time, message, userId)
}
log1('Page loaded')
log1('User signed in', 'gj91tj')

// rest parameter: Function can have one rest parameter at the end of argument
function sumVariadicSafe(hoge = 'hoge', ...numbers: number[]): number {
    console.log(hoge)
    return numbers.reduce((total, n) => total + n, 0)
}
console.log(sumVariadicSafe('hoge', 1, 5, 3))

// Call signature (Type signature)
type Log = (message: string, userId?: string) => void
// The same as the above
type Log1 = {
    (message: string, userId?: string): void
}

let log2: Log = (
    // Contextual typing: We don't need to annotate types here since TypeScript infers it with the above call signature.
    message,
    userId = 'Not signed in',
) => { // returned type is unnecessary
    let time = new Date().toISOString()
    console.log(time, message, userId)
}
log2('Page loaded')
log2('User signed in', 'gj91tj')

// Contextual typing
function times(
    f: (index: number) => void,
    n: number
) {
    for (let i = 0; i < n; i++) {
        f(i)
    }
}
times(n => console.log(n), 4) // We don't annotate the type of n

// overload
type Reserve = {
    (from: Date, to: Date, destination: string): void
    (from: Date, destination: string): void
}

let reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
) => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        // accomodation trip
    } else if (typeof toOrDestination === 'string') {
        // day trip
    }
}

// We can model the parameters of function since it's just an object.
function warnUser(warning: string) {
    if (warnUser.wasCalled) {
        return
    }
    warnUser.wasCalled = true
    console.log(warning)
}
warnUser.wasCalled = false

warnUser('warning')

type WarnUser = {
    (warning: string): void, // function type
    wasCalled: boolean // parameter type
}

const assignedWarnUser: WarnUser = warnUser // Assignable

/**
 * Generics
 */

type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[] // Call site bind of generic
}

let filter: Filter = (array, f) => {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (f(item)) {
            result.push(item)
        }
    }
    return result
}
console.log(filter([1, 2, 3], _ => _ > 2))
console.log(filter(['a', 'b'], _ => _ !== 'b'))

let names = [
    { firstName: 'beth' },
    { firstName: 'caitlyn' },
    { firstName: 'xin' },
]
console.log(filter(names, _ => _.firstName.startsWith('b')))

// Declare site bind of generic; Genelic type aliases (see below)
type Filter2<T> = {
    (array: T[], f: (item: T) => boolean): T[]
}
let filter2: Filter2<number> = (array, f) => {
    let result = []
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (f(item)) {
            result.push(item)
        }
    }
    return result
}

// Implement map with generics
function map<T, U>(array: T[], f: (item: T) => U): U[] {
    let result: U[] = []
    array.forEach(element => {
        result.push(f(element))
    })
    return result
}

console.log(map([1, 2, 3], _ => _ * 2))
console.log(map<string, boolean>(['a', 'b', 'c'], _ => _ === 'a')) // Annotate explicitly

let promise = new Promise<number>(resolve =>
    resolve(45)
)
promise.then(result =>
    result * 4
)

// Generic type Aliases
type MyEvent<T> = {
    target: T
    type: string
}

type StringEvent = MyEvent<string>
type TimedEvent<T> = {
    event: MyEvent<T>,
    from: Date,
    to: Date
}

/**
 * Generic constraints
 */

type TreeNode = {
    value: string
}
type LeafNode = TreeNode & {
    isLeaf: true
}
type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode]
}

function mapNode<T extends TreeNode>(
    node: T,
    f: (value: string) => string
): T {
    return {
        ...node,
        value: f(node.value) // Overwrite a spread field,
    }
}

let node1: TreeNode = { value: 'hoge' }
let node2: LeafNode = { value: 'hoge1', isLeaf: true, }
let node3: InnerNode = { value: 'hoge2', children: [node2] }

console.log(mapNode(node1, _ => _.toUpperCase()))
console.log(mapNode(node2, _ => _.toUpperCase()))
console.log(mapNode(node3, _ => _.toUpperCase()))


/**
 * Excercise
 */

// 3
type Reserve1 = {
    (from: Date, to: Date, destination: string): void
    (from: Date, destination: string): void
    (destination: string): void
}

let reserve1: Reserve1 = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    if (typeof fromOrDestination === 'string' && toOrDestination == undefined) {
        console.log('only destination')
    }
    else if (toOrDestination instanceof Date && destination !== undefined) {
        console.log('accomodation trip')
    } else if (typeof toOrDestination === 'string') {
        console.log('day trip')
    }
}

reserve1('dest')
reserve1(new Date(), 'day')
reserve1(new Date(), new Date(), 'acommo')

// Array, varargs, tupples
let vararg = (...numbers: number[]) => [...numbers]
let tupple3 = (numbers: [number, number, number]) => [...numbers]
let tupple4 = (numbers: [number, number, number, number]) => [...numbers]
let array = (numbers: number[]) => [...numbers]

console.log(vararg(1, 2, 3))
console.log(tupple3([1, 2, 3]))
console.log(tupple4([1, 2, 3, 4]))
console.log(array([1, 2, 3]))

// 5
function is<T>(item1: T, ...items: T[]): boolean {
    return items.every(v => v === item1)
}

console.log(is(1, 2))
console.log(is('1', '1'))
console.log(is(false, true))

console.log(is(1, 2, 3))
console.log(is(1, 1, 1, 1))

console.log(is(1))