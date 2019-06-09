'use strict'
var canvas;
var ctx;

let gIsMouseClicked = false;
let gChoosenFont = '70px Impact'
let gFillColor = "#FFFFFF";
let gOutlineColor = "#000000"
let gSelectedImgSrc = gImgs[0].url

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    hardCodePic()
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
    // ctx.fillText(gMeme.txts[0].line, gText1Location[0], gText1Location[1]);
    // ctx.strokeText(gMeme.txts[0].line, gText1Location[0], gText1Location[1]);
}

function hardCodePic() {
    var image = new Image();
    // image.src = 'img/2.jpg';
    image.src = gSelectedImgSrc
    image.crossOrigin = 'anonymous';
    renderCanvas(image)
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        gSelectedImgSrc = img.src
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function onStartDraw() {
    gIsMouseClicked = true;
}
function onStopDraw() {
    gIsMouseClicked = false;
}

function draw(ev) {
    const { offsetX, offsetY } = ev
    dragText('text', offsetX, offsetY)
}

function dragText(txt, x, y) {
    if (gIsMouseClicked) {
        hardCodePic()
        var txt = gMeme.txts[0].line
        ctx.fillStyle = gMeme.txts[0].color
        ctx.strokeStyle = gMeme.txts[0].bordercolor
        ctx.textBaseline = 'middle';
        ctx.textAlign = gMeme.txts[0].align;
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
        gText1Location = [x, y]
        // ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
        // ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
        ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
        ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    }
}


function onTypeText(text) {
    if (text.className === 'text-edit-top') {
        hardCodePic()
        let txt = text.value
        gMeme.txts[0].line = txt
        ctx.fillStyle = gMeme.txts[0].color
        ctx.strokeStyle = gMeme.txts[0].bordercolor
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        if (gText1Location) {
            ctx.fillText(gMeme.txts[0].line, gText1Location[0], gText1Location[1]);
            ctx.strokeText(gMeme.txts[0].line, gText1Location[0], gText1Location[1]);
        }
        else {
            ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
            ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
            ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
            ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
        }
    }
    else if (text.className === 'text-edit-buttom') {
        // console.log('Bot Edited!')
        hardCodePic()
        let txt = text.value
        gMeme.txts[1].line = txt
        ctx.fillStyle = gMeme.txts[1].color
        ctx.strokeStyle = gMeme.txts[1].bordercolor
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        if (gText2Location) {
            ctx.fillText(gMeme.txts[1].line, gText2Location[0], gText2Location[1]);
            ctx.strokeText(gMeme.txts[1].line, gText2Location[0], gText2Location[1]);
        }

        else {
            ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
            ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
            ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
            ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
        }
    }
}


function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}


function downloadCanvas(elLink) {
    const data = canvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onChangeColor(element) {
    if (element.id === 'fill') {
        gMeme.txts[0].color = element.value;
    } else if (element.id === 'outline') {
        gMeme.txts[0].bordercolor = element.value;
    }
    onTypeText()
}
