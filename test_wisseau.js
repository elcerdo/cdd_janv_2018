#!/usr/bin/env node

const Promise = require('bluebird')

//TODO not working
class Hello {
    constructor(name_) {
        this.name = name_;
    }
    sayOh() {
        console.log('oh,')
    }
    sayHi() {
        console.log('hi ' + this.name + ' !!!!')
    }
}

Promise.promisifyAll(Hello.prototype)
const hello = new Hello('mark')
hello.sayOh()
hello.sayHi()

let aa = Promise
    .delay(1000)
    .then(() => {
        hello.sayOh()
    })
    .delay(1000)
    .then(() => {
        hello.sayHi()
        return "tommy FTW"
    })
