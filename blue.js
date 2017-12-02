#!/usr/bin/env node

const range = require('./generator').range

const ff = (xx) => {
    return xx + 3;
}

for (let iter of range(10))
    console.log(iter, ff(iter))
