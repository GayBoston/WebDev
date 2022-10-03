const express = require('express');
const bodyParser = require('body-parser');
const { text } = require('body-parser');

const app = express();
const port = 3000;

let people = [ 
    { firstName: "Bob", lastName: "Jones" },
    { firstName: "Bill", lastName: "James" } 
];

app.use(express.urlencoded({ extended: false }))

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

app.get('/person/:index', (req, res) => {
    console.log(res.params);
    res.send("Hi: " + req.params.index)
})


app.get('/', (req, res) => {
    console.log(req.query.firstName);
    htmlStart(res);
    res.write(`
        <h1> Hello ${req.query.firstName} </h1>
    `);
    htmlEnd(res);
});

var textNode = "";

app.post('/', (req, res) => {
    console.log(req.body.firstName);
    let name = {firstName:req.body.firstName, lastName:req.body.lastName};
    people.push(name);
    for (el in people) {
        console.log(people[el].firstName);
        console.log(people[el].lastName);

        textNode = textNode + (people[el].firstName + " " + people[el].lastName) + "\n";

    }
    htmlStart(res);
    // res.write(`
    //     <h1> Hello ${req.body.firstName} </h1>
    //     <ul>
    //         // <li> ${people[0].firstName + " " + people[0].lastName} </li>
    //         // <li> ${people[1].firstName + " " + people[1].lastName} </li>
    //         // <li> ${people[2].firstName + " " + people[2].lastName} </li>


    //     </ul>
    //     `);

    for (el of people) {
        console.log(el.firstName);
        console.log(el.lastName);

        res.write((el.firstName + " " + el.lastName) + "\n")
    }

    htmlEnd(res);
});

app.get('/view', (req, res) => {
    htmlStart(res);

    for (el of people) {
        console.log(el.firstName);
        console.log(el.lastName);

        res.write((el.firstName + " " + el.lastName) + "\n")
    }

    htmlEnd(res);
});

app.post('/frog', (req, res) => {
    console.log("frog");
    // let name = {firstName:req.body.firstName, lastName:req.body.lastName};
    // people.push(name);
    // for (el in people) {
    //     console.log(people[el].firstName);
    //     console.log(people[el].lastName);

    //     textNode = textNode + (people[el].firstName + " " + people[el].lastName) + "\n";

    // }
    htmlStart(res);
    res.write("YOU JUST GOT FROGGED");
    people = [];

    htmlEnd(res);
});



app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});


// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'justgameit0425@gmail.com',
//     pass: 'L0vegaming'
//   }
// });

// var mailOptions = {
//   from: 'justgameit0425@gmail.com',
//   to: 'austing@mssm.org',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
