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

  // for ocr extracted fonts checkboxes
  // OCR matching results
  const [ocrNumericMatches, setOcrNumericMatches] = useState([]);   // [{ scannedCode, matchedCode, name }]
  const [ocrTextMatches, setOcrTextMatches] = useState([]);         // [{ matchedCode, name, score, overlapTokens }]
  const [ocrUnmatchedCodes, setOcrUnmatchedCodes] = useState([]);   // [number]

  const toggleCodeInSelected = (code, name) => {
    setSelectedData((prev) => {
      const exists = prev.some((item) => item.value === code);
      if (exists) {
        // remove from selectedData
        return prev.filter((item) => item.value !== code);
      }
      // add to selectedData
      return [
        ...prev,
        {
          value: code,
          label: name,
          url: `${urlInsEachStart}${code}.json`,
        },
      ];
    });
  };


  const ocrProcessText = (extractedText) => {
    // Keep original text for display
    setOcrResult(extractedText);

    if (!fetchedListData || fetchedListData.length === 0) {
      console.warn("No fetchedListData available for OCR matching.");
      return;
    }

    // =========
    // 1) NUMERIC MATCHING (EXACT ONLY)
    // =========

    const codeMatches = extractedText.match(/\b(\d{2,3})\b/g) || [];
    const uniqueCodes = [...new Set(codeMatches.map((c) => parseInt(c, 10)))];

    const numericLookup = new Map();

    fetchedListData.forEach((item) => {
      const match = item.code.match(/(\d+)/);
      if (!match) return;

      const num = parseInt(match[1], 10);
      if (!numericLookup.has(num)) {
        numericLookup.set(num, []);
      }
      numericLookup.get(num).push(item);
    });

    const matchedItems = [];
    const unmatchedCodes = [];

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

    // =========
    // 2) TEXT / PHRASE MATCHING (SEPARATE FROM NUMBERS)
    // =========

    const normalize = (s) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalizedText = normalize(extractedText);
    const textTokens = new Set(normalizedText.split(" ").filter(Boolean));

    const numericMatchedCodes = new Set(matchedItems.map((m) => m.matchedCode));
    const textMatchedItems = [];

    fetchedListData.forEach((item) => {
      if (numericMatchedCodes.has(item.code)) return;

      const namePart = item.name.split("-").slice(1).join("-") || item.name;
      const normName = normalize(namePart);
      if (!normName) return;

      const nameTokens = normName.split(" ").filter(Boolean);
      if (nameTokens.length === 0) return;

      let overlapCount = 0;
      nameTokens.forEach((t) => {
        if (textTokens.has(t)) overlapCount++;
      });

      const tokenScore = overlapCount / nameTokens.length;
      const substringMatch = normalizedText.includes(normName);

      if (substringMatch || (overlapCount >= 2 && tokenScore >= 0.5)) {
        textMatchedItems.push({
          matchedCode: item.code,
          name: item.name,
          score: substringMatch ? 1.0 : tokenScore,
          overlapTokens: nameTokens.filter((t) => textTokens.has(t)),
        });
      }
    });

    setOcrNumericMatches(matchedItems);
    setOcrUnmatchedCodes(unmatchedCodes);
    setOcrTextMatches(textMatchedItems);

    console.log("OCR extracted text:", extractedText);
    console.log("Detected numeric codes:", uniqueCodes);
    console.log("Matched ingredients (by numeric code):", matchedItems);
    console.log("Unmatched numeric codes:", unmatchedCodes);
    console.log("Text-based ingredient suggestions:", textMatchedItems);
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

          {ocrNumericMatches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">INS code-based suggestions</h3>
              <div className="flex flex-col gap-1">
                {ocrNumericMatches.map((m) => (
                  <label
                    key={`num-${m.matchedCode}-${m.scannedCode}`}
                    className="label cursor-pointer justify-start gap-2"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedData.some(
                        (item) => item.value === m.matchedCode
                      )}
                      onChange={() => toggleCodeInSelected(m.matchedCode, m.name)}
                    />
                    <span className="label-text">
                      {m.matchedCode} — {m.name}
                      <span className="ml-1 text-xs text-gray-500">
                        (from {m.scannedCode})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}


          {ocrTextMatches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Text-based suggestions</h3>
              <div className="flex flex-col gap-1">
                {ocrTextMatches.map((m) => (
                  <label
                    key={`txt-${m.matchedCode}`}
                    className="label cursor-pointer justify-start gap-2"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedData.some(
                        (item) => item.value === m.matchedCode
                      )}
                      onChange={() => toggleCodeInSelected(m.matchedCode, m.name)}
                    />
                    <span className="label-text">
                      {m.matchedCode} — {m.name}
                      {m.overlapTokens && m.overlapTokens.length > 0 && (
                        <span className="ml-1 text-xs text-gray-500">
                          (matched words: {m.overlapTokens.join(", ")})
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {ocrUnmatchedCodes.length > 0 && (
            <p className="mt-4 text-xs text-gray-500">
              Unmatched numeric codes: {ocrUnmatchedCodes.join(", ")}
            </p>
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
            <div className="text-center text-gray-500">
              Select items from the list or OCR suggestions to view details
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export { FoodInfo };
