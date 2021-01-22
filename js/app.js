window.SQR = window.SQR || {}

SQR.reader = (() => {
    if (!navigator.mediaDevices) {
        document.querySelector('#js-unsupported').classList.add('is-show')
        return
    }

    const video = document.querySelector('#js-video')

    const checkQR = () => {
        if (window.BarcodeDetector) {
            // @TODO BarcodeDetectorが使えるかどうかで処理を分岐させる
        }

        const barcodeDetector = new BarcodeDetector()
        barcodeDetector
            .detect(video)
            .then((barcodes) => {
                if (barcodes.length > 0) {
                    // QRコードの読み取りに成功したらモーダル開く
                    for (let barcode of barcodes) {
                        SQR.modal.open(barcode.rawValue)
                    }
                } else {
                    // QRコードが見つからなかったら再度実行
                    setTimeout(checkQR, 200)
                }
            })
            .catch((e) => {
                console.error('Barcode Detection failed, boo.')
            })
    }

    const initCamera = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: {
                        exact: 'environment',
                    },
                },
            })
            .then((stream) => {
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.play()
                    checkQR()
                }
            })
            .catch((err) => {
                alert('Error!!')
            })
    }

    return {
        initCamera,
        checkQR,
    }
})()

SQR.modal = (() => {
    const result = document.querySelector('#js-result')
    const link = document.querySelector('#js-result')
    const modal = document.querySelector('#js-result')
    const modalClose = document.querySelector('#js-modal-close')

    const open = (url) => {
        result.innerText = url
        link.setAttribute('href', url)
        modal.classList.add('is-show')
    }

    const close = () => {
        modal.classList.remove('is-show')
        SQR.reader.checkQR()
    }

    modalClose.addEventListener('click', () => {
        close()
    })

    return {
        open,
    }
})()

if (SQR.reader) SQR.reader.initCamera()
