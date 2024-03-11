import React from 'react';
import { Box } from './components/box.component';
import QRCode from 'qrcode.react';

function App() {
  const [value, setValue] = React.useState('');
  // Update the ref type to a more generic one since you're attaching it to a div
  const ref = React.useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (!ref.current) return;
    const svg = ref.current.querySelector('svg');
    if (!svg) return;
    const svgString = new XMLSerializer().serializeToString(svg);
    navigator.clipboard.writeText(svgString);
  };

  const handleDownload = () => {
    if (!ref.current) return;
    const svg = ref.current.querySelector('svg');
    if (!svg) return;
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.svg';
    a.click();
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Box className={'max-w-xl'}>
        <h1 className={'text-2xl font-bold'}>QR Code Generator</h1>
        <input
          className={'w-full p-2 border rounded-lg'}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Enter text to generate QR code'}
        />
        <div className={'flex justify-center'}>
          {/* Wrap QRCode in a div and attach the ref to the div */}
          <div ref={ref}>
            <QRCode
              renderAs={'svg'}
              value={value}
              size={256}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className={'w-full p-2 border rounded-lg bg-blue-500 text-white'}
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className={'w-full p-2 border rounded-lg bg-blue-500 text-white'}
            onClick={handleCopy}
          >
            Copy QR Svg
          </button>
        </div>
      </Box>
    </div>
  );
}

export default App;
