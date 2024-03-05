import React from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

const QRcodeScanner: React.FC<{ handler: (value: string) => void }> = ({
  handler,
}) => {
  const resultHandler: OnResultFunction = (data) => {
    const value = data?.getText();
    if (value) {
      handler(value);
    }
  };
  return (
    <QrReader
      constraints={{ width: 320, height: 320 }}
      scanDelay={1000}
      onResult={resultHandler}
      className="qr-code-scanner-open"
    />
  );
};

export default QRcodeScanner;
