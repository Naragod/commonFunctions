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
  let t1 = task(1, 6, false);
  let t2 = task(2, 5, true);
  let t3 = task(3, 3, false);
  let t4 = task(4, 4, false);
  const results = await parallel([t1, t2, t3, t4]);
  console.log(results);
  console.log("Finished ~~~~~~~~~~~~~~~~~");
};

(async function () {
  try {
    await run();
  } catch (err) {
    console.log("Caught error", err);
  }
})();
