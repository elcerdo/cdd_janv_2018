#!/usr/bin/env node

const Promise = require('bluebird')
const util = require('util')

// coroutines and promisification + some neat tricks

const ff = (xx) => {
    return 3 * xx + 10
}

ff_callback = (xx, cb) => {
    cb(null, ff(xx))
}

const ff_promise = Promise.promisify(ff_callback)

const ff_format = util.format.bind(null, 'ff(%d)=%d')
const ff_format_ = (aa, bb) => {
    return util.format('ff(%d)=%d', aa, bb)
}

const wait_til_resolve = Promise.coroutine(function*(xx) {
    console.log('sync', ff_format(xx, ff(xx)))

    const foo = yield Promise
        .delay(500)
        .then(() => {
            return 'resolved'
        })

    const bar = yield ff_promise(xx).delay(500)

    console.log('async', foo, ff_format(xx, bar))
    return xx + 1
})

wait_til_resolve(3)
    .delay(1000)
    .then(wait_til_resolve)
    .then(wait_til_resolve)
    .then((res) => {
        console.log('got_result', res)
    })
