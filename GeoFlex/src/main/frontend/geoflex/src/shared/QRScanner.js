import React , {useState} from 'react';
import { QrReader } from 'react-qr-reader';

export default function QRScanner(props) {
	/**
	 * functional component that handles the QR-reader
	 */
	const [data, setData] = useState('No result');

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
		if (!!result) {

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

				onResult={handleScan}
				constraints={{
					facingMode: 'environment'
				}}
			/>

		</div>
	);
}