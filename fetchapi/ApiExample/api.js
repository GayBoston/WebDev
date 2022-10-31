const { raw } = require('express');
const express = require('express');



const app = express();
const port = 3001;

app.use(express.static('public'))
app.use(express.static('private'))
app.use(express.urlencoded({ extended: false}))

function htmlStart(res)
{
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`);
}

function htmlEnd(res) 
{
    console.log("sending");
    res.write(`</body>
    </html>`);
    res.end();

};





app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});