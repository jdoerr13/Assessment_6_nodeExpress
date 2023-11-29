const fs = require('fs');//module providing functions for interacting with the file system (reading, writing, deleting files)
const axios = require('axios');
const { parse } = require('url'); //concise way to import only the parse function from the 'url' module, allowing you to use it directly without referencing the entire module.

async function downloadAndSave(url, outputFilename) {
    try {
      const response = await axios.get(url);
      await fs.promises.writeFile(outputFilename, response.data);
    //   console.log(response.data);
      console.log(`Wrote to ${outputFilename}`);
    } catch (error) {
      console.error(`Couldn't download ${url}`);
      console.error(error.message);
    }
  }
  
  async function processUrlsFile(filename) {
    try {
      const fileContentBuffer = await fs.promises.readFile(filename);
      const fileContent = fileContentBuffer.toString('utf-8');
      const urls = fileContent.split('\n').filter(Boolean);
  
      for (const url of urls) {//iterates over each url provided in the urls.txt
        const { hostname } = parse(url);
        const outputFilename = `${hostname}.txt`;
  
        await downloadAndSave(url, outputFilename);
      }
    } catch (error) {
      console.error(`Error reading file ${filename}`);
      console.error(error.message);
      process.exit(1);
    }
  }
  
  //beginning of run!  Error first
  // Check if the script is called with a filename argument
  if (process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1);
  }
  
  const filename = process.argv[2];
  processUrlsFile(filename);

//node urls.js urls.txt