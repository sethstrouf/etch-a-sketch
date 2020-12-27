function removeBoxes() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function createBoxes(side) {
    //1000 is gridContainer size
    let sideLength = 1000 / side;
    //counter if for assigning id numbers
    let counter = 0;

    for(i=0; i<side; i++) {
        for(j=0; j<side; j++) {
            let element = document.createElement("div");
            element.classList.add("grid-box");
            element.setAttribute("id",counter);
            element.style.width = sideLength + "px";
            element.style.height = sideLength + "px";
            gridContainer.append(element);
            counter++;
        }
    }
    gridBoxes = document.querySelectorAll(".grid-box");
    listenForBoxes();
}

function onHover() {
    if(isRainbow===true) {
        let rand = Math.floor(Math.random()*6);
        switch(rand) {
            case 0: 
                bgColor = "red" 
                break;
            case 1: 
                bgColor = "orangered";
                break
            case 2: 
                bgColor = "yellow";
                break
            case 3: 
                bgColor = "green";
                break
            case 4: 
                bgColor = "blue";
                break
            case 5: 
                bgColor = "purple";
                break
        }
    }
    this.style.backgroundColor = bgColor;
}

function offHover() {
    //if no painted class, take away hover color
    if(this.getAttribute("class")==="grid-box") {
            this.style.backgroundColor = "rgba(0,0,0,0)";
    }
}

function paintBox() {
    this.classList.add("painted");
}

function listenForBoxes() {
    gridBoxes.forEach(box => {
        box.addEventListener("mouseover", onHover);
        box.addEventListener("click", paintBox);
        box.addEventListener("mouseout", offHover);
    });
}

//string to get value of selected input
const select = document.getElementById("select");
let isRainbow = false;
let bgColor =  select.options[select.selectedIndex].value;
const gridContainer = document.querySelector(".grid-container");
let gridBoxes;
const resetButton = document.getElementById("reset");
//default grid
createBoxes(8);

resetButton.addEventListener("click", () => {
    let num = prompt("Enter how many boxes per side (1-100)");
    if(num >= 1 && num <= 100) {
        removeBoxes();
        createBoxes(num);
    } else {
        alert("Failed: Not a number between 1-100!")
    }
});

select.addEventListener("click", () => {
    bgColor =  select.options[select.selectedIndex].value;

    gridBoxes.forEach(box => {
        box.className = "grid-box";
    });

    if(bgColor==="rainbow") {
        isRainbow=true;
    } else {
        isRainbow=false;
    }
});