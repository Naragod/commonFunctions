let starter = Promise.resolve(null);

/**
 *
 * @param {Promise[]} promises
 * @returns an array of promises in the order in which they finish their execution
 * not in the order in which they are passed in the array
 */
const parallelSync = async (promises) => {
  return new Promise((resolve, _reject) => {
    const results = [];
    promises
      // add the result of promise's execution as they finish to the results array
      .map((promise) => promise.then((res) => results.push(res)).catch((err) => console.log("AAAA:", err)))
      // wait for the returned promises to exectute before returning the results array.
      // otherwise it will return an empty array when we resolve.
      .reduce((prev, curr) => prev.then(() => curr.then((res) => res)), starter)
      // return result array. Have to do it inside the then statement to ensure that the results array is populated.
      .then(() => resolve(results));
  });
};

const parallelAsync = async (promises, callback) => {
  return new Promise((resolve, _reject) => {
    promises
      .map((promise) => promise.then((res) => callback(res)).catch((err) => console.log("BBBB:", err)))
      // care about awaiting for the promises to finish in order to continue execution. Promise result can be ignored.
      .reduce((prev, curr) => prev.then(() => curr.then(), starter))
      .then((res) => resolve(res));
  });
};

const parallel = (promises, callback) => {
  if (callback) return parallelAsync(promises, callback);
  return parallelSync(promises);
};

module.exports = { parallel };
