import { useState } from "react";
import Tesseract from "tesseract.js";

function Ocr() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setError(""); // Clear any previous errors
    } else {
      setError("Please select a valid image file.");
      setFile(null);
    }
  };

  const processImage = () => {
    if (!file) {
      setError("No image file selected.");
      return;
    }

    setResult("");
    setProgress(0);
    setError("");

    Tesseract.recognize(file, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    })
      .then(({ data: { text } }) => {
        setResult(text);
      })
      .catch(() => {
        setError("An error occurred while processing the image.");
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Image to Text (OCR)</h1>
      <p className="text-gray-600 mb-4">
        Upload an image file and extract text using OCR (powered by Tesseract.js).
      </p>

      <input
        type="file"
        onChange={onFileChange}
        className="file-input file-input-bordered file-input-primary w-full mb-4"
        accept="image/*"
      />

      {error && (
        <div className="text-red-500 text-sm mb-4">
          <strong>Error: </strong>{error}
        </div>
      )}

      <button
        onClick={processImage}
        className="btn btn-primary w-full"
        disabled={!file || progress > 0}
      >
        {progress > 0 ? "Processing..." : "Submit"}
      </button>

      {progress > 0 && (
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="1"
          ></progress>
          <p className="text-sm text-gray-600 mt-2">Progress: {(progress * 100).toFixed(0)}%</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-teal-600">Extracted Text:</h2>
          <p className="mt-2 p-4 bg-gray-100 rounded-lg text-gray-700">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}

export { Ocr };
