import { useEffect, useState } from "react";
import Image from "next/image";

export default function QRCode() {
  const [qr, setQR] = useState("");

  useEffect(() => {
    const fetchQR = async () => {
      const response = await fetch("/api/whatsapp");
      const data = await response.json();
      if (data.qr) {
        setQR(data.qr);
      }
    };

    fetchQR();
    const interval = setInterval(fetchQR, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {qr ? (
        <Image src={qr} alt="QR Code" width={200} height={200} />
      ) : (
        <p>Generando código QR...</p>
      )}
    </div>
  );
}
