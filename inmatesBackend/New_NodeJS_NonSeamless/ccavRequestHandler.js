import http from 'http';
import fs from 'fs';
import { encrypt } from './ccavutil.js';
import qs from 'querystring';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


export const postReq = function(req, res) {
    const workingKey = process.env.CCAVENUE_WORKING_KEY; // 32-Bit key shared by CCAvenues
    const accessCode = process.env.CCAVENUE_ACCESS_CODE; // Access Code shared by CCAvenues

    const body = req.body;
    const encRequest = encrypt(JSON.stringify(body), workingKey);
    console.log(encRequest, "Encrypted Request");
    console.log("POST Request Received", req.url);
    console.log("Data Received", req.body);

    const formbody = `
        <form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
            <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
            <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
            <button type="submit">Pay Now</button>
            <script language="javascript">document.redirect.submit();</script>
        </form>
    `;
    
    console.log("Form Body: ", formbody);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(formbody);
    res.end();
};