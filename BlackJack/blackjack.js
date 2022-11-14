const { raw } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.static('private'))
app.use(express.urlencoded({ extended: false}))

let card = {
    rank: 3,
    // 1 = Ace
    // 11 = Jack
    // 12 = Queen
    // 13 = King

    suit: "hearts"
    // 1 = Hearts
    // 2 = Diamonds
    // 3 = Spades
    // 4 = Clubs
}

let deck = [];

let game = {
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    dealerKnown: 0

}

// function randomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

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

function buildDeck()
{
    deck = [];
    for (let i = 1; i < 14; i++) {
        for (let j = 1; j < 5; j++) {
            let cardT = {
                rank: i,
                suit: j
            }
            deck.push(cardT);
            // console.log(cardT);
        }
    }

}

function shuffleDeck()
{
    let tempDeck = [];
    let rand;

    while (deck.length > 0) {
        rand = Math.floor(Math.random() * deck.length)
        tempDeck.push(deck[rand])
        deck.splice(rand, 1)
    }


    deck = tempDeck;

 
}

function dealCard(deck, hand)
{
    // move one card from deck to hand
    let i = deck.length-1;
    
    hand.push(deck[i])
    deck.splice(-1)
    
}

function calcScore(hand)
{
    let score = 0;

    for (i = 0; i < hand.length; i++) 
    {
        console.log(hand[i].rank)
        switch (hand[i].rank) 
        {
            case (1):
                score += 11;
                break;
            case (11):
                score += 10;
                break;
            case (12):
                score += 10;
                break;
            case (13):
                score += 10;
                break;
            default:
                score += hand[i].rank;
                break;
        }

    }

    if (score > 21) {
        for (i = 0; i < hand.length; i++)
        {
            if (hand[i].rank == 1 && (score-10) <= 21) {
                score -= 10;
            }
        }
    }
    console.log(score);
    return score;
}

function calcKnownScore(hand)
{
    let score = 0;

    for (i = 0; i < hand.length; i++) 
    {
        console.log(hand[i].rank)
        switch (hand[i].rank) 
        {
            case (1):
                score += 11;
                break;
            case (11):
                score += 10;
                break;
            case (12):
                score += 10;
                break;
            case (13):
                score += 10;
                break;
            default:
                score += hand[i].rank;
                break;
        }

    }

    if (score == 21 && hand.length == 2) {
        return score;
    }
    return hand[0].rank;
}

function generateHand(hand, res) {
    let string = "";
    for (i = 0; i < hand.length; i++) 
    {

        switch (hand[i].rank) 
        {
            case (1):
                string += "Ace";
                break;
            case (11):
                string += "Jack";
                break;
            case (12):
                string += "Queen";
                break;
            case (13):
                string += "King";
                break;
            default:
                string += String(hand[i].rank)
                break;
        }

        string += " of "

        switch (hand[i].suit) {
            case (1):
                string += "Hearts"
                break;
            case (2):
                string += "Diamonds"
                break;
            case (3):
                string += "Spades"
                break;
            case (4):
                string += "Clubs"
                break;
            default:
                break;
        }

        res.write(`<li>${string}</li>`)
        string = "";


    }
}

function generateDealerHand(hand, res) {
    let string = "";

        switch (hand[0].rank) 
        {
            case (1):
                string += "Ace";
                break;
            case (11):
                string += "Jack";
                break;
            case (12):
                string += "Queen";
                break;
            case (13):
                string += "King";
                break;
            default:
                string += String(hand[0].rank)
                break;
        }

        string += " of "

        switch (hand[0].suit) {
            case (1):
                string += "Hearts"
                break;
            case (2):
                string += "Diamonds"
                break;
            case (3):
                string += "Spades"
                break;
            case (4):
                string += "Clubs"
                break;
            default:
                break;
        }

        res.write(`<li>${string}</li>`)
}
    // 1 = Hearts
    // 2 = Diamonds
    // 3 = Spades
    // 4 = Clubs



function restartGame()
{
    buildDeck();
    shuffleDeck();

    game = {
        playerHand: [],
        dealerHand: [],
        playerScore: 0,
        dealerScore: 0,
        dealerKnown: 0
        }

        dealCard(deck, game.playerHand)
        dealCard(deck, game.playerHand)
        dealCard(deck, game.dealerHand)
        dealCard(deck, game.dealerHand)

        game.playerScore = calcScore(game.playerHand)
        game.dealerScore = calcScore(game.dealerHand)
        game.dealerKnown = calcKnownScore(game.dealerHand)
}

