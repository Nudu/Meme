'use strict'
var canvas;
var ctx;

let gSelectedDrag = 0;
let gIsMouseClicked = false;
let gChoosenFont = '70px Impact'
let gFillColor = "#FFFFFF";
let gOutlineColor = "#000000"
let gSelectedImgSrc = gImgs[0].url

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    renderPic()
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function onAddLine() {
    document.querySelector("#text-edit-add").innerHTML = `
    <input class="text-drag-middle" value="Drag" type="button" onclick="onDragButton(this)" />
    <input class="text-edit-middle" placeholder="Middle Text" type="text" onkeyup="onTypeText(this)" /> `
}

function renderPic() {
    var image = new Image();
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

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    dragText('text', offsetX, offsetY)
}


function dragText(txt, x, y) {
    if (gIsMouseClicked) {
        renderPic()
        var txt = gMeme.txts[gSelectedDrag].line
        setupCanvas()
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
        gMeme.txts[gSelectedDrag].location = [x, y]
        if (gSelectedDrag === 0) {
            // debugger
            if (gMeme.txts[2].location[0] !== 0 && gMeme.txts[1].location[0] !== 0) {
                ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
                ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
            }
            else if (gMeme.txts[1].location[0] !== 0) {
                ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
                ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
                ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            }
            else if (gMeme.txts[2].location[0] !== 0) {
                ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
                ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
            }
            else {
                ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
                ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
            }
        }
        if (gSelectedDrag === 1) {
            if (gMeme.txts[2].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[1].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[1].location[0], gMeme.txts[0].location[1]);
                ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
                ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
            }
            else if (gMeme.txts[0].location[0] !== 0) {
                ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
                ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            }
            else if (gMeme.txts[2].location[0] !== 0) {
                ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
                ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
            }
            else {
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
                ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
            }
        }
        if (gSelectedDrag === 2) {
            if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            }
            else if (gMeme.txts[0].location[0] !== 0) {
                ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            }
            else if (gMeme.txts[1].location[0] !== 0) {
                ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            }
            else {
                ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
                ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
                ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));

            }
        }
    }
}

function onDragButton(ev) {
    if (ev.className === 'text-drag-top') {
        gSelectedDrag = 0
    }
    if (ev.className === 'text-drag-buttom') {
        gSelectedDrag = 1
    }
    if (ev.className === 'text-drag-middle') {
        gSelectedDrag = 2
    }

}

function onTypeText(text) {
    if (text.className === 'text-edit-top') {
        renderPic()
        let txt = text.value
        gMeme.txts[0].line = txt
        setupCanvas()
        if (gMeme.txts[0].location[0] !== 0 && gMeme.txts[1].location[0] !== 0) {
            txtSaved()
        }
        else if (gMeme.txts[0].location[0] !== 0) {
            txtSavedTop()
        }
        else {
            txtDefault()
        }
    }
    else if (text.className === 'text-edit-buttom') {
        // console.log('Bot Edited!')
        renderPic()
        let txt = text.value
        gMeme.txts[1].line = txt
        setupCanvas()
        if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
            txtSaved()
        }
        else if (gMeme.txts[1].location[0] !== 0) {
            txtSavedBot()
        }
        else {
            txtDefault()
        }
    }
    else if (text.className === 'text-edit-middle') {
        renderPic()
        let txt = text.value
        gMeme.txts[2].line = txt
        setupCanvas()
        if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
            txtSaved()
        }
        else if (gMeme.txts[1].location[0] !== 0) {
            txtSavedBot()
        }
        else {
            txtDefault()
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
        gMeme.selectedColor = element.value;
    } else if (element.id === 'outline') {
        gMeme.selectedBorderColor = element.value;
    }
    setupCanvas()
    if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
        ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
        ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    }
    else if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0 && gMeme.txts[2].location[0] !== 0) {
        txtSaved()
    }
    else if (gMeme.txts[0].location[0] !== 0) {
        txtSavedTop()
    }
    else if (gMeme.txts[2].location[0] !== 0) {
        txtSavedMid()
    }
    else if (gMeme.txts[1].location[0] !== 0) {
        txtSavedBot()
    }
    else {
        txtDefault()
    }
}

function setupCanvas() {
    ctx.fillStyle = gMeme.selectedColor
    ctx.strokeStyle = gMeme.selectedBorderColor
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.font = gChoosenFont;
}

function txtDefault() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}
function txtSavedBot() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}
function txtSavedMid() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
    ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
}
function txtSavedTop() {
    ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}
function txtSaved() {
    ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
    ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
}
