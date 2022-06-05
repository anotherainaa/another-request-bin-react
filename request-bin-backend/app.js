const express = require('express');
const app = express();
const config = require('./lib/config');
const { PORT } = config;
const crypto = require('crypto');
const parseRequests = require('./lib/parseRequests');
const PgPersistence = require ('./lib/pg-persistence');
const { findRequests, createRequest } = require('./mongo');


app.use(express.json());

const store = new PgPersistence();

app.get('/api/bins/view/:url', async (request, response) => {
  // Check if a valid bin url
  console.log("url here!!!!!", request.params.url);

  const binId = await store.getBinId(request.params.url);
  if (!binId) {
    response.status(404).json({ error: "Bin doesn't exist"});
  }
  // Get full bin details from bin table
  const bin = await store.loadBin(binId);

  // get requests headers and etc from requests table? 
  let requests = await store.getRequests(binId);

  // Grab urlHash from psql bin and send a mongoose request
  const payloads = await findRequests(binId);
  requests = parseRequests(requests, payloads);

  // return a json with the bin details, requests and raw payload
  response.json({bin, requests});
})

app.post('/api/bins', async (request, response) => {
  // Creating a new bin
  // create a URL Hash
  const urlHash = crypto.randomBytes(20).toString('hex');

  // Create a bin in the DB 
  await store.createBin(urlHash)

  // Send back a URL hash
  response.json('/bins/view/' + urlHash)
})

// Post Request from Webhook URL
app.post('/api/bins/:url', async (request, response) => {
  const binId = await store.getBinId(request.params.url);

  const ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  const method = request.method;
  const payload = JSON.stringify(request.body) || '';
  const headers = request.headers;
  const contentType = headers['content-type'];
  const contentLength = headers['content-length'] || 0;
  const date = new Date();

  // add req to psql
  await store.addRequest(
    binId,
    ipAddress,
    method,
    JSON.stringify(headers),
    date,
    contentType,
    contentLength
  );

  await store.updateBin(binId, date); // update bin count and date
  await createRequest(binId, payload); // add payload to mongo

  response.status(200).end();
})

// Get Request from Webhook URL
app.get('/api/bins/:url', async (request, response) => {
  const binId = await store.getBinId(request.params.url);

  const ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  const method = request.method;
  const payload = JSON.stringify(request.body) || '';
  const headers = request.headers;
  const contentType = headers['content-type'];
  const contentLength = headers['content-length'] || 0;
  const date = new Date();

  // add req to psql
  await store.addRequest(
    binId,
    ipAddress,
    method,
    JSON.stringify(headers),
    date,
    contentType,
    contentLength
  );

  await store.updateBin(binId, date); // update bin count and date
  await createRequest(binId, payload); // add payload to mongo

  response.status(200).end();
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
