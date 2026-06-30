# Node.js Event Loop

This section dives into the core mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded: the Event Loop. Understanding the Event Loop is fundamental to grasping how Node.js achieves concurrency.

## Concepts Covered

*   **Single-threaded nature:** How JavaScript execution happens on a single thread.
*   **Non-blocking I/O:** How operations like network requests or file system access don't block the main thread.
*   **Phases of the Event Loop:** An overview of the main phases: timers, pending callbacks, poll, check, close callbacks.
*   `process.nextTick()` vs. `setImmediate()` vs. `setTimeout()`: Understanding the execution order of these scheduling functions.

## `event-loop-intro.js`

This example demonstrates the execution order of `setTimeout`, `setImmediate`, and `process.nextTick` within the Node.js event loop, highlighting their respective priorities and phases.

### How to Run

```bash
node src/01-event-loop/event-loop-intro.js
```

### Expected Output (Example)

```
Start of script
process.nextTick callback
Promise.resolve() (microtask queue)
setTimeout callback (after 0ms)
setImmediate callback
End of script
```
*Note: The exact timing of `setTimeout(fn, 0)` relative to `setImmediate()` can sometimes vary slightly based on system load, but generally, `setTimeout(0)` will run after `setImmediate()` in the 'poll' phase if there's no I/O, or before if `setTimeout` was scheduled earlier and `setImmediate` is in the 'check' phase. `process.nextTick` and Promise callbacks (microtasks) always execute before the next event loop tick.*

## Further Reading

*   [The Node.js Event Loop, Timers, and `process.nextTick()`](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
*   [Node.js Event Loop Explained](https://developer.ibm.com/articles/nodejs-event-loop-explained/)
