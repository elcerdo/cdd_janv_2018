#!/usr/bin/env node

const Promise = require('bluebird')
const fs = require('fs')
const range = require('./generator').range

const doStuffWithContent = (content) => {
    console.log("length", content.length)
    for (let pair of content.entries()) {
        if (pair[0] >= 10) break
        console.log(pair)
    }
    console.log('returning')
    return content
}

// node style
fs.readFile('test.txt', (err, content) => {
    if (err) throw err
    return doStuffWithContent(content)
})

// promise style
readFileAsync = Promise.promisify(fs.readFile)

readFileAsync('test.txt')
    .then(doStuffWithContent)
    .delay(1000)
    .then((content) => {
        console.log('delayed_length', content.length)
        // const corange = Promise.coroutine(range)
        // console.log(corange, corange(3))

    })
    .catch((err) => {
        throw err;
    })

// coroutines

// console.log("================================")
//
// { // coroutines
//     class PingPong {}
//
//     PingPong.prototype.ping = Promise.coroutine(function*(nn) {
//         console.log('ping', nn)
//         if (nn > 20) return
//         let dd = yield Promise
//             .delay(200)
//             .then(() => {
//                 return 'ping_hi'
//             })
//         console.log(dd)
//         this.pong(nn + 1)
//     })
//
//     PingPong.prototype.pong = Promise.coroutine(function*(nn) {
//         console.log('pong', nn)
//         yield Promise.delay(100)
//         this.ping(nn + 1)
//     })
//
//     let pp = new PingPong();
//     pp
//         .ping(3)
//         .delay(2000)
//         .then(() => {
//             console.log("================================")
//             console.log('bye')
//             return;
//         })
//
// }