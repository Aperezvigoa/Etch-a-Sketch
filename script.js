const screenSize = 800;
const pastelHexArray = ["#AEC6CF","#77DD77","#DEA5A4","#B39EB5","#FFB347","#FF6961","#CB99C9","#FDFD96","#F4C2C2","#BFEFFF","#B0E0A8","#FFD1DC","#E6E6FA","#FFE5B4","#FFFACD","#AAF0D1","#CCF1FF","#E0D7FF","#FFCCE1","#D7EEFF","#FAFFC7","#E0BBE4","#957DAD","#D291BC","#FEC8D8","#FFDFD3","#FFADAD","#FFD6A5","#FDFFB6","#CAFFBF","#9BF6FF","#A0C4FF","#BDB2FF","#FFC6FF"];
const container = document.querySelector(".container");
container.style.width = screenSize + "px";
container.style.height = screenSize + "px";

let pixelDensity = 16;
let pixelsToDraw = pixelDensity * pixelDensity;
let pixelMeasure = screenSize / pixelDensity;


const densBtn = document.querySelector("#density");
const gridBtn = document.querySelector("#grid");
const delBtn = document.querySelector("#delete");

densBtn.addEventListener("click", () => {
    pixelDensity = requestPixelDensity();
    pixelsToDraw = pixelDensity * pixelDensity;
    pixelMeasure = screenSize / pixelDensity;
    deletePixels(container);
    drawPixels();
    draw();
})

gridBtn.addEventListener("click", () => {
    turnGrid();
})

delBtn.addEventListener("click", () => {
    deletePixels(container);
    drawPixels();
    draw();
})

function requestPixelDensity() {
    let inputDensity = parseInt(prompt("Input the number of pixels, between 1 to 100."));
    if (inputDensity <= 0) {
        return 1;
    } else if (inputDensity > 100) {
        return 100;
    } else {
        return inputDensity;
    }
}

function drawPixels() {
    for (let i = 0; i < pixelsToDraw; i++) {
        const pixel = document.createElement("div");
        pixel.style.height = pixelMeasure + "px";
        pixel.style.width = pixelMeasure + "px";
        pixel.classList.add("pixel");
        pixel.setAttribute("data-pixel", "");
        container.appendChild(pixel);
    }
}

function deletePixels(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function getColor() {
    let randomIndex = Math.floor(Math.random() * pastelHexArray.length);
    return pastelHexArray[randomIndex];
}

function draw() {
    let pixels = document.querySelectorAll(".pixel");
    for (let pix of pixels) {
        pix.addEventListener(("mousemove"), () => {
            pix.style.backgroundColor = getColor();
        });
    }
}


function turnGrid() {
    document.querySelectorAll("[data-pixel]").forEach(pix => {
        pix.classList.toggle("pixel");
    });
}



drawPixels();
draw();

