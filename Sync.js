function doSyncStuff() {
    console.log("Doing syncStuff")
}
function getCoffee() {
    console.log("Getting Coffee ...");
    doSyncStuff();
    console.log("Coffee is available");
}


function getMeMyPhone() {
    console.log("Getting my phone");
}
console.log(getCoffee())
console.log(getMeMyPhone())