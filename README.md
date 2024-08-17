# How javascript code is being executed ? 

The process of executing JavaScript is devided in 4 parts : 
## Call stack 
- Keeps of what's being executed + order 
- Nested function calls go on top of the stack
- Last-in , First-out (LiFo)
## Task queue
- Stores asynchronous callbacks ahead of Call stack
- First-in , First-out (FiFo)
## Microtask queue
- Task queue but for promises 
- Gets priority over task queue
## Event loop
- Continuously checks and manages the Call stack by adding and removing tasks
- When Call stack is empty , adds task from : 
    - Task queue
    - Microtask queue
    - Synchronous jobs
## Examples
### Synchronous code example : 
```javascript
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

// output --------------------------------
/*
Getting Coffee ...
Doing syncStuff
Coffee is available
Getting my phone
*/
```

1.  getCoffee is added to the call stack, and you'll see the log: **"Getting Coffee ..."**.
2. Next, **doSyncStuff** is added on top of the call stack. The application will freeze while doSyncStuff is executing and you will see in the log **Doing syncStuff** . Once it finishes, it will be removed from the call stack, and you'll see the log: **"Coffee is available"**.
3. **getCoffee** is then removed from the call stack, leaving the call stack empty.
4. Now, the **getMeMyPhone** function is added to the call stack, and you'll see the log: **"Getting my phone"**.
5. After the **getMeMyPhone** function completes, it is removed from the call stack.

### SetTimeout code example : 
```javascript
function doAsyncStuff(callback) {
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
// output -----------------------------
/*
Getting Coffee ...
Coffee is available
Getting my phone
Doing asyncStuff
*/
```
Remember, **doAsyncStuff** is an asynchronous function:

1. **getCoffee** will be added to the callstack .
2. you will see in the log : **Getting Coffee ...**
3. **doAsyncStuff** is added to the call stack, but since setTimeout is asynchronous, it returns immediately. The browser handles the callback, and both **setTimeout** and **doAsyncStuff** are removed from the call stack.
4. you will see in the log : **Coffee is available**
5. the function **getCoffee** will be removed from the callstack
6. the function **getMeMyPhone** will be added from the callstack
7. you will see in the log : **Getting my phone**
8. the function **getMeMyPhone** will be removed from the callstack
9. The browser moves the callback from **setTimeout** to the **Task queue**. The **Event queue** then adds it back to the call stack, where it is executed and removed.

## Promise code example : 
```javascript
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
// output -------------------------------------
/*
fetching
end fetching
step 1
step 2
preparing api tokens
*/
```
1. you will see in the log : **fetching**
2. you will see in the log : **end fetching**
3. **setTimeout**  will be added to the callstack  but since setTimeout is asynchronous, it returns immediately. The browser handles the callback, and  **setTimeout**  is removed from the call stack.
4. The browser moves the callback from **setTimeout** to the **Task queue**. The **Event queue** then adds it back to the call stack, where it is executed and removed.
5. **Promise** is will be processed like setTimeout but the callback will be moved to **Microtask queue** .
6. The **event loop** will execute the callback from the **Microtask queue** first and then move to  in **Task queue**.
7. so in the logs you will see : **step 1** and **step 2**
8. and then you will see : **preparing api tokens**
## Asynchronous code example : 
```javascript
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
// output ------------------------------------
/*
Getting Coffee ...
Coffee is available
undefined
Getting my phone
undefined
Doing asyncStuff
*/
```
1. **getCoffee** will be added to the callstack .
2. you will see in the log : **Getting Coffee ...**
3. **doAsyncStuff** is added to the call stack, but since setTimeout is asynchronous, it returns immediately. The browser handles the callback, and both **setTimeout** and **doAsyncStuff** are removed from the call stack.
4. Even though **doAsyncStuff** is an **async** function, it does not await anything inside, so it behaves just like a regular function that contains setTimeout.
5. you will see in the log : **Coffee is available**
6. the function **getCoffee** will be removed from the callstack
7. the function **getMeMyPhone** will be added from the callstack
8. you will see in the log : **Getting my phone**
9. the function **getMeMyPhone** will be removed from the callstack
10. The browser moves the callback from **setTimeout** to the **Task queue**. The **Event queue** then adds it back to the call stack, where it is executed and removed.
### Async / Await code example : 
```javascript
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

// output --------------------------------
/*
Getting Coffee ...
I am the synchronous part
Coffee is available
Getting my phone
undefined
*/
```

1. The code begins by adding **getCoffee()** to the call stack. Since **getCoffee()** is an async function, it returns a Promise.
2. asyncLog logs "Getting Coffee ..." and resolves its promise. The resolution is placed in the Microtask Queue, and the Event Loop will eventually move this resolution to the call stack for execution.
3. asyncLog is removed from the call stack.
4. doAsyncStuff is then added to the call stack. It executes asyncLog in the same manner, and once the promise resolves, its then handler is added to the microtask queue.
5. The microtask queue is moved to the callstack by the eventloop and execute it.  the resolution of the promise triggers the continuation of doAsyncStuff.
6. After the promise resolves, doAsyncStuff resumes and completes its execution. It is then removed from the call stack.
7. asyncLog will be processed as before.
8. Since getCoffee() is an async function and returns a promise, once the promise resolves, you will see the output of the function getMeMyPhone in the log, after it has been added to the call stack, executed, and removed from the call stack.

--------------------------
1. The code starts by adding **getCoffee()** to the callstack. Since getCoffee() is an async function, it returns a Promise.
2. **asyncLog** logs "Getting Coffee ..." and resolves its promise by passing the resolution to the **Microtask Queue** and then the **Event loop** pass this resolution to the callstack and execute it.
3. **asyncLog** is removed from the callstack .
4. **doAsyncStuff** is added to the callstack and execute **asyncLog** like before, and the promise  resolves and its then handler is added to the microtask queue.
5. The microtask queue is processed next. Here, the resolution of the Promise triggers the continuation of doAsyncStuff
6. After the Promise resolves, doAsyncStuff resumes execution, and completes , then doAsyncStuff is removed from the callstack . 
7. **asyncLog** will be processed like before .
8. getCoffee is adync function so it will return a promise so after the resolution of the promise , you will see in the log the output of the function **getMeMyPhone** after it was added to the callstack and executed and removed from the callstack.