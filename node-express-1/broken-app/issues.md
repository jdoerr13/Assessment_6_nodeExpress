# Broken App Issues
(*see notes in app.js
)
1. const app = express();:

Changed from var to const to declare the app variable. Using const is a best practice when the variable doesn't need to be reassigned, promoting immutability and preventing accidental reassignment.

2. app.use(express.json());:

Added middleware to parse JSON bodies in incoming requests. This is essential when working with JSON data in the request body, making it accessible via req.body.

3. async (req, res, next) => { ... }:

Used async with the route handler function to allow the use of await for asynchronous operations, such as the axios.get calls.

4. const results = await Promise.all(...);:

Replaced let with const for results to signal that the variable won't be reassigned.  
5. Also, added Promise.all to wait for all asynchronous operations to complete before moving forward. This ensures that all requests are sent concurrently, improving performance.

6. const response = await axios.get(...);:

Introduced a const variable response to store the result of the asynchronous operation. This improves readability and prevents accidental reassignment.

7. return res.json(results);:

Used res.json(results) instead of res.send(JSON.stringify(out)) for a more concise and expressive way to send JSON responses. It automatically sets the appropriate Content-Type header for JSON.

8. catch (err) { next(err); }:

Added err to the catch block to handle errors properly. Passing err to next ensures that errors are forwarded to the error-handling middleware.

9. app.listen(3000, () => { ... });:

Added the missing arrow function for better syntax and readability when logging the server start message.

10. added a get request to access the homepage.