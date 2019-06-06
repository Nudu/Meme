'use strict'
var canvas;
var ctx;

let gIsMouseClicked = false;

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
    drawTextz('test', offsetX, offsetY)
}

function drawTextz(txt, x, y) {
    if (gIsMouseClicked) {
        hardCodePic()
        var txt = document.querySelector('.text-edit').value
        ctx.fillStyle = "#FFFFFF"
        ctx.strokeStyle = 'black'
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = "70px Impact";
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
    }
}

function drawText() {
    hardCodePic()
    let txt = document.querySelector('.text-edit').value
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = 'black'
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.font = "70px Impact";
    ctx.fillText(txt, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(txt, canvas.width / 2, canvas.height / 6);
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