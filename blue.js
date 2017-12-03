#!/usr/bin/env node

const Promise = require('bluebird')

const wait_til_resolve = Promise.coroutine(function*() {
    const foo = yield Promise
        .delay(1000)
        .then(() => {
            return 'ping_hi'
        })

    console.log('resolved', foo)
    return foo
})

wait_til_resolve()
    .delay(1000)
    .then(wait_til_resolve)
    .then((res) => {
        console.log('got_result', res)
    })
