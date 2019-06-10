'use strict'
let gCanvasWidth = null;
let gCanvasHeight = null;

var gImgs = [{ id: 1, url: 'img/2.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: gImgs[0].url,
    selectedColor: '#FFFFFF',
    selectedBorderColor: '#000000',
    selectedFont: 'Impact',
    selectedFontSize: 70,
    selectedAlign: 'center',
    selectedLineSize: 2,
    txts: [
        {
            line: '',
            location: [0],
            locationx: 0,
            locationy: 0,
            selectedColor: '#FFFFFF',
            selectedBorderColor: '#000000',
            selectedFont: 'Impact',
            selectedFontSize: 70,
        },
        {
            line: '',
            location: [0],
            locationx: 0,
            locationy: 0,
            selectedColor: '#FFFFFF',
            selectedBorderColor: '#000000',
            selectedFont: 'Impact',
            selectedFontSize: 70,
        },
        {
            line: '',
            location: [0],
            locationx: 0,
            locationy: 0,
            selectedColor: '#FFFFFF',
            selectedBorderColor: '#000000',
            selectedFont: 'Impact',
            selectedFontSize: 70,
        },
    ]
}

var gTrans = {
    'close-modal-btn': {
        en: 'Close',
        he: 'סגור'
    },
    'actions-read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'actions-update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'actions-delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'price-symbol': {
        en: '$',
        he: '₪'
    },
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
    
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })
        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}

// facebook api
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();

    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}