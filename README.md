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