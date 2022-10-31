const { raw } = require('express');
const express = require('express');
const session = require('express-session');
const fs = require('fs')



const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.static('private'))

app.use(session({
    secret: 'mother may i',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, maxAge: 10}
}))



let loggedIn = false;
let user;

let rusers = [];
let testu = {firstName: "G", lastName: "A", username: "GA123", email: "austing@mssm.org", password: "GA123"};
// rusers.push(testu);


// fs.writeFileSync("rusers.json", JSON.stringify(rusers[0]))


let dataFromFile = JSON.parse(fs.readFileSync("rusers.json", { encoding: 'utf8' }));
for (el in dataFromFile) {
    rusers.push(dataFromFile[el]);
    console.log(rusers[el])
}
//fs.write and add this user above^^^^^^

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











// rusers[0].firstName = "Gabriel";
// rusers[0].lastName = "Austin";
// rusers[0].username = "GA123";
// rusers[0].email = "austing@mssm.org";
// rusers[0].password = "GA123";


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
    fs.writeFileSync("rusers.json", JSON.stringify(rusers))

    res.redirect('/');

})

app.get('/posts', (req, res) => {
    console.log(req.body.contents);
    htmlStart(res);
    res.write(`
    <h1>Posts!</h1>


    <!-- <form method="GET" action="/posts">
        <input type="button" onclick="location.href='/posts';" id="add">
    </form> -->
    <button onclick="location.href='/createPosts';">Add Post</button>


`)

    for (el in test) {
        res.write(`
        <link rel="stylesheet" href="styless.css">
        <h3>${test[el].title}</h1>
        <p>${test[el].content}</p>
        <p style="color:grey;">By ${test[el].author}</p>
    `)
}

    res.write(`
        <button onclick="location.href='/active';">BACK</button>
    `)

    htmlEnd(res);
})


let test = [];


let postData = JSON.parse(fs.readFileSync("posts.json", { encoding: 'utf8' }));
for (el in postData) {
    test.push(postData[el]);
    // console.log(test[el])
}

function myFunc(el) {
    test.splice(el, 1);
}

app.post('/posts', (req, res) => {
    htmlStart(res);
    res.write(
        `<link rel="stylesheet" href="stylesheet.css">
        <h1>POSTS!</h1>
        <button onclick="location.href='/createPosts';">Add Post</button>
`
    )
    let tcont = {title:req.body.title, content:req.body.contents, author:rusers[user].username};
    test.push(tcont);
    fs.writeFileSync("posts.json", JSON.stringify(test));




    res.write(`<form method="POST" action="/posts">`);
    for (el in test) {
        res.write(`<div>
        <input type="checkbox" id="title" value="title">
        <label for "title">${test[el].title}</label>
        </div>`)
    }
    res.write(`
    <div>
    <input type="submit" value="Delete Selected", name="Delete Selected">
    </div>
    </form>`)

    for (el in test) {
        res.write(`
        <link rel="stylesheet" href="styless.css">
        <h3>${test[el].title}</h1>
        <p>${test[el].content}</p>
        <p style="color:grey;">By ${test[el].author}</p>
        `)
        // if (test[el].author == rusers[user].username) {
        //     res.write(`
        //     <button onclick="myFunc(${el})">Delete</button>
        //     `)
        // }
        // console.log(test[el].author + " vs " + rusers[user].username)

    }
// req.session.cookie.author

    res.write(`
    <button onclick="location.href='/active';">BACK</button>
    `)

    htmlEnd(res);
})
// let examp = {title: "Test", content: "Contents", author: "ME"};

// fs.writeFileSync("posts.json", JSON.stringify(examp));


// for (el in test) {
// fs.writeFileSync("posts.json", JSON.stringify(test[el]))
// }

app.get('/createPosts', (req, res) => {
    // res.redirect('/loginserver/private/posts.html');
    htmlStart(res);
    res.write(`
    <form method="POST" action="/posts">
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
            req.session.userid=req.body.username;
            console.log(req.session);
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

    <p>Hello, ${rusers[user].firstName}</p>
    <ul>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/posts">Posts</a></li>
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