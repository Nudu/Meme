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

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    dragText('text', offsetX, offsetY)
}

// function checkClickedLine(ev) {
//     const x = ev.offsetX
//     const y = ev.offsetY

//     const clickedLine = gCelebs.find(celeb => {
//         return (
//             celeb.x <= x &&
//             celeb.x + BAR_WIDTH >= x &&
//             celeb.y <= y &&
//             celeb.y + (HEIGHT_FACTOR * celeb.rate) >= y
//         )
//     })

//     const elModal = document.querySelector('.modal');
//     if (!clickedLine) {
//         elModal.style.display = 'none'
//         return
//     }
//     elModal.style.display = 'block'
//     elModal.style.top = ev.pageX
//     elModal.style.left = ev.pageY

//     document.querySelector('#celeb-name').innerText = clickedLine.name;
//     document.querySelector('#celeb-rate').innerText = clickedLine.rate;


//     console.log(clickedLine)
// }

function dragText(txt, x, y) {
    if (gIsMouseClicked) {
        hardCodePic()
        var txt = gMeme.txts[gSelectedDrag].line
        ctx.fillStyle = gMeme.selectedColor
        ctx.strokeStyle = gMeme.selectedBorderColor
        ctx.textBaseline = 'middle';
        ctx.textAlign = gMeme.txts[gSelectedDrag].align;
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
        gMeme.txts[gSelectedDrag].location = [x, y]
        if (gSelectedDrag === 0) {
            if (gMeme.txts[1].location[0] !== 0) {
                ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
                ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            }
            else {
                ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
                ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
            }
        }
        if (gSelectedDrag === 1) {
            if (gMeme.txts[0].location[0] !== 0) {
                ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
                ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            }
            else {
                ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
                ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
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

}

function onTypeText(text) {
    if (text.className === 'text-edit-top') {
        hardCodePic()
        let txt = text.value
        gMeme.txts[0].line = txt
        ctx.fillStyle = gMeme.selectedColor
        ctx.strokeStyle = gMeme.selectedBorderColor
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        if (gMeme.txts[0].location[0] !== 0 && gMeme.txts[1].location[0] !== 0) {
            ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        }
        else if (gMeme.txts[0].location[0] !== 0) {
            ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            ctx.fillText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
            ctx.strokeText(gMeme.txts[1].line, canvas.width / 2, canvas.height - (canvas.height / 9));
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
        ctx.fillStyle = gMeme.selectedColor
        ctx.strokeStyle = gMeme.selectedBorderColor
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.font = gChoosenFont;
        if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
            ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
            ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
            ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        }
        else if (gMeme.txts[1].location[0] !== 0) {
            ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
            ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
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
    ctx.fillStyle = gMeme.selectedColor
    ctx.strokeStyle = gMeme.selectedBorderColor
    ctx.font = gChoosenFont;
    if (gMeme.txts[1].location[0] !== 0 && gMeme.txts[0].location[0] !== 0) {
        ctx.fillText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.strokeText(gMeme.txts[1].line, gMeme.txts[1].location[0], gMeme.txts[1].location[1]);
        ctx.fillText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
        ctx.strokeText(gMeme.txts[0].line, gMeme.txts[0].location[0], gMeme.txts[0].location[1]);
    }
    else if (gMeme.txts[1].location[0] !== 0) {
        ctx.fillText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
        ctx.strokeText(gMeme.txts[0].line, canvas.width / 2, canvas.height / 6);
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
