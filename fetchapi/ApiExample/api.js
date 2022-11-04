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



let players = [
            {name: "Bogdan Bogdanovic", team: "Hawks", age: 30, height: 78, link: `https://www.basketball-reference.com/players/b/bogdanbo01.html`},
            {name: "Clint Capela", team: "Hawks", age: 28, height: 82, link: `https://www.basketball-reference.com/players/c/capelcl01.html`},
            {name: "John Collins", team: "Hawks", age: 25, height: 81, link: `https://www.basketball-reference.com/players/c/collijo01.html`},
            {name: "Jarett Culver", team: "Hawks", age: 23, height: 78, link: `https://www.basketball-reference.com/players/c/culveja01.html`},
            {name: "AJ Griffin", team: "Hawks", age: 19, height: 78, link: `https://www.basketball-reference.com/players/g/griffaj01.html`},
            {name: "Aaron Holiday", team: "Hawks", age: 26, height: 72, link: `https://www.basketball-reference.com/players/h/holidaa01.html`},
            {name: "De'andre Hunter", team: "Hawks", age: 24, height: 80, link: `https://www.basketball-reference.com/players/h/huntede01.html`},
            {name: "Dejounte Murray", team: "Hawks", age: 26, height: 76, link: `https://www.basketball-reference.com/players/m/murrade01.html`},
            {name: "Trae Young", team: "Hawks", age: 24, height: 73, link: `https://www.basketball-reference.com/players/y/youngtr01.html`},
            {name: "Onyeka Okongwu", team: "Hawks", age: 21, height: 80, link: `https://www.basketball-reference.com/players/o/okongon01.html`},
            
            {name: "Jayson Tatum", team: "Celtics", age: 24, height: 80, link: `https://www.basketball-reference.com/players/t/tatumja01.html`},
            {name: "Jaylen Brown", team: "Celtics", age: 26, height: 78, link: `https://www.basketball-reference.com/players/b/brownja02.html`},
            {name: "Marcus Smart", team: "Celtics", age: 28, height: 76, link: `https://www.basketball-reference.com/players/s/smartma01.html`},
            {name: "Malcolm Brogdon", team: "Celtics", age: 29, height: 76, link: `https://www.basketball-reference.com/players/b/brogdma01.html`},
            {name: "Al Horford", team: "Celtics", age: 36, height: 81, link: `https://www.basketball-reference.com/players/h/horfoal01.html`},
            {name: "Robert Williams", team: "Celtics", age: 25, height: 81, link: `https://www.basketball-reference.com/players/w/williro04.html`},
            {name: "Derrick White", team: "Celtics", age: 28, height: 76, link: `https://www.basketball-reference.com/players/w/whitede01.html`},
            {name: "Noah Vonleh", team: "Celtics", age: 27, height: 82, link: `https://www.basketball-reference.com/players/v/vonleno01.html`},
            {name: "JD Davidson", team: "Celtics", age: 20, height: 73, link: `https://www.basketball-reference.com/players/d/davidjd01.html`},
            {name: "Danilo Gallinari", team: "Celtics", age: 34, height: 82, link: `https://www.basketball-reference.com/players/g/gallida01.html`},
            {name: "Blake Griffin", team: "Celtics", age: 33, height: 81, link: `https://www.basketball-reference.com/players/g/griffbl01.html`},
            {name: "Justin Jackson", team: "Celtics", age: 27, height: 80, link: `https://www.basketball-reference.com/players/j/jacksju01.html`},
            {name: "Mfiondu Kabengele", team: "Celtics", age: 25, height: 82, link: `https://www.basketball-reference.com/players/k/kabenmf01.html`},
            {name: "Luke Kornet", team: "Celtics", age: 27, height: 86, link: `https://www.basketball-reference.com/players/k/kornelu01.html`},
            {name: "Payton Pritchard", team: "Celtics", age: 24, height: 73, link: `https://www.basketball-reference.com/players/p/pritchpa01.html`},
            {name: "Grant Williams", team: "Celtics", age: 23, height: 78, link: `https://www.basketball-reference.com/players/w/willigr01.html`}];


            
app.get('/', (req,res) => {
    res.json(players);
})



app.get('/players', (req,res) => {
    res.json(players);
})

app.get('/players/:playerID', (req,res) => {
    res.json(players[req.params.playerID]);
})




app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});