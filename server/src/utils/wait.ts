/**
 * wait - delays a request
 * Utility function to wait for the specified amount of time.
 * @param {number} ms - The number of milliseconds to wait.
 *
 * @return {Promise<void>}
 */
function wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default wait;
