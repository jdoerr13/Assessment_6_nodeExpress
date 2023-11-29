### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    When handeling operations that don't necessarily complete immediately in JS you can use callbacks, Promises, Async/await.
    Callbacks are functions that are passed as arguments to another function to be executed later- OFTEN AFTER AN ASYNC OPERATION COMPLETES.- USED WITH SET TIMEOUTE
    Promises- cleaner way- chaining operations and handle subbess or errors- uses resolve/ reject liek this: 
    function fetchData() {
      return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve("Some data");
          } else {
            reject("Error fetching data");
          }
        }, 1000);
      });
    }
    and Async/Await - this syntax is built on top of promises which provides a more consise way like this: 
    async function fetchData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Some data");
        }, 1000);
      });
    }

    async function fetchDataAndLog() {
      try {
        const result = await fetchData();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }


- What is a Promise?
  as stated above, they are used with asynchronous operations and proved a way to represend a value( eventual completion or failure of an operation) that may not be available yet. Promises are created using the Promise constructor, which takes a function (often called the executor) with two parameters: resolve and reject. but three states: pending, fulfilled (resolved), and rejected. typically consumed using the then and catch methods. The then method is called when the promise is resolved, and the catch method is called when it is rejected. One of the key features of promises is the ability to chain multiple asynchronous operations.
  ****The async/await syntax provides a more readable way to work with promises, making asynchronous code look similar to synchronous code.

- What are the differences between an async function and a regular function?
  1. return value- the asyn funct always returns a promise- either resolved or rejected- resolved with the value the async function returns or rejected with uncaught exception thrown from within the func.  While a regular func returns a value with a return statement, or no return = undefined
  2. Async func enables use of await keyword to wait for promise to settle before continuing the execution of the function, which a regular functions are syncronouse by default= execute one statement at a time and if there are asyncronous operations within (such as setTimout or AJAX requests) they must be handled with callbacks or promises. 
  3. Async func simplify promise handling by using try---catch for error handleing which regular function you typically deal with promises using callbacks or promise chaining syntax- where the error handling might involve using .then() and .catch() or the traditional try..catch blocks. 

- What is the difference between Node.js and Express.js?
  While they are both used for server-side dev in JS they have different purposes such as:
  1. node.js is a runtime environment that allows JS code to run on the server side, which Express.js is a web app framework FOR Node.js and provides a set of features and tools to build web apps and APIS.
  2. Node.js provides the PLATFORM for excuring JS serverside code to enable developmers to build scalable and high-performance network applications, while Express is built on top of Node and simplifies building robust and scalable web apps by providing abstractions and middleware for common web dev tasks.
  3. lastly  node.js is async and event-driven & uses single-threaded event loops, while Express.js facilitates routing, uses middleware, template engines and RESTful API development. 

- What is the error-first callback pattern?
  Also known as the Node.js callback pattern which handles async operations.  Instead of at the end, in this pattern, a callback function is used to handle the result of an asynchronous operation and the FIRST parameter of the callback is reserved for an error object.
  The asynchronousOperation function takes a callback as its parameter.
  Inside the function, the asynchronous operation is performed. If an error occurs during the operation, the callback is called with the error object as the first argument and no result.
  If the operation is successful, the callback is called with null as the first argument and the result as the second argument.

- What is middleware?

  Espress.js uses middleware functions to execure code during the request-response cycle, allowing developers to add functionlity to the application. To get access to the req and res objects and can also call the next function.  express.json() is a good example of this.  Also our 404 and global error handler are another example. 

- What does the `next` function do?
  It is used to pass control to the next middleware function in the chain.  It is crucial for the flow of control in Express middleware and allows developers to chain mulitple middleware functions together, each performing specific tasks in the order they are defined

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
1. request made sequentially- each request waits for the previous one to complete = OFTEN LEADING TO SLOWER PERFORMANCE:  solution use Promise.all
2. No error handling= USE Try...catch to handle errors during the API request. 
3. urls are hardcoded as strings- since there are multiple with the same base- use a constant to make code less error-prone
4. There is code duplication making similar API request= create a seperate function for making the API request to reduce duplication
5. Could also move away from jQuery to more modern alternatives such as Fetch API or Axios
```js
const BASE_URL = 'https://api.github.com/users/';

async function getUser(username) {
  return $.getJSON(BASE_URL + username);
}

async function getUsers() {
  const [elie, joel, matt] = await Promise.all([
    getUser('elie'),
    getUser('joelburton'),
    getUser('mmmaaatttttt'),
  ]);

  return [elie, matt, joel];
}
```

