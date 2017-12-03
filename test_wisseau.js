#!/usr/bin/env node

const Promise = require('bluebird')

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

const main = Promise.coroutine(function*(name) {
    const hello = new Hello(name)
    hello.sayOh()
    hello.sayHi()

    let aa = yield Promise
        .delay(1000)
        .then(() => {
            hello.sayOh()
        })
        .delay(1000)
        .then(() => {
            hello.sayHi()
            return "tommy FTW"
        })
    console.log('aa', aa)

    let bb = yield Promise.resolve("coucou")
    console.log('bb', bb)
})

main('mark')
    .then(() => {
        console.log("================================")
        return 'susan'
    })
    .then(main)
    .then(() => {
        console.log("================================")
    })
    .return('jean-paul')
    .then(main)
