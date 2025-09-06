document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrcodeDiv = document.getElementById('qrcode');
    const errorMsg = document.getElementById('error');
    
    let qrcode = null;
    
    // Function to validate URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    // Generate QR code
    generateBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        
        if (!url || !isValidUrl(url)) {
            errorMsg.style.display = 'block';
            return;
        }
        
        errorMsg.style.display = 'none';
        qrcodeDiv.innerHTML = '';
        
        qrcode = new QRCode(qrcodeDiv, {
            text: url,
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        downloadBtn.style.display = 'block';
    });
    
    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const canvas = qrcodeDiv.querySelector('canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            
            let filename = 'qrcode';
            try {
                const urlObj = new URL(urlInput.value.trim());
                filename = 'qrcode_' + urlObj.hostname.replace(/[^a-z0-9]/gi, '_');
            } catch (_) {}
            
            downloadLink.download = filename + '.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    });
    
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});
