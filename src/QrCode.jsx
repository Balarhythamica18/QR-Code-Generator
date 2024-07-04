import React, { useState } from 'react';
import './QrCode.css';

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState(""); 
  const [qrSize,setQrSize]=useState("")

  // Function to generate QR code
  const GenerateQr = async () => {
    setLoading(true);
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(qrUrl); 
    } catch (error) {
      console.error("Error Generating the QR-Code", error);
    } finally {
      setLoading(false);
    }
  };

  function downloadQR(){
   fetch(img)
   .then((response)=>response.blob())
   .then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    link.click();
    document.body.removeChild(link);
   })
  }

  

  return (
    <div className='container'>
      <div className="main">
        <h3>QR-Code Generator</h3>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="QR Code" className="QR-Image" />}
        <div>
          <label htmlFor='data-input' className='input-label'>Data for QR-Code</label>
          <input
            type="text"
            placeholder="Enter data for QR-Code"
            value={qrData}
            onChange={(e)=>setQrData(e.target.value)}
          />
          <label htmlFor='size-input' className='input-label'>Image Size (e.g., 100)</label>
          <input 
          type="text"
          placeholder='Enter Image Size'
          value={qrSize}
          onChange={(e)=>setQrSize(e.target.value)}></input>
          <button className='Generate-button' disabled={loading} onClick={GenerateQr}>Generate QR-code</button>
          <button className="Download-button" onClick={downloadQR}>Download Image</button>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
