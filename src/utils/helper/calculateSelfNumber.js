const endNumber = 4999;

function sumNumber(n) {
    const number = n.toString().split('');
    let results = 0;

    number.forEach((item) => {
       results += Number(item);
    });

    results = Number(results) + Number(n);
    return results;
}

function calculateSelfNumber() {
    let results = [];

    Array.from(Array(endNumber)).forEach((_, i) => {
        const sum = sumNumber(i + 1);
        results.push(sum);
    })

    return results;
}

export function generateSelfNumber() {
    const data = calculateSelfNumber();
    let results = [];

    Array.from(Array(endNumber)).forEach((_, i) => {
        const sum = data.find((item) => item === i + 1);
        if (sum === undefined) results.push(i + 1);
    })

    return results;
}

export function isSelfNumber(n, data) {
    const number = Number(n);
    const isExist = data.find((item) => item === number);

    return isExist !== undefined;
}
