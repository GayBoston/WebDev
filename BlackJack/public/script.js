
let tCard = {rank: 3, suit: 4, face: "hearts"};


document.getElementById("start").onclick = function() {start()};
document.getElementById("hit").onclick = function() {hit()};
document.getElementById("stand").onclick = function() {stand()};

async function start() 
{
    let aRes = await fetch("/startgame", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    let aData = await aRes.json();

    document.querySelector('#hit').disabled = false;
    document.querySelector('#stand').disabled = false;
    document.querySelector('#playerScore').textContent = ("Score: ");
    document.querySelector('#dealerScore').textContent = ("Score: ");
    document.querySelector('#title').textContent = ("BLACKJACK")

    let imgs = [];

    for (let i in aData.playerHand)
    {
        let value;
        switch (aData.playerHand[i].rank) {
            case 11:
                value = "jack"
                break;
            case 12:
                value = "queen"                
                break;
            case 13:
                value = "king"
                break;
            case 1:
                value = "ace"
                break;
            default:
                value = aData.playerHand[i].rank
                break;
        }

        let img = document.createElement("img");
        img.src = `PNG-cards-1.3\\${value}_of_${aData.playerHand[i].face}.png`;
        img.id = "card";
        imgs.push(img);

    }
    console.log(imgs)
    document.querySelector('#playerCards').replaceChildren(...imgs)

    let dImgs = [];
    for (i = 0; i < 1; i++) 
    {
        let value;
        switch (aData.dealerHand[i].rank) {
            case 11:
                value = "jack"
                break;
            case 12:
                value = "queen"                
                break;
            case 13:
                value = "king"
                break;
            case 1:
                value = "ace"
                break;
            default:
                value = aData.dealerHand[i].rank
                break;
        }

        let dImg = document.createElement("img");
        dImg.src = `PNG-cards-1.3\\${value}_of_${aData.dealerHand[i].face}.png`;
        dImg.id = "card";
        dImgs.push(dImg);

    }
    document.querySelector('#dealerCards').replaceChildren(...dImgs)

    console.log(aData.playerScore)
    if (aData.playerScore == 21) {
        document.querySelector('#hit').disabled = true;

        
    }
    if (aData.playerScore >= 21) {
        document.querySelector('#hit').disabled = true;
        document.querySelector('#stand').disabled = true;
    }
    let elt = document.querySelector('#playerScore')
    elt.textContent = (`Score: ${aData.playerScore}`);
    
    console.log(aData.playerHand[1].rank)
}
async function hit() {

    let aRes = await fetch("/hit", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        });

    let aData = await aRes.json();
    let imgs = [];
    console.log(aData.playerScore)


    for (let i in aData.playerHand)
    {
        let value;
        switch (aData.playerHand[i].rank) {
            case 11:
                value = "jack"
                break;
            case 12:
                value = "queen"                
                break;
            case 13:
                value = "king"
                break;
            case 1:
                value = "ace"
                break;
            default:
                value = aData.playerHand[i].rank
                break;
        }

        let img = document.createElement("img");
        img.src = `PNG-cards-1.3\\${value}_of_${aData.playerHand[i].face}.png`;
        img.id = "card";
        imgs.push(img);

        document.querySelector('#playerCards').replaceChildren(...imgs)

    }
    console.log(aData.playerScore)
    if (aData.playerScore == 21) {
        // document.querySelector('#title').textContent = ("WIN")    
        document.querySelector('#hit').disabled = true; 
        
    }

    if (aData.playerScore >= 21) {
        document.querySelector('#hit').disabled = true;
        document.querySelector('#stand').disabled = true;

        let dImgs = [];
    for (let i in aData.dealerHand)
    {
        let value;
        switch (aData.dealerHand[i].rank) {
            case 11:
                value = "jack"
                break;
            case 12:
                value = "queen"                
                break;
            case 13:
                value = "king"
                break;
            case 1:
                value = "ace"
                break;
            default:
                value = aData.dealerHand[i].rank
                break;
        }

        let dImg = document.createElement("img");
        dImg.src = `PNG-cards-1.3\\${value}_of_${aData.dealerHand[i].face}.png`;
        dImg.id = "card";
        dImgs.push(dImg);

        document.querySelector('#dealerCards').replaceChildren(...dImgs)

        let dElt = document.querySelector('#dealerScore');
        dElt.textContent = (`Score: ${aData.dealerScore}`);
    }
    }
    let elt = document.querySelector('#playerScore')
    elt.textContent = (`Score: ${aData.playerScore}`);
}


async function stand() 
{
    let aRes = await fetch("/stand", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    let aData = await aRes.json();

    document.querySelector('#hit').disabled = true;
    document.querySelector('#stand').disabled = true;

    let dImgs = [];
    for (let i in aData.dealerHand)
    {
        let value;
        switch (aData.dealerHand[i].rank) {
            case 11:
                value = "jack"
                break;
            case 12:
                value = "queen"                
                break;
            case 13:
                value = "king"
                break;
            case 1:
                value = "ace"
                break;
            default:
                value = aData.dealerHand[i].rank
                break;
        }

        let dImg = document.createElement("img");
        dImg.src = `PNG-cards-1.3\\${value}_of_${aData.dealerHand[i].face}.png`;
        dImg.id = "card";
        dImgs.push(dImg);

        document.querySelector('#dealerCards').replaceChildren(...dImgs)

        let dElt = document.querySelector('#dealerScore');
        dElt.textContent = (`Score: ${aData.dealerScore}`);
    }


    if (aData.playerScore > aData.dealerScore) {
        document.querySelector('#title').textContent = ("WIN")         
    }

}



// let im = document.createElement("img");
// im.src = `PNG-cards-1.3\\${tCard.rank}_of_${tCard.face}.png`;
// im.id = "card";
// document.getElementById("cards").appendChild(im);