'use strict'
var canvas;
var ctx;

let gCurrLang = 'en'
let gSelectedDrag = 0;
let gIsMouseClicked = false;


function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    renderPic()
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    init()
    doTrans();
}

function setLang(lang) {
    gCurrLang = lang;
}

//When Choosing a new picture from the PC
function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function onAddLine() {
    document.querySelector("#text-edit-add").innerHTML = `
    <input class="btn btn-primary btn-sm" id="text-drag-middle" value="Drag" type="button" onclick="onDragButton(this)" />
    <br>
    <input class="text-edit-middle" placeholder="Middle Text" type="text" onkeyup="onTypeText(this)" /> `
}

function renderPic() {
    var image = new Image();
    image.src = gMeme.selectedImgId
    image.crossOrigin = 'anonymous';
    gCanvasWidth = image.width
    gCanvasHeight = image.height;
    gMeme.txts[0].locationx = gCanvasWidth / 2.4
    gMeme.txts[0].locationy = gCanvasHeight / 6
    gMeme.txts[1].locationx = gCanvasWidth / 2.8
    gMeme.txts[1].locationy = gCanvasHeight / 2
    gMeme.txts[2].locationx = gCanvasWidth / 2.8
    gMeme.txts[2].locationy = gCanvasHeight - gCanvasHeight / 40
    renderCanvas(image)
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        gMeme.selectedImgId = img.src
    }
    reader.readAsDataURL(ev.target.files[0]);
}

//Simple Function to control our onmousemove event to only happen when we are clicking.
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

//This Function Was Aimed to replace the dragText Function since it was so bloated. couldn't get it to work after a lot of effort.
function forEachDraw() {
    gMeme.txts.forEach((txts) => {
        ctx.font = txts.selectedFontSize + 'px ' + txts.selectedFont;
        ctx.fillStyle = txts.selectedColor;
        ctx.strokeStyle = txts.selectedBorderColor;
        ctx.fillText(txts.line, txts.locationx, txts.locationy);
        ctx.strokeText(txts.line, txts.locationx, txts.locationy);
    })
}

function dragText(txt, x, y) {
    if (gIsMouseClicked) {
        renderPic()
        var txt = gMeme.txts[gSelectedDrag].line
        setupCanvasSettings()
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
        gMeme.txts[gSelectedDrag].location = [x, y]
        gMeme.txts[gSelectedDrag].locationx = x;
        gMeme.txts[gSelectedDrag].locationy = y;
        if (gSelectedDrag === 0) {
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
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
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

//Switching beetwin dragging different text lines.
function onDragButton(ev) {
    if (ev.id === 'text-drag-top') {
        gSelectedDrag = 0
    }
    if (ev.id === 'text-drag-buttom') {
        gSelectedDrag = 1
    }
    if (ev.id === 'text-drag-middle') {
        gSelectedDrag = 2
    }

}

function onTypeText(text) {
    if (text.className === 'text-edit-top') {
        renderPic()
        let txt = text.value
        gMeme.txts[0].line = txt
        setupCanvasSettings()
        if (gMeme.txts[0].location[0] !== 0 && gMeme.txts[1].location[0] !== 0) {
            renderTxtSavedLoc()
        }
        else if (gMeme.txts[0].location[0] !== 0) {
            renderTxtSavedTop()
        }
        else {
            renderTxtDefaultLoc()
        }
    }
    else if (text.className === 'text-edit-buttom') {
        // console.log('Bot Edited!')
        renderPic()
        let txt = text.value
        gMeme.txts[1].line = txt
        setupCanvasSettings()
        if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
            renderTxtSavedLoc()
        }
        else if (gMeme.txts[0].location[0] !== 0) {
            renderTxtSavedTop()
        }
        else if (gMeme.txts[1].location[0] !== 0) {
            renderTxtSavedBot()
        }
        else {
            renderTxtDefaultLoc()
        }
    }
    else if (text.className === 'text-edit-middle') {
        renderPic()
        let txt = text.value
        gMeme.txts[2].line = txt
        setupCanvasSettings()
        if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
            renderTxtSavedLoc()
        }
        else if (gMeme.txts[0].location[0] !== 0) {
            renderTxtSavedTop()
        }
        else if (gMeme.txts[1].location[0] !== 0) {
            renderTxtSavedBot()
        }
        else {
            renderTxtDefaultLoc()
        }
    }
}




function onDownloadCanvas(elLink) {
    const data = canvas.toDataURL()
    elLink.href = data
    elLink.download = 'Meme.jpg'
}

function onSetFontSize(ev) {
    renderPic()
    gMeme.selectedFontSize = ev.value
    setupCanvasSettings()
    if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0 && gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedLoc()
    }
    else if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
        ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
        ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    }
    else if (gMeme.txts[0].location[0] !== 0) {
        renderTxtSavedTop()
    }
    else if (gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedMid()
    }
    else if (gMeme.txts[1].location[0] !== 0) {
        renderTxtSavedBot()
    }
    else {
        renderTxtDefaultLoc()
    }
}
function onUpdateFont(ev) {
    renderPic()
    gMeme.selectedFont = ev.value
    setupCanvasSettings()
    if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0 && gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedLoc()
    }
    else if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
        ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
        ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    }
    else if (gMeme.txts[0].location[0] !== 0) {
        renderTxtSavedTop()
    }
    else if (gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedMid()
    }
    else if (gMeme.txts[1].location[0] !== 0) {
        renderTxtSavedBot()
    }
    else {
        renderTxtDefaultLoc()
    }
}

function onChangeColor(element) {
    if (element.id === 'fill') {
        gMeme.selectedColor = element.value;
    } else if (element.id === 'outline') {
        gMeme.selectedBorderColor = element.value;
    }
    setupCanvasSettings()
    if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0 && gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedLoc()
    }
    else if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
        ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
        ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    }
    else if (gMeme.txts[0].location[0] !== 0) {
        renderTxtSavedTop()
    }
    else if (gMeme.txts[2].location[0] !== 0) {
        renderTxtSavedMid()
    }
    else if (gMeme.txts[1].location[0] !== 0) {
        renderTxtSavedBot()
    }
    else {
        renderTxtDefaultLoc()
    }
}

function setupCanvasSettings() {
    ctx.fillStyle = gMeme.selectedColor
    ctx.strokeStyle = gMeme.selectedBorderColor
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.font = gMeme.selectedFontSize + 'px ' + gMeme.selectedFont;
}

//Render the 3 Lines - each in its default location
function renderTxtDefaultLoc() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}
//Render the 3 Lines - 2 in its default location and buttom as its saved location
function renderTxtSavedBot() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}

//Render the 3 Lines - 2 in its default location and middle as its saved location
function renderTxtSavedMid() {
    ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
    ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
}

//Render the 3 Lines - 2 in its default location and top as its saved location
function renderTxtSavedTop() {
    ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
    ctx.fillText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
    ctx.strokeText(gMeme.txts[2].line, canvas.width / 2, canvas.height - (canvas.height / 2.5));
}

//Render the 3 Lines all in their saved locations
function renderTxtSavedLoc() {
    ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
    ctx.fillText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
    ctx.strokeText(gMeme.txts[2].line, gMeme.txts[2].location[0], gMeme.txts[2].location[1]);
}
