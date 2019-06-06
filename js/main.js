'use strict'
var canvas;
var ctx;

let gIsMouseClicked = false;
let gChoosenFont = '70px Impact'
let gFillColor = "#FFFFFF";
let gOutlineColor = "#000000"

function init() {
    // debugger
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    hardCodePic()
}

function hardCodePic() {
    var image = new Image();
    // image.origin = 'anonymous';
    image.src = 'img/2.jpg';
    image.crossOrigin = 'anonymous';
    renderCanvas(image)
}

function onStartDraw() {
    gIsMouseClicked = true;
}
function onStopDraw() {
    gIsMouseClicked = false;
}

function draw(ev) {
    const { offsetX, offsetY } = ev
    dragText('text' , offsetX, offsetY)
}

function dragText(txt, x, y) {
    if (gIsMouseClicked) {
        hardCodePic()
        var txt = document.querySelector('.text-edit').value
        ctx.fillStyle = gFillColor
        ctx.strokeStyle = gOutlineColor
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
        gText1Location = [x, y]
    }
}

function onTypeText() {
    hardCodePic()
    let txt = document.querySelector('.text-edit').value
    ctx.fillStyle = gFillColor
    ctx.strokeStyle = gOutlineColor
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.font = gChoosenFont;
    if (gText1Location) {
        ctx.fillText(txt, gText1Location[0],gText1Location[1]);
        ctx.strokeText(txt, gText1Location[0],gText1Location[1]);
    }
    else {
        ctx.fillText(txt, canvas.width / 2, canvas.height / 6);
        ctx.strokeText(txt, canvas.width / 2, canvas.height / 6);
    }
}


function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function downloadCanvas(elLink) {
    const data = canvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onChangeColor(element) {
    console.log(element);
    if (element.id === 'fill') {
        gFillColor = element.value;
    } else if (element.id === 'outline') {
        gOutlineColor = element.value;
    }
    onTypeText()
}


//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}