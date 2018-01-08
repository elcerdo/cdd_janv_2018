#!/usr/bin/env node

const Promise = require('bluebird')
// Promise.config({
//     // Enable warnings
//     warnings: true,
//     // Enable long stack traces
//     longStackTraces: true,
//     // Enable cancellation
//     cancellation: true,
//     // Enable monitoring
//     monitoring: true
// })

const util = require('util')

const delayedTask = (nn, str) => {
    const logger = console.log.bind(null, 'delayed_task')
    return Promise
        .delay(nn)
        .return(str)
        .tap(logger)
}

const failingTask = (nn) => {
    const logger = console.log.bind(null, 'failing_task')
    return Promise
        .delay(nn)
        .then(() => {
            console.log('failing')
            return Promise.reject(Error("Failing task error"))
        })
}

const spreadTask = (arr) => {
    return Promise
        .resolve(arr)
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
        .catch((err) => {
            console.log(err)
            return 'there_was_an_error'
        })
}

const main = Promise.coroutine(function*() {
    const aa = yield delayedTask(1000, 'coucou')
    console.log('single_task', aa)
    console.log("================================")

    const bb = yield spreadTask([
        delayedTask(1000, 'slow'),
        delayedTask(500, 'fast'),
        delayedTask(750, 'medium'),
        //failingTask(600),
    ])
    console.log('spread', bb)
    console.log("================================")

    const ee = yield spreadTask([
        delayedTask(1000, 'slow'),
        delayedTask(500, 'fast'),
        delayedTask(750, 'medium'),
        failingTask(600),
    ])
    console.log('spread', ee)
    console.log("================================")

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
    console.log("================================")

    const dd_promise = Promise
        .resolve([
            delayedTask(1000, 'slow'),
            delayedTask(500, 'fast'),
            failingTask(1500),
            delayedTask(750, 'medium'),
            failingTask(100),
            delayedTask(2000, 'very slow'),
            delayedTask(250, 'very fast'),
            failingTask(500),
        ])
        .some(3)
        .map((task) => {
            console.log(task)
            return task
        })
        .timeout(750)
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
    const dd = yield dd_promise

    console.log('spread', dd)
    console.log("================================")

})

const main_ = async function() {
    const aa = await delayedTask(1000, 'coucou')
    console.log('single_task', aa)
    console.log("================================")

    const bb = await spreadTask([
        delayedTask(1000, 'slow'),
        delayedTask(500, 'fast'),
        delayedTask(750, 'medium'),
        //failingTask(600),
    ])
    console.log('spread', bb)
    console.log("================================")

    const ee = await spreadTask([
        delayedTask(1000, 'slow'),
        delayedTask(500, 'fast'),
        delayedTask(750, 'medium'),
        failingTask(600),
    ])
    console.log('spread', ee)
    console.log("================================")
}

main().then(main_)
