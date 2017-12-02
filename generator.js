#!/usr/bin/env node

const _ = require('lodash')

// generator

const count = function*() {
    for (let aa = 100; true; aa += 10)
        yield aa;
}

for (let nn of count()) {
    if (nn >= 200) break
    console.log('for_of', nn)
}

console.log(_.isFunction(count))
const iter_count = count();
const iter_count_next = () => {
    return iter_count.next();
}
let generated = _.times(5, iter_count_next)
console.log(generated)

// .map((xx) => {
//     console.log('lodash', xx)
// })

console.log("================================")
return

const range = module.exports.range = function*(nn) {
    for (let kk = 0; kk < nn; kk++)
        yield kk
}

for (let nn of range(5)) {
    console.log(nn)
}

_.forEach([1, 2, 3, 6], (nn, kk) => {
    console.log('coucouc', nn, kk)
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
    console.log(nn)
}

console.log("================================")
