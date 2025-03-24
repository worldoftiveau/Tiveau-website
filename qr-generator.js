// Fix for QR code generation issues
document.addEventListener('DOMContentLoaded', () => {
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.error("QRCode library not loaded!");
        // Load QRCode library dynamically if not available
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
        script.onload = generateQRCodes;
        document.head.appendChild(script);
    } else {
        // Generate QR codes if library is already loaded
        generateQRCodes();
    }
});

// Generate QR codes for WhatsApp and Email
function generateQRCodes() {
    console.log("Generating QR codes...");
    
    // WhatsApp QR Code
    const whatsappQR = document.getElementById('whatsapp-qr');
    if (whatsappQR) {
        const whatsappNumber = '+31619045546';
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;
        
        // Clear any existing content
        while (whatsappQR.firstChild) {
            whatsappQR.removeChild(whatsappQR.firstChild);
        }
        
        // Generate new QR code
        QRCode.toCanvas(whatsappQR, whatsappUrl, {
            width: whatsappQR.clientWidth || 200,
            height: whatsappQR.clientHeight || 200,
            margin: 1,
            color: {
                dark: '#0e0e0e', // Matte black
                light: '#ffffff' // White
            }
        }, (error) => {
            if (error) console.error('Error generating WhatsApp QR code:', error);
            else console.log("WhatsApp QR code generated successfully");
        });
    }
    
    // Email QR Code
    const emailQR = document.getElementById('email-qr');
    if (emailQR) {
        const emailAddress = 'info@tiveau.nl';
        const emailUrl = `mailto:${emailAddress}`;
        
        // Clear any existing content
        while (emailQR.firstChild) {
            emailQR.removeChild(emailQR.firstChild);
        }
        
        // Generate new QR code
        QRCode.toCanvas(emailQR, emailUrl, {
            width: emailQR.clientWidth || 200,
            height: emailQR.clientHeight || 200,
            margin: 1,
            color: {
                dark: '#0e0e0e', // Matte black
                light: '#ffffff' // White
            }
        }, (error) => {
            if (error) console.error('Error generating Email QR code:', error);
            else console.log("Email QR code generated successfully");
        });
    }
}

// Handle window resize events
window.addEventListener('resize', () => {
    // Regenerate QR codes on window resize for proper scaling
    if (typeof generateQRCodes === 'function') {
        generateQRCodes();
    }
});
