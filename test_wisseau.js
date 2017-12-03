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

    const aa = yield Promise
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

    const bb = yield Promise.resolve("coucou")
    console.log('bb', bb)

    const cc = yield Promise.delay(1000).return("hello")
    console.log('cc', cc)

    const dd = yield Promise.try(() => {
            throw new Error('monde')
            return "world";
        })
        .delay(10000)
        .catch((err) => {
            console.log("!#?!")
            return err.message
        })
    console.log('dd', dd)

    return
})

const log_sep = console.log.bind(null, "================================")

main('mark')
    .then(() => {
        log_sep()
        return 'susan'
    })
    .tap(console.log)
    .then(main)
    .then(log_sep)
    .return('jean-paul')
    .tap(console.log)
    .then(main)
