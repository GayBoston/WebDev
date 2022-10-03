// // let isSelected = [];

// // for (let el of document.querySelectorAll("#options li")) {
// //     isSelected.push(false);
// //     el.onclick = () => {
// //         // index of the element
// //         //toggle the Appropriate isSelected element
// //         let allItem = Array.from(document.querySelectorAll("#options li"));
// //         let index = allItems.indexOf(el);
// //         console.log("Index: " + index);

// //         isSelected[index] = !isSelected[index];
// //         if (isSelected[index]) {
// //             el.style.backgroundColor = "red";
// //         }
// //         else {
// //             el.style.backgroundColor = "";
// //         }


// //         if (isSelected[])
// //         el.style.backgroundColor = "red";
// //         console.log("clicked");
// //     }
// // }

// let idc = 0;
// for (let el of document.querySelectorAll("#options li")) {
//     let idxinner = idk;
//     el.onclick = () => {
//         console.log("Index = " + idxinner);
//     };
//     idx++;
// }

// let isSelected = [];

// for (let el of document.querySelectorAll("#options li")) {
//   isSelected.push(false);
//   el.onclick = () => {
//     // index of the element???
//     let allItems = Array.from(document.querySelectorAll("#options li"));
//     let index = allItems.indexOf(el);
//     //console.log("Index: " + index);
//     // toggle the appropriate isSelected element
//     isSelected[index] = !isSelected[index];
//     if (isSelected[index]) {
//       el.style.backgroundColor = "red";
//     }
//     else {
//       el.style.backgroundColor = "";
//     }
//   };
// }




// function addChosenItem(name) 
// {
//     let listItem = document.createElement("li");
//     listItem.textContent = name;
//     chosenEl.appendChild(listItem);
// }





// let optionsList = [ "thing1", "thing2", "thing3", "thing4" ];
// let chosenList = ["fake"];

// let optionsEl = document.querySelector("#options");

// for (let el of optionsList) {
//     let listItem = document.createElement("li");
//     listItem.textContent = el;
//     optionsEl.appendChild(listItem);
// }

// for (let el of chosenList) {
//     let listItem = document.createElement("li");
//     listItem.textContent = el;
//     chosenEl.appendChild(listItem);
// }


// let addButt = document.querySelector("#addButton");
// let remButt = document.querySelector("#removeButton");

// function addOption() 
// {
//     console.log("should add smth");
// }

// function moveToOptions(index)
// {
//     addChosenItem(optionsList[index]);
//     removeFromOptions(index);
//     chosenList.push(optionsList[index]);
//     optionsList.splice(index, 1);
//     console.log(optionsList)
//     console.log(chosenList);
// }

// function removeFromOptions(index)
// {
//     optionsEl.removeChild(optionsEl.childNodes[index+1]);
// }

// // addButt.onclick = addOption

// addButt.onclick = () => {
// moveToOptions(1);

// }
// //old school anonymous function

// remButt.onclick = () => {console.log("should remove"); };
// //new school arrow func.

let optionsList = ["thing1", "thing2", "thing3", "thing4"];
let chosenList = ['fake', 'fake2'];



let optionEl = document.querySelector("#options");
let chosenEl = document.querySelector("#chosen");

function addOptionsItem (name){
    let listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.onclick = () => {console.log("FAU")}
    optionEl.appendChild(listItem);
}

for(let el of optionsList){
    addOptionsItem(el);
}

// function togCol(listItem) {
//     if (listItem.style.background == "red") {
//         listItem.style.backgroundColor = "";
//     } else {
//         listItem.style.backgroundColor = "red";
//     }
// }

function addChosenItem(name){
    let listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.onclick = () => {listItem.style.backgroundColor = "red"}
    chosenEl.appendChild(listItem);
}
for(let el of chosenList){
    addChosenItem(el);
}

function removeFromOptions(index){
    optionEl.removeChild(optionEl.childNodes[index+1])
}

function removeFromChosen(index){
    chosenEl.removeChild(chosenEl.childNodes[index+1])
}

let addButt = document.querySelector("#addB");
let removeButt = document.querySelector("#removeB");


addButt.onclick = () => {moveToOptions(0)};
removeButt.onclick = () => {moveToChosen(0)};


function moveToOptions(index){

    addChosenItem(optionsList[index]);
    removeFromOptions(index);
    chosenList.push(optionsList[index]);
    optionsList.splice(index, 1);
}

function moveToChosen(index){

    addOptionsItem(chosenList[index]);
    removeFromChosen(index);
    optionsList.push(chosenList[index]);
    chosenList.splice(index, 1);
}