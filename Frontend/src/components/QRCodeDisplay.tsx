import QRCodeSVG from 'react-qr-code';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface QRCodeDisplayProps {
  value: string;
  title?: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  value, 
  title = 'QR Code',
  size = 200 
}) => {
  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${value}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 glass rounded-xl">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="p-4 bg-white rounded-lg">
        <QRCodeSVG 
          id="qr-code-svg"
          value={value} 
          size={size}
          level="H"
        />
      </div>
      <p className="text-sm text-muted-foreground font-mono">{value}</p>
      <Button onClick={downloadQR} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
};
