import { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Tesseract from "tesseract.js";
import 'react-advanced-cropper/dist/style.css';
import { Cropper } from 'react-advanced-cropper';


import useLoadJson from "../../../hooks/useLoadJson";
import { reactSelectCustomOptions, urlInsEachStart, urlInsSummary } from "../../../utils/consts";
import { Card } from "./Card";
import { Camera, Check, X } from "lucide-react";

const FoodInfo = () => {
  // search bar (for manual entry)
  const [selectedData, setSelectedData] = useState([]);
  const {
    data: fetchedListData,
    fetchedListLoading,
    fetchedListError,
  } = useLoadJson(urlInsSummary);

  // for uploading files
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState("");
  const [ocrError, setOcrError] = useState("");
  const fileInputRef = useRef(null);

  // for image cropping
  const [cropSource, setCropSource] = useState(null);
  const [cropping, setCropping] = useState(false);
  const cropperRef = useRef(null);

  const ocrProcessText = (extractedText) => {
    // Keep original text for display
    setOcrResult(extractedText);

    if (!fetchedListData || fetchedListData.length === 0) {
      console.warn("No fetchedListData available for OCR matching.");
      return;
    }

    // 1. Find all 2–3 digit numeric codes in the extracted text (e.g. 86, 320)
    const codeMatches = extractedText.match(/\b(\d{2,3})\b/g) || [];
    const uniqueCodes = [...new Set(codeMatches.map((c) => parseInt(c, 10)))];

    // 2. Build a lookup from numeric code → list of dict items (E320, INS320, etc.)
    const numericLookup = new Map();

    fetchedListData.forEach((item) => {
      const match = item.code.match(/(\d+)/); // pull out "100" from "E100ii", "INS100", etc.
      if (!match) return;

      const num = parseInt(match[1], 10);
      if (!numericLookup.has(num)) {
        numericLookup.set(num, []);
      }
      numericLookup.get(num).push(item);
    });

    const matchedItems = [];
    const unmatchedCodes = [];

    // 3. Exact matching only – no more “closest” nonsense
    uniqueCodes.forEach((codeNum) => {
      const items = numericLookup.get(codeNum);
      if (items && items.length > 0) {
        items.forEach((item) => {
          matchedItems.push({
            scannedCode: codeNum,
            matchedCode: item.code,
            name: item.name,
          });
        });
      } else {
        unmatchedCodes.push(codeNum);
      }
    });

    console.log("OCR extracted text:", extractedText);
    console.log("Detected numeric codes:", uniqueCodes);
    console.log("Matched ingredients:", matchedItems);
    console.log("Unmatched numeric codes (no exact E/INS code found):", unmatchedCodes);

    // OPTIONAL: if you want to auto-select matched items in the UI
    setSelectedData(
      matchedItems.map((m) => ({
        value: m.matchedCode,
        label: m.name,
        url: `${urlInsEachStart}${m.matchedCode}.json`,
      }))
    );
  };



  const ocrProcessImage = (file) => {
    if (!file) {
      setOcrError("No image file selected.");
      return;
    }

    setOcrResult("");
    setOcrProgress(0);
    setOcrError("");

    Tesseract.recognize(file, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setOcrProgress(m.progress);
        }
      },
    })
      .then(({ data: { text } }) => {
        ocrProcessText(text);
      })
      .catch(() => {
        setOcrError("An error occurred while processing the image.");
      });
  };

  const handleConfirmCrop = () => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.getCanvas({
      maxWidth: 2048,
      maxHeight: 2048,
    });

    if (!canvas) {
      setOcrError("Failed to crop image.");
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setOcrError("Failed to crop image.");
          return;
        }

        const file = new File([blob], "cropped-image.png", {
          type: blob.type || "image/png",
        });

        // Close crop UI & free memory
        setCropping(false);
        URL.revokeObjectURL(cropSource);
        setCropSource(null);

        ocrProcessImage(file);
      },
      "image/png",
      0.95
    );
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="container mx-auto">

        {/* Search Bar */}
        <div className="mt-6 lg:mt-10 mx-3 lg:mx-1">
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
                  className={`btn btn-lg whitespace-nowrap ${ocrProgress > 0 ? "btn-disabled" : ""
                    }`}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={ocrProgress > 0}
                >
                  <Camera />
                </button>
              </div>
            </>
          )}
        </div>

        {/* OCR (All) */}
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (!file) return;

              if (!file.type.startsWith("image/")) {
                setOcrError("Please select a valid image file.");
                return;
              }

              setOcrError("");

              // preview URL for the cropper
              const url = URL.createObjectURL(file);
              setCropSource(url);
              setCropping(true);
            }}
          />

          {(ocrError || ocrProgress > 0 || ocrResult) && (
            <div className="my-16 mx-2 bg-base-200 rounded-xl p-6 shadow-lg">
              {/* Error */}
              {ocrError && (
                <div className="text-red-500 text-sm mt-4">
                  <strong>Error: </strong>{ocrError}
                </div>
              )}

              {/* Progress */}
              {ocrProgress > 0 && (
                <div className="mt-4">
                  <progress
                    className="progress progress-neutral w-full"
                    value={ocrProgress}
                    max="1"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Processing: {(ocrProgress * 100).toFixed(0)}%
                  </p>
                </div>
              )}

              {/* Result */}
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

        {/* OCR (Crop)  */}
        {cropping && cropSource && (
          <div className="my-16 mx-2 bg-base-200 rounded-xl p-4 shadow-lg">
            <div className="relative w-full h-80">
              <Cropper
                ref={cropperRef}
                src={cropSource}
                className="w-full h-full"
                stencilProps={{
                  movable: true,
                  resizable: true,
                  lines: true,
                  handlers: true,
                  grid: true,
                }}
              />
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setCropping(false);
                  URL.revokeObjectURL(cropSource);
                  setCropSource(null);
                }}
              >
                <X />
              </button>
              <button
                className="btn btn-neutral"
                onClick={handleConfirmCrop}
              >
                <Check /> Confirm
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-10 mx-3">
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
