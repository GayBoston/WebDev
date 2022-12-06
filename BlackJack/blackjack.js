const { raw } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.static('private'))
app.use(express.urlencoded({ extended: false}))


// let p = document.createElement("p");
// let t = document.createTextNode("TADA");
// p.appendChild(t);
// document.appendChild(p);

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
    dealerKnown: 0,

    winner: 0
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

    for (let i in deck) {
        switch (deck[i].suit) {
            case 1:
                deck[i].face = "hearts";
                break;
            case 2:
                deck[i].face = "diamonds";
                break;
            case 3:
                deck[i].face = "spades";
                break;
            case 4:
                deck[i].face = "clubs";
                break;
            default:
                break;
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
    let counter = 0;

    for (i = 0; i < hand.length; i++) 
    {
        console.log(hand[i].rank)
        switch (hand[i].rank) 
        {
            case 1:
                score += 11;
                counter++;
                break;
            case 11:
            case 12:
            case 13:
                score += 10;
                break;
            default:
                score += hand[i].rank;
                break;
        }

    }
    
    while (score > 21 && counter > 0) {
        if (counter > 0) {
            score -= 10;
            counter--;
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
    let link = "BlackJack\PNG-cards-1.3\queen_of_spades2.png"
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


console.log(game.playerHand)
console.log("hand: " + JSON.stringify(game.playerHand))

console.log(game.playerScore)
console.log(game.dealerScore)
console.log(game.dealerKnown)





app.post("/hit", (req,res) => {
    dealCard(deck, game.playerHand)
    game.playerScore = calcScore(game.playerHand)
    game.dealerScore = calcScore(game.dealerHand)
    console.log(game.playerScore)
    res.json(game)
    // htmlStart(res);
    // display(res);
    // htmlEnd(res);
});

app.get('/hh', async (req,res) => {
    let aRes = await fetch("http://localhost:3000/startgame", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    let aData = await aRes.json();

    res.json(aData);

    console.log(aData);

})

app.post("/stand", (req,res) => {
    game.playerScore = calcScore(game.playerHand)
    game.dealerScore = calcScore(game.dealerHand)
    while (game.dealerScore < 16) {
        dealCard(deck, game.dealerHand);
        game.dealerScore = calcScore(game.dealerHand);
    }
    res.json(game)
//     htmlStart(res)
    // game.playerScore = calcScore(game.playerHand)
    // game.dealerScore = calcScore(game.dealerHand)
//     res.write(`
//     <h1>Blackjack</h1>`)

//     // player hand
//     res.write(`
//     <div>
//         <p> Your hand:</p>
//         <ul>
//     `)
//     generateHand(game.playerHand, res)
//     res.write(`
//         </ul>
//         <p> Your score: ${game.playerScore}</p>`)
//     if (game.playerScore > 21) {
//         res.write(`<h3>BUST</h3>`)
//     } else if (game.playerScore == 21) {
//         res.write(`<h3>BLACKJACK</h3>`)
//     }

//     // dealer hand
//     dealerHit(deck, game.dealerHand);

//     res.write(`
//     <div>
//         <p> Dealer hand:</p>
//         <ul>
//     `)
//     generateHand(game.dealerHand, res)
//     res.write(`
//         </ul>
//         <p> Dealer score: ${game.dealerScore}</p>`)
//     if (game.dealerScore > 21) {
//         res.write(`<h3>BUST</h3>`)
//     } else if (game.dealerScore == 21) {
//         res.write(`<h3>BLACKJACK</h3>`)
//     }

    

//     res.write(`
//     </div>
//     `)
//     game.playerScore = calcScore(game.playerHand)
//     if (game.playerScore > 21) {
//         game.playerScore = 0;
//     }
//     game.dealerScore = calcScore(game.dealerHand)
//     if (game.dealerScore > 21) {
//         game.dealerScore = 0;
//     }
//     console.log("Player: " + game.playerScore)
//     console.log("Dealer: " + game.dealerScore)
//     if (game.playerScore > game.dealerScore) {
//         res.write(`<h4>WIN</h4>`)
//     }
//     if (game.playerScore == game.dealerScore) {
//         res.write(`<h4>TIE</h4>`)
//     }
//     if (game.playerScore < game.dealerScore) {
//         res.write(`<h4>LOSS</h4>`)
//     }

//     res.write(`

//     <form method="POST" action="/startgame">
//     <input type="submit" value="START OVER">
// </form>`)
//     htmlEnd(res)
})

app.post("/startgame", (req,res) => {
    // htmlStart(res);
    restartGame();
    res.json(game)

    // display(res);
    // htmlEnd(res)


})




app.listen(port, () => {
    console.log(`I'm listening!!!! (on port: ${port})`);
});