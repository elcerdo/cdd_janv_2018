#!/usr/bin/env node

// generator

const count = function*() {
    for (let aa = 0; true; aa++)
        yield aa;
}

for (let nn of count()) {
    if (nn >= 10) break
    console.log(nn)
}

console.log("================================")

const range = module.exports.range = function*(nn) {
    for (let kk = 0; kk < nn; kk++)
        yield kk
}

for (let nn of range(5)) {
    console.log(nn)
}

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
