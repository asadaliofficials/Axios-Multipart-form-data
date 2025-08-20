const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Route to return an image
app.get('/image', (req, res) => {
	// Log request info
	console.log('Request Method:', req.method);
	console.log('Request URL:', req.url);
	console.log('Headers:', req.headers);

	// Path to an image in your project folder (replace with your image)
	const imagePath = path.join(__dirname, 'sample.jpg');

	// Check if image exists
	if (fs.existsSync(imagePath)) {
		res.sendFile(imagePath);
	} else {
		res.status(404).send('Image not found');
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
