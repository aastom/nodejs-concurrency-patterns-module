# Node.js Concurrency Patterns Module

A foundational learning module designed to demystify concurrency and parallelism in Node.js. This module provides a progressive learning journey, building conceptual understanding before moving to practical tools and advanced considerations. Each section includes runnable code examples to reinforce learning.

## Table of Contents

1.  [Understanding the Foundation: The Node.js Event Loop](#1-understanding-the-foundation-the-nodejs-event-loop)
2.  [Asynchronous Programming Patterns: Evolution & Modern Best Practices](#2-asynchronous-programming-patterns-evolution--modern-best-practices)
    *   [Callbacks](#callbacks)
    *   [Promises](#promises)
    *   [Async/Await](#asyncawait)
3.  [Concurrency vs. Parallelism in Node.js](#3-concurrency-vs-parallelism-in-nodejs)
4.  [Achieving Parallelism: Worker Threads](#4-achieving-parallelism-worker-threads)
5.  [Achieving Parallelism: Child Processes (Briefly)](#5-achieving-parallelism-child-processes-briefly)
6.  [Concurrency Pitfalls & Robustness](#6-concurrency-pitfalls--robustness)
7.  [Performance Considerations & Basic Profiling](#7-performance-considerations--basic-profiling)

## Definition of Done

Upon completion of this module, you will be able to confidently write asynchronous Node.js applications using modern patterns (async/await), leverage Worker Threads for CPU-intensive tasks without blocking the main event loop, and understand how to manage concurrent operations in Node.js effectively.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aastom/nodejs-concurrency-patterns-module.git
    cd nodejs-concurrency-patterns-module
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run examples:**
    Navigate to the specific example directory and run the JavaScript file using Node.js.
    For example:
    ```bash
    cd src/01-event-loop
    node event-loop-intro.js
    ```

---

### 1. Understanding the Foundation: The Node.js Event Loop

*   **Focus:** How Node.js handles I/O asynchronously with a single main thread, emphasizing the non-blocking nature and its benefits for I/O-bound tasks.
*   **Depth:** Conceptual model, key phases of the event loop (timers, pending callbacks, poll, check, close callbacks), `process.nextTick()`, `setImmediate()`. *Avoid deep dives into `libuv` C++ internals; focus on observable behavior.*
*   **Outcome:** Learners understand *why* Node.js is single-threaded for execution of JavaScript and how it achieves concurrency for I/O operations.

See examples in: [`src/01-event-loop`](./src/01-event-loop)

### 2. Asynchronous Programming Patterns: Evolution & Modern Best Practices

This section traces the evolution of asynchronous programming in JavaScript, from callbacks to the modern `async/await` syntax.

#### Callbacks

*   **Focus:** Brief introduction to callback functions for asynchronous operations.
*   **Key Concept:** Illustrate "Callback Hell" and basic error handling (`if (err) return;`). *Keep this section concise, serving primarily as historical context and problem demonstration.*

See examples in: [`src/02-async-patterns/01-callbacks`](./src/02-async-patterns/01-callbacks)

#### Promises

*   **Focus:** Introduction to Promises as a structured solution to callback hell. Chaining, error handling (`.catch()`), `Promise.resolve()`, `Promise.reject()`.
*   **Advanced Patterns:** `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, `Promise.any()`.

See examples in: [`src/02-async-patterns/02-promises`](./src/02-async-patterns/02-promises)

#### Async/Await

*   **Focus:** The modern syntactic sugar built on Promises. `async` functions, `await` keyword, error handling (`try...catch`). *This should be presented as the primary pattern for modern asynchronous application development.*
*   **Outcome:** Learners can write cleaner, more manageable asynchronous code using modern patterns, understanding their underlying mechanics.

See examples in: [`src/02-async-patterns/03-async-await`](./src/02-async-patterns/03-async-await)

---

### 3. Concurrency vs. Parallelism in Node.js

*   **Focus:** Clearly define the difference. Reiterate that Node.js's main thread excels at *concurrency* for I/O, but *true parallelism* (simultaneous CPU-bound execution) requires additional mechanisms.
*   **Outcome:** A clear conceptual model for scaling Node.js applications and understanding the purpose of subsequent tools.

See examples in: [`src/03-concurrency-parallelism`](./src/03-concurrency-parallelism)

### 4. Achieving Parallelism: Worker Threads

*   **Focus:** Introduction to Node.js Worker Threads as the primary mechanism for offloading CPU-bound operations that would otherwise block the event loop.
*   **Key Concepts:** Creating and managing worker threads, communication primarily via *message passing* (`postMessage`, `onmessage`, `MessagePort`).
*   **Crucial Clarification:** Emphasize that Worker Threads *do not share memory by default*. Data is transferred via *structured cloning* (a copy mechanism), inherently mitigating shared-memory race conditions in typical usage. `SharedArrayBuffer` with `Atomics` will be explicitly excluded as an advanced topic.
*   **Outcome:** Learners can identify appropriate use cases for Worker Threads and implement basic CPU-intensive task offloading.

See examples in: [`src/04-worker-threads`](./src/04-worker-threads)

### 5. Achieving Parallelism: Child Processes (Briefly)

*   **Focus:** A concise overview of the `child_process` module for spawning external processes.
*   **When to Use:** Briefly discuss scenarios where child processes are more appropriate (e.g., executing shell commands, external executables, long-running background services written in other languages) versus Worker Threads.
*   **Outcome:** Awareness of another mechanism for parallelism, understanding its distinction and appropriate application.

See examples in: [`src/05-child-processes`](./src/05-child-processes)

### 6. Concurrency Pitfalls & Robustness

*   **Focus:** Common mistakes in asynchronous flows, error propagation, and effective error handling strategies (`try...catch` with `async/await`, handling unhandled promise rejections, domain-specific error types).
*   **Race Conditions:** Discuss race conditions that *can* arise from incorrect state management (e.g., in shared external resources like database connections, caches, or file systems when accessed concurrently; or through improper synchronization logic for message-passed data). *Explicitly clarify that Node.js Worker Threads primarily avoid shared memory race conditions through message passing (structured cloning), making direct shared memory race conditions uncommon for default usage.*
*   **Outcome:** Learners write more robust and error-resilient concurrent applications, understanding common pitfalls and how to mitigate them.

See examples in: [`src/06-concurrency-pitfalls`](./src/06-concurrency-pitfalls)

### 7. Performance Considerations & Basic Profiling

*   **Focus:** When to choose asynchronous patterns (for I/O-bound tasks) versus Worker Threads (for CPU-bound tasks).
*   **Practical Guidance:** Brief introduction to basic profiling techniques in Node.js (e.g., `console.time`, Chrome DevTools for CPU profiles, `perf_hooks` for basic measurement) to identify bottlenecks.
*   **Worker Thread Nuances:** Briefly mention the overheads associated with Worker Threads (thread creation, serialization/deserialization costs for message passing), guiding learners on when the performance benefits outweigh these costs.
*   **Outcome:** Ability to make informed decisions about concurrency strategies and utilize basic tools to identify and optimize performance bottlenecks.

See examples in: [`src/07-performance-profiling`](./src/07-performance-profiling)
