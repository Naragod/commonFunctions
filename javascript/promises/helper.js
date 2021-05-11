/**
 *
 * @param {Promise[]} promises
 * @returns an array of promises in the order in which they finish their execution
 * not in the order in which they are passed in the array
 */
const parallel = async (promises) => {
  return new Promise((resolve, _reject) => {
    const results = [];
    let starter = Promise.resolve(null);
    promises
      .map(async (promise) => {
        // add the result of promise's execution as they finish to the results array
        return promise.then((res) => results.push(res)).catch((err) => console.log("AAAA:", err));
      })
      .reduce((prev, curr) => {
        // wait for the returned promises to exectute before returning the results array.
        // otherwise it will return an empty array when we resolve.
        return prev.then(() => curr.then((res) => res));
      }, starter)
      // return result array. Have to do it inside the then statement to ensure that the results array is populated.
      .then(() => resolve(results));
  });
};

module.exports = { parallel };
