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