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