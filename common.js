export let loop = function(interval, callback){
    if(!callback)
        return false;

    return loopCycle(0, interval, callback)
}

let loopCycle = (iteration, interval, callback) => {
    let result = callback(iteration);
    if(result == "terminate")
        return false;
    
    return setTimeout(() => {
        loopCycle(iteration + 1, interval, callback);
    }, interval);
}

// example use case:
// loop(1000, (i) => {
//     console.log("Currently on the", i, "th iteration.");
// })