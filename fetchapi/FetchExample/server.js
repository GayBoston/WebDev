const { raw } = require('express');
const express = require('express');



const app = express();
const port = 3000;

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

app.get('/', async (req,res) => {
    let fRes = await fetch(`http://localhost:3001/players`)
    let data = await fRes.json();
    console.log(data[1].name)


    htmlStart(res);
    // res.write(data[1].name)
    for (let player in data) {
        res.write(`<p>${data[player].name}</p>`)
    }

    htmlEnd(res);

})


app.get('/player/:ID', async (req,res) => {
    try {
    let fRes = await fetch(`http://localhost:3001/players/${req.params.ID}`)
    let data = await fRes.json();
    // console.log(data[1].name)


    htmlStart(res);
    // res.write(data[1].name)

        res.write(`<h1>${data.name}</h1>
                    <p>Age: ${data.age}</p>
                    <p>Height (in): ${data.height}</p>`)




        res.write(`
        <a href=${data.link}>go here</a>
        `)


    htmlEnd(res);
    }
    catch (err) {
        res.write(`<h1>Uh oh: ${err.message}`);
        htmlEnd(res);
    }
})


// app.get('/abc', async (req,res) => {
//     let fRes = await fetch(`http://localhost:3001`)
//     let data = await fRes.json();
//     // console.log(data[1].name)


//     htmlStart(res);
//     // res.write(data[1].name)
//     for (let player in data) {
//         res.write(`<h3>${data[player].Player}</h3>`)
//         res.write(`<p>Wingspan: ${data[player].Wingspan}`)
//     }

//     htmlEnd(res);

// })






app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});



