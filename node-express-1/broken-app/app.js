const express = require('express');
let axios = require('axios');

const app = express();//changed from var to const: doesn't need reassigned
app.use(express.json()); //added this middleware to parse JSON bodies. In the updated code, app.use(express.json()) is added to enable the parsing of JSON bodies in incoming requests.


app.get('/', (req, res) => {
  res.send('Hello, this is a GET request!');
});

app.post('/', async (req, res, next) => {//better to use async with axios.get
  try {
    //change from let to const below
    const results = await Promise.all( //added this to await for array of promises to resolve.
      req.body.developers.map(async d => {
      //add variable for the response and don't return yet!
         const response = await axios.get(`https://api.github.com/users/${d}`);
         return { name: response.data.name , bio: response.data.bio };
    })
    // let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    );
    return res.json(results);//res.json(results) is used, which is a more concise and expressive way to send JSON responses. It automatically sets the appropriate Content-Type header for JSON.
  } catch (err) {//added err to handle errors properly- needed to pass to next
    next(err);
  }
});

app.listen(3000, function () {
  console.log("Server starting on port 3000")
}) // added the function bc it was missing



//OLD WAY
// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);