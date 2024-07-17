// import React, { useState, useRef, useEffect } from 'react';
// import { Container, Message, Segment, Header, Button } from 'semantic-ui-react';
// import jsQR from 'jsqr';
// import { useAuth } from '../context/AuthContext';
// import { backApi } from '../misc/BackApi';
// import { handleLogError } from '../misc/Helpers';
// import { useNavigate } from 'react-router-dom';
//
// const ScanQR = () => {
//     const { getUser } = useAuth();
//     const navigate = useNavigate();
//     const [error, setError] = useState(null);
//     const [transactionDetails, setTransactionDetails] = useState(null);
//     const [scanning, setScanning] = useState(false);
//     const videoRef = useRef(null);
//
//     const handleScanQR = () => {
//         setScanning(true);
//         setError(null);
//         setTransactionDetails(null);
//     };
//
//     useEffect(() => {
//         handleScanQR();
//     }, []);
//
//     useEffect(() => {
//         if (scanning) {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             const video = videoRef.current;
//
//             navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
//                 video.srcObject = stream;
//                 video.setAttribute('playsinline', true);
//                 video.play();
//
//                 const scan = () => {
//                     if (video.readyState === video.HAVE_ENOUGH_DATA) {
//                         canvas.height = video.videoHeight;
//                         canvas.width = video.videoWidth;
//                         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//
//                         const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//                         const code = jsQR(imageData.data, imageData.width, imageData.height);
//
//                         if (code) {
//                             try {
//                                 const transactionData = JSON.parse(code.data);
//                                 setTransactionDetails(transactionData);
//                                 stream.getTracks().forEach(track => track.stop());
//                                 setScanning(false);
//                                 navigate('/confirm-transaction', { state: { transactionDetails: transactionData } });
//                             } catch (e) {
//                                 setError('Failed to parse QR code data');
//                             }
//                         }
//                     }
//                     if (scanning) {
//                         requestAnimationFrame(scan);
//                     }
//                 };
//                 scan();
//             }).catch(err => setError(err.message));
//         }
//     }, [scanning, navigate]);
//
//     const handleBack = () => {
//         navigate(-1); // Go back to the previous page
//     };
//
//     return (
//         <Container>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
//                 {scanning && (
//                     <div style={{ border: '2px solid #7F00FF', padding: '25px', borderRadius: '15px' }}>
//                         <video ref={videoRef} style={{ width: '400px', height: 'auto', borderRadius: '10px' }} />
//                     </div>
//                 )}
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//                 <Button color='violet' onClick={handleBack}>Отменить</Button>
//             </div>
//             {error && <Message negative>{error}</Message>}
//             {transactionDetails && (
//                 <Segment>
//                     <Header as="h3">Transaction Details</Header>
//                     <p><strong>To Username:</strong> {transactionDetails.toUsername}</p>
//                     <p><strong>Amount:</strong> {transactionDetails.amount}</p>
//                     <p><strong>Currency:</strong> {transactionDetails.currency}</p>
//                     <Button color='violet' onClick={() => navigate('/confirm-transaction', { state: { transactionDetails } })}>Confirm Transaction</Button>
//                 </Segment>
//             )}
//         </Container>
//     );
// };
//
// export default ScanQR;
import React, { useState, useRef } from 'react';
import { Container, Message, Segment, Header, Button } from 'semantic-ui-react';
import QrScanner from 'react-qr-scanner';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {
    const { getUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [scanning, setScanning] = useState(true);

    const handleScan = data => {
        if (data) {
            try {
                const transactionData = JSON.parse(data.text);
                setTransactionDetails(transactionData);
                setScanning(false);
                navigate('/confirm-transaction', { state: { transactionDetails: transactionData } });
            } catch (e) {
                setError('Failed to parse QR code data');
            }
        }
    };

    const handleError = err => {
        setError(err.message);
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                {scanning && (
                    <div style={{ border: '2px solid #7F00FF', padding: '25px', borderRadius: '15px' }}>
                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '400px', height: 'auto', borderRadius: '10px' }}
                        />
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button color='violet' onClick={handleBack}>Отменить</Button>
            </div>
            {error && <Message negative>{error}</Message>}
            {transactionDetails && (
                <Segment>
                    <Header as="h3">Transaction Details</Header>
                    <p><strong>To Username:</strong> {transactionDetails.toUsername}</p>
                    <p><strong>Amount:</strong> {transactionDetails.amount}</p>
                    <p><strong>Currency:</strong> {transactionDetails.currency}</p>
                    <Button color='violet' onClick={() => navigate('/confirm-transaction', { state: { transactionDetails } })}>Confirm Transaction</Button>
                </Segment>
            )}
        </Container>
    );
};

export default ScanQR;
