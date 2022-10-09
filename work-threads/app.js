const factorial = require('./factorial')

const compute = (array = []) => {
    const arr = [];
    for (let i = 0; i < 100000000; i++) {
        arr.push(i*i);
    }
    return array.map(factorial);
}

const main = () => {
    performance.mark('start');

    const result = [
        compute([25, 28, 32, 64, 44]),
        compute([25, 28, 32, 64, 44]),
        compute([25, 28, 32, 64, 44]),
        compute([25, 28, 32, 64, 44])
    ]

    console.log('result ->', result);

    performance.mark('end');
    performance.measure('main', 'start', 'end');
    console.log('perfomance ->', performance.getEntriesByName('main'));
}

setTimeout(() => {
    console.log('setTimeOut -> 1');
}, 1000)


setTimeout(() => {
    console.log('setTimeOut -> 2');
}, 2000)

main();

