import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // import CSS
axios.interceptors.request.use(config => {
	config.data.append('title', 'added by interceptor');
	return config;
});
const App = () => {
	const [image, setImage] = useState(null);
	const [ImageToUpload, setImageToUpload] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setImageToUpload(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		setProgress(0);
		let formData = new FormData();
		formData.append('img', ImageToUpload);

		try {
			let res = await axios.post('http://localhost:3000', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: event => {
					const percent = Math.round((event.loaded * 100) / event.total);
					setProgress(percent);
				},
			});
			console.log('uploaded', res);
		} catch (error) {
			console.log('failed', error);
		}
	};

	return (
		<div className="app">
			<div className="card">
				<h1>Image Uploader</h1>

				{image && (
					<div className="preview">
						<img src={image} alt="Preview" />
					</div>
				)}

				<input
					hidden
					id="fileInput"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>
				<label htmlFor="fileInput" className="btn select-btn">
					Select Image
				</label>

				<button onClick={handleUpload} disabled={!image} className="btn upload-btn">
					Upload
				</button>

				{progress > 0 && (
					<div className="progress-box">
						<progress value={progress} max="100"></progress>
						<p>{progress}%</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
