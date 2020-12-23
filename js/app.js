if (!navigator.mediaDevices) {
    document.querySelector('#js-unsupported').classList.add('is-show')
}

if (window.BarcodeDetector == undefined) {
    console.log('Barcode Detection supported');
    document.querySelector('#js-unsupported').classList.add('is-show')
}

const video  = document.querySelector('#js-video')

const checkImage = () => {
    const barcodeDetector = new BarcodeDetector()
    barcodeDetector.detect(video)
        .then(barcodes => {
            if ( barcodes.length > 0 ) {
                // QRコードの読み取りに成功したらモーダル開く
                for (let barcode of barcodes){
                    console.log(barcode)
                    openModal(barcode.rawValue)
                }
            } else {
                // QRコードが見つからなかったら再度実行
                setTimeout(() => { checkImage() }, 200)
            }
        }).catch((e) => {
            console.error("Barcode Detection failed, boo.");
        })
}

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: {
            facingMode: {
                exact: 'environment'
            }
        }
    })
    .then(function(stream) {
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
            video.play()
            checkImage()
        }
    })
    .catch(function(err) {
        alert('Error!!')
    })

const openModal = function(url) {
    document.querySelector('#js-result').innerText = url
    document.querySelector('#js-link').setAttribute('href', url)
    document.querySelector('#js-modal').classList.add('is-show')
}

document.querySelector('#js-modal-close')
    .addEventListener('click', () => {
        document.querySelector('#js-modal').classList.remove('is-show')
        checkImage()
    })
