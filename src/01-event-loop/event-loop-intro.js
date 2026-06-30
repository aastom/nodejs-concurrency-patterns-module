/**
 * @file event-loop-intro.js
 * @description Demonstrates the basic behavior and execution order of `setTimeout`,
 *              `setImmediate`, and `process.nextTick` within the Node.js event loop.
 *
 * This example helps illustrate the different phases of the event loop and
 * the priority given to microtasks (like Promise callbacks and `process.nextTick`)
 * versus macrotasks (like `setTimeout` and `setImmediate`).
 */

console.log('Start of script');

// process.nextTick callbacks are part of the microtask queue and run before
// any other phase of the event loop. They have the highest priority.
process.nextTick(() => {
  console.log('process.nextTick callback');
});

// Promise callbacks (then/catch/finally) are also part of the microtask queue,
// executed after process.nextTick callbacks but before the next event loop phase.
Promise.resolve().then(() => {
  console.log('Promise.resolve() (microtask queue)');
});

// setTimeout callbacks run in the timers phase.
// A delay of 0ms means it's scheduled to run as soon as possible after timers phase.
setTimeout(() => {
  console.log('setTimeout callback (after 0ms)');
}, 0);

// setImmediate callbacks run in the check phase, typically after poll phase
// but before any I/O callbacks are processed for the next event loop iteration.
setImmediate(() => {
  console.log('setImmediate callback');
});

console.log('End of script');

/**
 * Expected Output (order might vary slightly for setTimeout/setImmediate on different systems or Node.js versions,
 * but process.nextTick and Promise microtasks are always first):
 *
 * Start of script
 * process.nextTick callback
 * Promise.resolve() (microtask queue)
 * End of script
 * setTimeout callback (after 0ms)  // or setImmediate can be before this
 * setImmediate callback           // or setTimeout can be before this
 */

// Example of an I/O operation to illustrate the 'poll' and 'check' phases interaction
// An I/O event can make setImmediate run before setTimeout(0)
const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('fs.readFile callback (I/O phase)');

  setTimeout(() => {
    console.log('setTimeout from I/O callback (after 0ms)');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate from I/O callback');
  });
});

console.log('Script continues after scheduling file read');

/**
 * When an I/O operation completes, its callback goes into the 'poll' phase.
 * After the I/O callback, if `setImmediate` was scheduled, it typically runs
 * before `setTimeout(0)` because `setImmediate` is processed in the 'check' phase
 * right after the 'poll' phase.
 *
 * Expected Output (when I/O is involved for setTimeout/setImmediate interaction):
 * (Output from previous section)
 * Script continues after scheduling file read
 * fs.readFile callback (I/O phase)
 * setImmediate from I/O callback
 * setTimeout from I/O callback (after 0ms)
 */
