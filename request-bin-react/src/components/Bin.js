import { useParams } from "react-router-dom";
import psql from "../services/bins.js"

const Bin = () => {
  let { url } = useParams();
  console.log(url);
  const bin = psql.getOne(url);
  console.log(bin);
  return (
    <>
      <p>Hello world</p>
      {/* <h3>Your Bin</h3>
      <p><b>Request Count: {bin.request_count} </b></p>
      <p><b>Created: {bin.date_created}</b></p>
      <p><b>Last: {bin.date_last_used}</b></p>
      <p><b>Link:</b> <input type="text" value={bin.url} /></p> */}
    </>
  )
}

export default Bin;

/*

{
  "bin": {
  "id": 18,
  "url": "f6d19a8d22f752c3c95fa12e81dab3653d00d53e",
  "date_created": "2022-06-05T18:59:24.697Z",
  "date_last_used": "2022-06-05T19:02:34.628Z",
  "request_count": 2,
  "active": true
  },
  "requests": [
  {
    "id": 47,
    "bin_id": 18,
    "ip_address": "::1",
    "request_method": "POST",
    "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.64.1",
    "accept": "* /*",
    "content-length": "9",
    "content-type": "application/x-www-form-urlencoded"
    },
    "received_at": "2022-06-05T19:02:34.628Z",
    "content_type": "application/x-www-form-urlencoded",
    "content_length": 9,
    "payLoad": "{}"
    }
    ]
}

Bin details
- Bin endpoint URL
- Date created 
- last created - leave it to later
- Count - defer to later

Request Componenent
- request data 
  - request ID
  - headers
  - body

<article>
  <h3>Your Bin</h3>
  <p><b>Request Count: </b>{{ binData.request_count }}</p>
  <p><b>Created: </b>{{ binData.date_created }}</p>
  <p><b>Last: </b>{{ binData.date_last_used }}</p>
  <p><b>Link:</b> <input type="text" value={{ url }}></p>
</article>

*/