function dealerHit(deck, hand)
{
    while (calcScore(hand) < 17) {
        dealCard(deck, hand);
    }

    game.dealerScore = calcScore(hand)
}

function display(res) {
    game.playerScore = calcScore(game.playerHand)
    res.write(`
    <h1>Blackjack</h1>
    <div>
        <p> Your hand:</p>
        <ul>
    `)
    generateHand(game.playerHand, res)
    res.write(`
        </ul>
        <p> Your score: ${game.playerScore}</p>`)
    if (game.playerScore > 21) {
        res.write(`<h3>BUST</h3>`)
    } else if (game.playerScore == 21) {
        res.write(`<h3>BLACKJACK</h3>`)
    }

    if (game.playerScore < 21) {
    res.write(`
    </div>

    <form method="POST" action="/hit">
    <input type="submit" value="HIT">
</form>`)
    }
    res.write(`
    </div>

    <form method="POST" action="/stand">
    <input type="submit" value="`)
    if (game.playerScore < 21) {res.write(`STAND`)} else (res.write(`CONTINUE`))
    res.write(`">
</form>`)

res.write(`
<div>
    <p>Dealer's Face Up Card:</p>
    <ul>`)
    generateDealerHand(game.dealerHand, res);

    res.write(`
    </ul>
</div>

    <form method="POST" action="/startgame">
    <input type="submit" value="START OVER">
</form>`)

}



 

restartGame();

// buildDeck();
// console.log(deck[5].rank)
// shuffleDeck();
// console.log(deck[5].rank)
// let j = 0;

console.log(game.playerHand)
console.log("hand: " + JSON.stringify(game.playerHand))

console.log(game.playerScore)
console.log(game.dealerScore)
console.log(game.dealerKnown)



// console.log(deck.length)
// for (let i = 0; i < deck.length; i++) {
//     console.log(i + ": " + deck[i].rank + " " + deck[i].suit)

// }





// console.log(deck[5].rank)

// app.get("/", (req,res) => {

// })

app.post("/hit", (req,res) => {
    dealCard(deck, game.playerHand)
    htmlStart(res);
    display(res);
    htmlEnd(res);
})

app.post("/stand", (req,res) => {
    // res.json(game)
    htmlStart(res)
    game.playerScore = calcScore(game.playerHand)
    game.dealerScore = calcScore(game.dealerHand)
    res.write(`
    <h1>Blackjack</h1>`)

    // player hand
    res.write(`
    <div>
        <p> Your hand:</p>
        <ul>
    `)
    generateHand(game.playerHand, res)
    res.write(`
        </ul>
        <p> Your score: ${game.playerScore}</p>`)
    if (game.playerScore > 21) {
        res.write(`<h3>BUST</h3>`)
    } else if (game.playerScore == 21) {
        res.write(`<h3>BLACKJACK</h3>`)
    }

    // dealer hand
    dealerHit(deck, game.dealerHand);

    res.write(`
    <div>
        <p> Dealer hand:</p>
        <ul>
    `)
    generateHand(game.dealerHand, res)
    res.write(`
        </ul>
        <p> Your score: ${game.dealerScore}</p>`)
    if (game.dealerScore > 21) {
        res.write(`<h3>BUST</h3>`)
    } else if (game.dealerScore == 21) {
        res.write(`<h3>BLACKJACK</h3>`)
    }

    

    res.write(`
    </div>
    `)
    game.playerScore = calcScore(game.playerHand)
    game.dealerScore = calcScore(game.dealerHand)
    if (game.playerScore > game.dealerScore) {
        res.write(`<h4>WIN</h4>`)
    } else if (game.playerScore == game.dealerScore) {
        res.write(`<h4>TIE</h4>`)
    } else if (game.playerScore < game.dealerScore) {
        res.write(`<h4>LOSS</h4>`)
    }

    res.write(`

    <form method="POST" action="/startgame">
    <input type="submit" value="START OVER">
</form>`)
    htmlEnd(res)
})

app.post("/startgame", (req,res) => {
    // res.json(game)
    htmlStart(res);
    restartGame();
    display(res);
    htmlEnd(res)


})




app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});