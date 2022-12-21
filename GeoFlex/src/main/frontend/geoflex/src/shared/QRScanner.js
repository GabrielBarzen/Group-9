import React from 'react';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function QRScanner(props) {
  const [data, setData] = useState('No result');

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
    if (!!result) {
      console.log("QRDATA");
      console.log(result);
      setData(result?.text);
      props.handleResult(result)
    }
	}

	const previewStyle = {
		height: 240,
		width: 320,
	}

	return (
		<div className={"test"}>
			<QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			//onScan={handleScan} //verkar inte göra något?
      onResult={handleScan}
      constraints={{
        facingMode: 'environment'
    }}
			/>
					
		</div>
	);
}
