const { Worker } = require('worker_threads');
const { fork } = require('child_process');

const workerFunction = (array = []) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {workerData: {array}});

        worker.on('message', (msg) => {
            resolve(msg);
        });

        worker.on('error', (error) => {
            console.log('error ->', error);
            reject(error.message);
        });

        worker.on('messageerror', (msgError) => {
            reject(msgError.message);
        });

        worker.on('exit', () => {
            console.log('Поток завершён');
        });
    })
}


const forkFunction = (array = []) => {
    return new Promise((resolve, reject) => {
        const forkProcess = fork('./fork.js');

        forkProcess.on('message', (msg) => {
            resolve(msg);
        });

        forkProcess.on('error', (error) => {
            console.log('error ->', error);
            reject(error.message);
        });

        forkProcess.on('exit', () => {
            console.log('Поток завершён');
        });

        forkProcess.send({ array });
    })
}


const run = async (array, name = '', callback = _ => Promise.resolve([])) => {
    performance.mark('start');

    const resultFromWorker = await Promise.all([
        callback(array),
        callback(array),
        callback(array),
        callback(array),
        ]
    );

    performance.mark('end');

    performance.measure(name, 'start', 'end');
    console.log(`perfomance of ${name} ->`, performance.getEntriesByName(name));

    console.log('result -> ', resultFromWorker)
}


const main = async (runVariant = 'worker') => {
    try {
        const array = [25, 50, 25, 35, 15];


        if(runVariant === 'worker') {
            await run(array, runVariant, workerFunction);
            return;
        }

        if(runVariant === 'fork') {
            await run(array, runVariant, forkFunction);
            return;
        }


        throw new Error('Метод запуска может быть только worker ИЛИ fork');

    } catch (e) {
        console.log(`Произошла ошибка: ${e.message}`)
    }


}

try {
    const [_path1, _path2, variant] = process.argv;

    main(variant);
} catch (e) {
    console.log(e.message);
}