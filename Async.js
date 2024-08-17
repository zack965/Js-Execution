async function doAsyncStuff(callback) {
    setTimeout(() => {
        callback();
    }, 2500);
}
function getCoffee() {
    console.log("Getting Coffee ...");
    doAsyncStuff(() => {
        console.log("Doing asyncStuff")
    });
    console.log("Coffee is available");
}


function getMeMyPhone() {
    console.log("Getting my phone");
}
console.log(getCoffee())
console.log(getMeMyPhone())