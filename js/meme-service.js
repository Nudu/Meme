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
            line: 'Top',
            location: [0],
            locationx: 0,
            locationy: 0,
            selectedColor: '#FFFFFF',
            selectedBorderColor: '#000000',
            selectedFont: 'Impact',
            selectedFontSize: 70,
        },
        {
            line: 'Buttom',
            location: [0],
            locationx: 0,
            locationy: 0,
            selectedColor: '#FFFFFF',
            selectedBorderColor: '#000000',
            selectedFont: 'Impact',
            selectedFontSize: 70,
        },
        {
            line: 'Middle',
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