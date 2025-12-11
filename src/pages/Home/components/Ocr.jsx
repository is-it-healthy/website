// OCR later...
// --------------
import { useState } from "react";
import Tesseract from "tesseract.js";

function Ocr() {
  const [ocrFile, setOcrFile] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState("");
  const [ocrError, setOcrError] = useState("");

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setOcrFile(selectedFile);
      setOcrError(""); // Clear any previous errors
    } else {
      setOcrError("Please select a valid image file.");
      setOcrFile(null);
    }
  };

  const processImage = () => {
    if (!ocrFile) {
      setOcrError("No image file selected.");
      return;
    }

    setOcrResult("");
    setOcrProgress(0);
    setOcrError("");

    Tesseract.recognize(ocrFile, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setOcrProgress(m.progress);
        }
      },
    })
      .then(({ data: { text } }) => {
        setOcrResult(text);
      })
      .catch(() => {
        setOcrError("An error occurred while processing the image.");
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

      {ocrError && (
        <div className="text-red-500 text-sm mb-4">
          <strong>Error: </strong>{ocrError}
        </div>
      )}

      <button
        onClick={processImage}
        className="btn btn-primary w-full"
        disabled={!ocrFile || ocrProgress > 0}
      >
        {ocrProgress > 0 ? "Processing..." : "Submit"}
      </button>

      {ocrProgress > 0 && (
        <div className="mt-4">
          <progress
            className="progress progress-primary w-full"
            value={ocrProgress}
            max="1"
          ></progress>
          <p className="text-sm text-gray-600 mt-2">Progress: {(ocrProgress * 100).toFixed(0)}%</p>
        </div>
      )}

      {ocrResult && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-teal-600">Extracted Text:</h2>
          <p className="mt-2 p-4 bg-gray-100 rounded-lg text-gray-700">
            {ocrResult}
          </p>
        </div>
      )}
    </div>
  );
}

export { Ocr };
