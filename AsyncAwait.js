// Create an asynchronous logging function
async function asyncLog(message) {
    return new Promise((resolve) => {
        console.log(message);
        resolve();
    });
}

async function doAsyncStuff() {
    await asyncLog("I am the synchronous part");
    // Optionally, simulate async behavior:
    await new Promise((resolve) => setTimeout(resolve, 0));
}

async function getCoffee() {
    await asyncLog("Getting Coffee ...");
    await doAsyncStuff();
    await asyncLog("Coffee is available");
}

function getMeMyPhone() {
    console.log("Getting my phone");
}

// Since `getCoffee()` is async, it returns a Promise. We should handle it properly.
getCoffee().then(() => console.log(getMeMyPhone()));
