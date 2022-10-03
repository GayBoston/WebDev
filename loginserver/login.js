const { raw } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))


let rusers = [];


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


app.post('/register', (req, res) => {

    let reguser = {firstName:req.body.firstName, lastName:req.body.lastName, username:req.body.username, email:req.body.email, password:req.body.password};
    rusers.push(reguser);

    res.redirect('/');

})

app.post('/login', (req, res) => {
    let logat = {username:req.body.username, email:req.body.email, password:req.body.password};

    for (el in rusers) {
        if (rusers[el].username == logat.username && rusers[el].passwrod == logat.password) {
            console.log("Success");
            res.redirect('/profile');
        }
    }

    htmlStart(res);
    res.write(`<p>Success</p>`)
    htmlEnd(res);


})

app.get('/profile', (req, res) => {

    htmlStart(res);
    res.write(`
    <ul>
        <li>First Name: ${rusers[0].firstName}

    </ul>
    
    `)

    htmlEnd(res);

})



app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});