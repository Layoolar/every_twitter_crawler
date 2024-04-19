/**
 * chunkifyArray()
 * =========================
 *
 * @param {T[]} array - the array to be chunkified
 * @param {number} chunkSize - size of each chunkified array
 * @return {T[][]} - The chunkified array of arrays
 */
function chunkifyArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export default chunkifyArray;
