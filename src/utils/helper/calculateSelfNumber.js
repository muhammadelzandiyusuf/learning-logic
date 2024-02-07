function sumNumber(n) {
    const number = n.toString().split('');
    let results = 0;

    number.forEach((item) => {
       results += Number(item);
    });

    results = Number(results) + Number(n);
    return results;
}

function calculateSelfNumber(from, to) {
    let results = [];
    let start = from;
    while (start <= to) {
        const sum = sumNumber(start);
        results.push(sum);
        start++;
    }

    return results;
}

export function isSelfNumber(n, data) {
    const number = Number(n);
    const isExist = data.find((item) => item === number);

    return isExist !== undefined;
}

export function generateSelfNumber(from, to) {
    const data = calculateSelfNumber(from, to);
    let results = [];
    let start = from;

    while (start <= to) {
        const sum = isSelfNumber(start, data);
        if (!sum) results.push(start);
        start++;
    }

    return results;
}
