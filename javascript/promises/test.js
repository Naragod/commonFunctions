const parallel = require("./helper").parallel;

// copied test code.
const task = function (taskNum, seconds, negativeScenario) {
  return new Promise((resolve, reject) => {
    setTimeout((_) => {
      if (negativeScenario) reject(new Error("Task " + taskNum + " failed!"));
      resolve("Task " + taskNum + " succeed!");
    }, seconds * 1000);
  });
};

// copied test code.
// modified
const run = async function () {
  await timeTest(async () => {
    let results = [];
    // asyncronous result
    await parallel(getPromises(), (promiseResult) => results.push(promiseResult));
    console.log(results);
  });

  await timeTest(async () => {
    // synchronous result
    let results = await parallel(getPromises());
    console.log(results);
  });
};

const getPromises = () => {
  let t1 = task(1, 6, false);
  let t2 = task(2, 5, true);
  let t3 = task(3, 3, false);
  let t4 = task(4, 4, false);
  return [t1, t2, t3, t4];
};

const timeTest = async (callback) => {
  const start = Date.now();
  await callback();
  const end = Date.now();
  const timeDiff = end - start;
  console.log(`~~~~~~~~~~~~~~~~~ Finished in ${timeDiff} ms ~~~~~~~~~~~~~~~~~`);
};

(async function () {
  try {
    await run();
  } catch (err) {
    console.log("Caught error", err);
  }
})();
