#!/usr/bin/env node

const _ = require('lodash')

// what are generators?
// - generators are traversable
// - generalisted iterator creator
// - same 'yield' keyword as in python
// - created whith 'function*' in js
// - traversed using (for...of) in js

const count = function*() {
    for (let aa = 100; true; aa += 10)
        yield aa;
}

for (let nn of count()) {
    if (nn >= 200) break
    console.log('for_of', nn)
}

const iterate = (iter) => {
    return () => {
        return iter.next()
    }
}

const generate = module.exports.generate = (nn, iter) => {
    return _.times(nn, iterate(iter))
        .filter((item) => {
            return !item.done
        })
        .map((item) => {
            return item.value
        })
}

generate(10, count()).forEach((item) => {
    console.log('lodash', item)
})

console.log("================================")

const range = module.exports.range = function*(nn) {
    for (let kk = 0; kk < nn; kk++)
        yield kk
}

for (let nn of range(5)) {
    console.log('for_of', nn)
}

generate(10, range(5)).forEach((item) => {
    console.log('lodash', item)
})

console.log("================================")

const demo_generator = function*(nn) {
    console.log('next', yield 42)
    console.log('next', yield "!!!!!!")
    console.log('next', yield [1, 2, 3, nn])
    return "noop"
    console.log('next', yield 1337)
    console.log('next', yield "never reached")
}

{
    const iter = demo_generator(4);
    console.log(iter.next('%%%%%'))
    console.log(iter.next('%%%%'))
    console.log(iter.next('%%%'))
    console.log(iter.next('%%'))
    console.log(iter.next('%'))
    console.log(iter.next(''))
    console.log(iter.next(''))
    console.log(iter.next(''))
    console.log(iter.next(''))
}


for (let nn of demo_generator("pierre")) {
    console.log('for_of', nn)
}

generate(10, demo_generator('mimi')).forEach((item) => {
    console.log('lodash', item)
})

console.log("================================")
