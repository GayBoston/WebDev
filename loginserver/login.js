const { raw } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.static('private'))

let loggedIn = false;
let user;

app.use('/profile', (req, res, next) => {
    console.log(req.url);

    if (loggedIn === true) {
        next();
    } else {
        res.send(`
            <p> NOOO YOURE NOT LOGGED IN </p>
            <a href="/">GO BACK</a>
        `)
    }
})

app.use('/posts.html', (req, res, next) => {
    console.log(req.url);

    if (loggedIn === true) {
        next();
    } else {
        res.send(`
            <p> NOOO YOURE NOT LOGGED IN </p>
            <a href="/">GO BACK</a>
        `)
    }
})


app.use(express.urlencoded({ extended: false }))










let rusers = [];
rusers[0].firstName = "Gabriel";
rusers[0].lastName = "Austin";
rusers[0].username = "GA123";
rusers[0].email = "austing@mssm.org";
rusers[0].password = "GA123";


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

app.get('/posts', (req, res) => {
    htmlStart(res);
    res.write(`
    <h1>Posts!</h1>


    <!-- <form method="GET" action="/posts">
        <input type="button" onclick="location.href='/posts';" id="add">
    </form> -->
    <button onclick="location.href='/createPosts';">Add Post</button>


`)

    htmlEnd(res);



})

app.get('/createPosts', (req, res) => {
    // res.redirect('/loginserver/private/posts.html');
    htmlStart(res);
    res.write(`
    <form method="POST" action="/posts.html">
        <div>
            <label for="title">Post Title: </label>
            <input type="text" name="title" id="title">
        </div>
        <div>
            <label for="contents">Post Title: </label>
            <input type="text" name="contents" id="cont">
        </div>
        <div>
            <input type="submit" value="POST IT!" name="post" id="post">
        </div>
    </form>
    
    `)

    htmlEnd(res);
})






app.post('/login', (req, res) => {
    let logat = {username:req.body.username, email:req.body.email, password:req.body.password};

    for (el in rusers) {
        console.log(rusers[el].username + " vs " + logat.username + "   " + rusers[el].password + " vs " + logat.password);
        if (rusers[el].username === logat.username && rusers[el].password === logat.password && rusers[el].email === logat.email) {
            console.log("Success");
            loggedIn = true;
            user = el;
            res.redirect('/active');
            return;
        }
    }

    htmlStart(res);
    res.write(`<p>Success</p>`)
    htmlEnd(res);

})

app.get('/active', (req, res) => {
    htmlStart(res);
    res.write(`

    <p>Hello, ${rusers[el].firstName}</p>
    <ul>
        <li><a href="/profile">Profile</a></li>
    </ul>

    `)
})

app.get('/profile', (req, res) => {

    htmlStart(res);
    res.write(`
    <h1>Profile</h1>
    `)
    if (loggedIn) {
    res.write(`
    <ul>
        <li>First Name: ${rusers[user].firstName}</li>
        <li>Last Name: ${rusers[user].lastName}</li>
        <li>Username: ${rusers[user].username}</li>
        <li>Email Address: ${rusers[user].email}</li>




    </ul>

    <ul>
        <li><a href="/active">Back</a></li>

        <li><a href="/logout">Logout</a></li>

    </ul>

    
    `)
    } else {
        res.write(`
        <p> You are not logged in </p>
        `)
    }

    htmlEnd(res);

})

app.get('/logout', (req, res) => {
    loggedIn = false;
    res.redirect('/');

})



app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});