#!/usr/bin/env node

// from https://promise-nuggets.github.io/
const Promise = require('bluebird')
const fs = require('fs')
const generate = require('./generator').generate

// why is async useful?

const doStuffWithContent_ = (content) => {
    console.log("length", content.length)
    for (let pair of content.entries()) {
        if (pair[0] >= 10) break
        console.log(pair)
    }
    console.log('returning')
    return content
}

const doStuffWithContent = (content) => {
    console.log("length", content.length)
    generate(10, content.entries()).forEach((pair) => {
        console.log(pair)
    })
    console.log('returning')
    return content
}

// node callback style
fs.readFile('test.txt', (err, content) => {
    if (err) {
        console.error('an error has occured')
        throw err
    }
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
        console.error('an error has occured')
        throw err;
    })
    .finally(() => {
        console.log("================================")
    })
