const { parentPort, workerData } = require('worker_threads')

const factorial = require('./factorial');

const compute = ({numbers} = {}) => {
    const arr = [];
    for (let i = 0; i < 100000000; i++) {
        arr.push(i*i);
    }
    return numbers.map(factorial)
}

parentPort.postMessage(compute(workerData))