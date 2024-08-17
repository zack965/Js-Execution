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

