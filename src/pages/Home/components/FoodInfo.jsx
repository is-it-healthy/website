import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Tesseract from "tesseract.js";

import useLoadJson from "../../../hooks/useLoadJson";
import { reactSelectCustomOptions, urlInsEachStart, urlInsSummary } from "../../../utils/consts";
import { Card } from "./Card";
import { Ocr } from "./Ocr";
import { Camera } from "lucide-react";

const FoodInfo = () => {
  // search bar (for manual entry)
  const [selectedData, setSelectedData] = useState([]);
  const {
    data: fetchedListData,
    fetchedListLoading,
    fetchedListError,
  } = useLoadJson(urlInsSummary);

  // for uploading files
  const [ocrActive, setOcrActive] = useState(false);
  const [ocrFile, setOcrFile] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState("");
  const [ocrError, setOcrError] = useState("");

  const ocrOnFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setOcrFile(selectedFile);
      setOcrError(""); // Clear any previous errors
    } else {
      setOcrError("Please select a valid image file.");
      setOcrFile(null);
    }
  };

  const ocrProcessImage = () => {
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

  function handleOcrButton() {
    setOcrActive(!ocrActive);
  }


  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="container mx-auto">

        {/* 
          -------------------------------------------------------------
          OCR Feature
            Will get to this later... not today
            will require some vodoo magic to integrate this seamlessly
          -------------------------------------------------------------
        */}
        <div className="">
          <Ocr />
        </div>

        {/* Search Bar */}
        <div>
          {fetchedListLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="ml-2">Loading options...</span>
            </div>
          ) : fetchedListError ? (
            <div className="alert alert-error shadow-lg">
              <span>Error loading options: {fetchedListError}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 w-full">
                <div className="flex-1">
                  <Select
                    className="shadow-xl text-lg"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    options={fetchedListData?.map((item) => ({
                      value: item.code,
                      label: item.name,
                      url: `${urlInsEachStart}${item.code}.json`,
                    }))}
                    onChange={setSelectedData}
                    value={selectedData}
                    styles={reactSelectCustomOptions}
                    placeholder="Select INS codes"
                  />
                </div>
                <button
                  className={`btn btn-lg whitespace-nowrap ${ocrActive ? "btn-active btn-neutral" : ""}`}
                  onClick={handleOcrButton}
                >
                  <Camera />
                </button>
              </div>
            </>
          )}
        </div>

        {/* OCR Menu Stuffs */}
        <>
          {ocrActive && (
            <div className="my-16 mx-2 bg-base-200 rounded-xl p-6 shadow-lg">

              {/* File input — auto submit */}
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => {
                  ocrOnFileChange(e);
                  // automatically process if valid file
                  if (e.target.files && e.target.files.length > 0) {
                    ocrProcessImage();
                  }
                }}
              />

              {/* Error message */}
              {ocrError && (
                <div className="text-red-500 text-sm mt-4">
                  <strong>Error: </strong>{ocrError}
                </div>
              )}

              {/* Progress bar */}
              {ocrProgress > 0 && (
                <div className="mt-4">
                  <progress
                    className="progress progress-primary w-full"
                    value={ocrProgress}
                    max="1"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Processing: {(ocrProgress * 100).toFixed(0)}%
                  </p>
                </div>
              )}

              {/* OCR Result */}
              {ocrResult && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-primary">Extracted Text</h2>
                  <div className="mt-2 p-4 bg-base-100 rounded-lg shadow-sm border border-base-300 text-gray-700 whitespace-pre-line">
                    {ocrResult}
                  </div>
                </div>
              )}

            </div>
          )}
        </>




        {/* Results */}
        <div className="mt-10">
          {selectedData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {selectedData.map((item) => (
                <Card key={item.value} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Select items to view details</div>
          )}
        </div>
      </div>



    </>
  );
};

export { FoodInfo };
