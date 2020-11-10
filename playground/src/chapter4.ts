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