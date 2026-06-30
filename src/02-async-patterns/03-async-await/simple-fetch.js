/**
 * @file simple-fetch.js
 * @description Demonstrates the use of `async/await` to perform an asynchronous
 *              HTTP GET request and handle potential errors using a `try...catch` block.
 *
 * This example fetches data from a public API (JSONPlaceholder) using `node-fetch`,
 * which provides the browser-like `fetch` API in Node.js.
 */

// Import the 'fetch' function from 'node-fetch'
// Make sure to 'npm install node-fetch' if you haven't already.
import fetch from 'node-fetch';

/**
 * Fetches data from a given URL using async/await.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves with the fetched JSON data.
 */
async function fetchData(url) {
  console.log('Fetching data...');
  try {
    // Await the response from the fetch call. This pauses the async function
    // until the promise returned by fetch resolves.
    const response = await fetch(url);

    // Check if the response was successful (status code 200-299)
    if (!response.ok) {
      // If not, throw an error with the status text
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    // Await the parsing of the response body as JSON.
    const data = await response.json();
    return data;
  } catch (error) {
    // Catch any errors that occur during the fetch operation or JSON parsing.
    console.error(`Error fetching data: ${error.message}`);
    // Re-throw the error or handle it as appropriate for your application.
    throw error;
  } finally {
    // This block will always execute, regardless of whether an error occurred or not.
    console.log('Data fetch complete.');
  }
}

// Example usage: Fetch a single todo item from JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

fetchData(API_URL)
  .then(data => {
    console.log('Fetched data:', data);
  })
  .catch(error => {
    // This catch block handles errors re-thrown by fetchData,
    // or unhandled rejections from promises within fetchData.
    console.log('An error occurred during the overall fetch operation (caught outside async function).');
  });

// Example with an invalid URL to demonstrate error handling
const INVALID_URL = 'https://invalid.jsonplaceholder.typicode.com/todos/1'; // Malformed or non-existent domain

// This call will likely result in a network error
fetchData(INVALID_URL)
  .then(data => {
    console.log('Fetched data from invalid URL:', data);
  })
  .catch(error => {
    console.error('Caught error for invalid URL:', error.message);
  });

console.log('Script execution continues without waiting for fetch operations to complete.');
// Due to async nature, this message will likely appear before the fetch results.
