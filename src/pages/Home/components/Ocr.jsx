import { useState } from "react";
import Tesseract from "tesseract.js";

function Ocr() {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processImage = () => {
    setResult("");
    setProgress(0);
    Tesseract.recognize(file, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      setResult(text);
    });
  };

  return (
    <div className="App">
      <input type="file" onChange={onFileChange} />
      <div style={{ marginTop: 25 }}>
        <input type="button" value="Submit" onClick={processImage} />
      </div>
      <div>
        <progress className="progress w-56" value={progress} max="1"></progress>
      </div>
      {result !== "" && (
        <div style={{ marginTop: 20, fontSize: 24, color: "teal" }}>
          Result: {result}
        </div>
      )}
    </div>
  );
}

export { Ocr };
