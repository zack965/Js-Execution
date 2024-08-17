console.log("fetching")
setTimeout(() => {
    console.log("preparing api tokens")
}, 100);

Promise.resolve().then(() => {
    console.log("step 1")
}).then(() => {
    console.log("step 2")
})

console.log("end fetching")