import React from 'react';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import '../css/QrGenerator.css';

const QRCodeGenerator = React.forwardRef(({asset}, ref) => {
  const data = JSON.stringify(asset)

  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const qrSlip = () => {
    return (
      <div>
        <QRCode value={data} />
        <button className="print-hidden" onClick={handlePrint}>Print QR Code</button>
      </div>
    );
  };

  return (
    <div ref={componentRef}>
         {qrSlip()}    
    </div>
  );
});

export default QRCodeGenerator;