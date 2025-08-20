const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer(); // keep files in memory
app.use(cors());

app.post('/', upload.single('img'), (req, res) => {
	console.log('Title:', req.body.title);
	console.log('File:', req.file.originalname);

	res.json({
		title: req.body.title,
		filename: req.file.originalname,
		mimetype: req.file.mimetype,
		size: req.file.size,
	});
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
