# Async/Await: Modern Asynchronous JavaScript

`async/await` is the modern syntax for writing asynchronous code in JavaScript, built on top of Promises. It allows you to write asynchronous code that looks and behaves like synchronous code, making it much easier to read and maintain compared to raw Promises or callbacks.

## Concepts Covered

*   **`async` functions:** How to declare an `async` function and what it returns (always a Promise).
*   **`await` keyword:** How to pause execution of an `async` function until a Promise settles (resolves or rejects).
*   **Error Handling:** Using standard `try...catch` blocks with `async/await` for robust error management.
*   **Sequential vs. Parallel Execution:** How `await` naturally leads to sequential execution, and strategies to achieve parallel execution (e.g., `Promise.all`).

## `simple-fetch.js`

This example demonstrates how to use `async/await` to perform a simple HTTP GET request to a public API and handle potential errors. It uses the `node-fetch` library to provide `fetch` API capabilities in Node.js.

### Prerequisites

YouYou need `node-fetch` installed:
```bash
npm install node-fetch
```
This is already included in the root `package.json`.

### How to Run

```bash
node src/02-async-patterns/03-async-await/simple-fetch.js
```

### Expected Output (Example)

```
Fetching data...
Fetched data: { id: 1, title: '.', userId: 1, completed: false }
Data fetch complete.
```
Or, in case of an error:
```
Fetching data...
Error fetching data: FetchError: ... (e.g., network error)
```

## Further Reading

*   [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
*   [MDN Web Docs: await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
*   [Node.js Docs: async/await](https://nodejs.dev/en/learn/how-to-use-async-await/)
