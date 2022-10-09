const { Worker } = require('worker_threads')

const compute = (array = []) => {
    return new Promise((resolve, reject) => {
       const worker = new Worker('./worker.js', {
           workerData: {
               numbers: array
           }
       })

        worker.on('message', (message) => {
            resolve(message);
        })

        worker.on('messageerror', (messageError) => {
            reject(messageError)
        })

        worker.on('error', (error) => {
            reject(error)
        })

        worker.on('exit', () => {
            console.log(`Поток завершил работу...`)
        })
    });
}

const main = async () => {
   try {
       performance.mark('start');

       const result = await Promise.all([
           compute([25, 28, 32, 64, 44]),
           compute([25, 28, 32, 64, 44]),
           compute([25, 28, 32, 64, 44]),
           compute([25, 28, 32, 64, 44])
       ])
       console.log('result ->', result);

       performance.mark('end');
       performance.measure('main', 'start', 'end');
       console.log('perfomance ->', performance.getEntriesByName('main'));
   } catch (e) {
       console.error(`Произошла ошибка ${e.message}`);
   }
}

setTimeout(() => {
    console.log('setTimeOut -> 1');
}, 1000)


setTimeout(() => {
    console.log('setTimeOut -> 2');
}, 2000)

main();

