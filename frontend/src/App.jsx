import React, { useState } from "react";
import "./App.css"; // import CSS

const App = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    setProgress(0);
    let formData = new FormData();
    formData.append('img', image);
    
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

        <button
          onClick={handleUpload}
          disabled={!image}
          className="btn upload-btn"
        >
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
