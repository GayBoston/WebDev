const fs = require('fs')



let mydata = [ 
    {thing1: "hello",
    thing2: 27},
    { thing1: "goodbye",
    thing2: 72}
];

let jsonString = JSON.stringify(mydata)

console.log(mydata[1]);
console.log(jsonString);
console.log(jsonString[0]);

fs.writeFileSync("jsonData.json", jsonString);

let jsonStringFromFile = fs.readFileSync('jsonData.json', { encoding: 'utf8'});

console.log("fromFile:")
console.log("jsonStringFromFile")

let dataFromFile = JSON.parse(jsonStringFromFile);

console.log("After JSON.parse")
console.log(dataFromFile)

console.log(dataFromFile[0].thing1)





// console.log("helllo3");

// const fs = require('fs')

// let data = fs.readFileSync('data.txt', { encoding: 'utf8'});

// console.log(data);

// let data2 = fs.readFile('data.txt's, { encoding: 'utf8'}, (err, data) => {
//     console.log("done reading file");
//     console.log(err.message)
//     console.log(data);

// });


// console.log("woohoo!!!");