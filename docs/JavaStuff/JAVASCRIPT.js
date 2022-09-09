let data = ["This", "is", "a", "test"];

function addP (x) {
    for (let a in x) {
        newP = document.createElement('p');
        newT = document.createTextNode(x[a]);

        newP.appendChild(newT);

        const curP = document.querySelector('p');
        document.body.append(newP);
    }
}

addP(data);