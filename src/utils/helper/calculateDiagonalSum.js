export default function calculateDiagonalSum(gridSize) {
    const size = Number(gridSize);
    const results = Array.from({ length: gridSize }, () => []);

    let row = 0;
    let col = 0;
    let rowEnd = size - 1;
    let colEnd = size - 1;
    let finalSize = size * size;
    let sumDiagonalNumber = new Array(size + 1);

    // Generate Matrix
    while (col <= colEnd && row <= rowEnd) {
        // Top row
        for (let i = colEnd; i >= col; i--) {
            results[row][i] = finalSize;
            finalSize--;
        }
        row++;

        // end column
        for (let i = row; i <= rowEnd; i++) {
            results[i][col] = finalSize;
            finalSize--;
        }
        col++;

        // end row
        for (let i = col; i <= colEnd; i++) {
            results[rowEnd][i] = finalSize;
            finalSize--;
        }
        rowEnd--;

        // End col from first
        for (let i = rowEnd; i >= row; i--) {
            results[i][colEnd] = finalSize;
            finalSize--;
        }
        colEnd--;
    }

    // Sum Diagonal Matrix
    if(size === 1) {
        sumDiagonalNumber = 1;
    }

    sumDiagonalNumber[1] = 1;
    sumDiagonalNumber[0] = 0;

    for (let i = 2; i <= size; i++) {
        sumDiagonalNumber[i] = (4 * (i * i)) - 6 * (i - 1) + sumDiagonalNumber[i - 2];
    }

    sumDiagonalNumber = sumDiagonalNumber[size];

    return {  count: sumDiagonalNumber, matrix: results};
}
