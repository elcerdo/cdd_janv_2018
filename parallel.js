#!/usr/bin/env node

const Promise = require('bluebird')
const util = require('util')

const delayedTask = (nn, str) => {
    const logger = console.log.bind(null, 'delayed_task')
    return Promise
        .delay(nn)
        .return(str)
        .tap(logger)
}

const main = Promise.coroutine(function*() {
    const aa = yield delayedTask(1000, 'coucou')
    console.log('single_task', aa)

    const bb = yield Promise
        .resolve([
            delayedTask(1000, 'slow'),
            delayedTask(500, 'fast'),
            delayedTask(750, 'medium'),
        ])
        .all()
        .tap(console.log)
        .tap((foo) => {
            console.log(foo.length)
        })
        .spread((first, second, third) => {
            return util.format('%s -> %s -> %s',
                first,
                second,
                third)
        })
    console.log('spread', bb)

    const cc = yield Promise
        .resolve({
            first: delayedTask(1000, 'slow'),
            second: delayedTask(500, 'fast'),
            third: delayedTask(750, 'medium'),
        })
        .props()
        .tap(console.log)
        .then((result) => {
            return util.format('%s -> %s -> %s',
                result.first,
                result.second,
                result.third)
        })
    console.log('props', cc)

})

main()
