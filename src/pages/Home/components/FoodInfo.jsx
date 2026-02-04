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

  const clearEverything = () => {
    setSelectedData([]);
    setOcrResult("");
    setOcrProgress(0);
    setOcrError("");
    setOcrNumericMatches([]);
    setOcrTextMatches([]);
    setOcrUnmatchedCodes([]);
  }

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
    setOcrProgress(0);

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
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="relative mb-8 rounded-3xl border border-purple-900/40 bg-[#0b0b0f] p-6 shadow-2xl shadow-purple-900/30 lg:p-10">
          <div className="absolute right-10 top-8 hidden h-28 w-28 rounded-full bg-gradient-to-br from-purple-600/30 to-fuchsia-500/20 blur-2xl lg:block" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-200">
              Food Additives
            </span>
            <div className="mt-4 flex items-center gap-4">
              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-900/50 lg:flex">
                <span className="text-lg font-semibold">IH</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-100 lg:text-4xl">
                is it healthy?
              </h1>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-slate-400 lg:text-base">
              Scan ingredient labels or pick additives manually to review safety notes,
              banned regions, and source links.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-slate-400">
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
                OCR + Manual input
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
                Clear, source-backed details
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
                Built for quick checks
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-4 shadow-xl shadow-purple-900/30 backdrop-blur lg:p-6">
          {fetchedListLoading ? (
            <div className="flex justify-center items-center py-6">
              <span className="loading loading-spinner loading-lg text-purple-400"></span>
              <span className="ml-2 text-sm text-slate-400">Loading options...</span>
            </div>
          ) : fetchedListError ? (
            <div className="rounded-xl border border-red-900/50 bg-red-950/60 p-4 text-sm text-red-300 shadow-sm">
              Error loading options: {fetchedListError}
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 w-full">
                <div className="flex-1">
                  <Select
                    className="text-lg"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                    menuPosition="fixed"
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
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/70 hover:brightness-110 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 ${
                    ocrProgress > 0
                      ? "pointer-events-none bg-slate-700"
                      : "bg-gradient-to-r from-purple-600 to-fuchsia-500"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={ocrProgress > 0}
                >
                  <Camera className="h-5 w-5" />
                  Scan label
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-800/40 bg-slate-900 px-4 py-3 text-sm font-semibold text-purple-200 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-purple-600/60 hover:bg-slate-800 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                  onClick={clearEverything}
                >
                  <X className="h-5 w-5" />
                  Clear
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

          {(ocrError ||
            ocrProgress > 0 ||
            ocrResult ||
            ocrNumericMatches.length > 0 ||
            ocrTextMatches.length > 0 ||
            ocrUnmatchedCodes.length > 0) && (
            <div className="my-10 rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-6 shadow-xl shadow-purple-900/30 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-100">OCR Scan Results</h3>
                <span className="text-xs font-medium text-purple-300">Camera / OCR</span>
              </div>

              {/* Error */}
              {ocrError && (
                <div className="text-red-300 text-sm mt-4">
                  <strong>Error: </strong>{ocrError}
                </div>
              )}

              {/* Progress */}
              {ocrProgress > 0 && (
                <div className="mt-4">
                  <progress
                    className="progress progress-secondary w-full"
                    value={ocrProgress}
                    max="1"
                  />
                  <p className="text-sm text-slate-400 mt-2">
                    Processing: {(ocrProgress * 100).toFixed(0)}%
                  </p>
                </div>
              )}

              {/* Extracted Text */}
              {ocrResult && (
                <details className="mt-5 rounded-xl border border-purple-900/40 bg-black/40" open={false}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-200">
                    Extracted Text
                    <span className="text-xs font-medium text-purple-300">Show</span>
                  </summary>
                  <div className="border-t border-purple-900/40 px-4 py-3 text-sm text-slate-200 whitespace-pre-line">
                    {ocrResult}
                  </div>
                </details>
              )}

              {/* Suggestions */}
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {ocrNumericMatches.length > 0 && (
                  <div className="rounded-2xl border border-purple-900/40 bg-black/50 p-5 shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-100 mb-3">INS code-based suggestions</h4>
                    <div className="flex flex-col gap-2">
                      {ocrNumericMatches.map((m) => (
                        <label
                          key={`num-${m.matchedCode}-${m.scannedCode}`}
                          className="flex items-center gap-3 rounded-lg border border-purple-900/40 bg-black/60 px-3 py-2 shadow-sm transition hover:border-purple-700/60"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-secondary"
                            checked={selectedData.some(
                              (item) => item.value === m.matchedCode
                            )}
                            onChange={() => toggleCodeInSelected(m.matchedCode, m.name)}
                          />
                          <span className="text-sm text-slate-200">
                            {m.matchedCode} — {m.name}
                            <span className="ml-1 text-xs text-slate-500">
                              (from {m.scannedCode})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {ocrTextMatches.length > 0 && (
                  <div className="rounded-2xl border border-purple-900/40 bg-black/50 p-5 shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-100 mb-3">Text-based suggestions</h4>
                    <div className="flex flex-col gap-2">
                      {ocrTextMatches.map((m) => (
                        <label
                          key={`txt-${m.matchedCode}`}
                          className="flex items-center gap-3 rounded-lg border border-purple-900/40 bg-black/60 px-3 py-2 shadow-sm transition hover:border-purple-700/60"
                        >
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-secondary"
                            checked={selectedData.some(
                              (item) => item.value === m.matchedCode
                            )}
                            onChange={() => toggleCodeInSelected(m.matchedCode, m.name)}
                          />
                          <span className="text-sm text-slate-200">
                            {m.matchedCode} — {m.name}
                            <span className="ml-1 text-xs text-slate-500">
                              (
                              {`${(m.score * 100).toFixed(0)}% match`}
                              {m.overlapTokens && m.overlapTokens.length > 0 && (
                                <>, matched words: {m.overlapTokens.join(", ")}·</>
                              )}
                              )
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {ocrUnmatchedCodes.length > 0 && (
                <p className="mt-4 text-xs text-slate-500">
                  Unmatched numeric codes: {ocrUnmatchedCodes.join(", ")}
                </p>
              )}
            </div>
          )}

        </>

        {/* OCR (Crop)  */}
        {cropping && cropSource && (
          <div className="my-10 rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-4 shadow-lg shadow-purple-900/40">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-800/40 bg-slate-900 px-4 py-2 text-sm font-semibold text-purple-200 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-purple-600/60 hover:bg-slate-800 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                onClick={() => {
                  setCropping(false);
                  URL.revokeObjectURL(cropSource);
                  setCropSource(null);
                }}
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/70 hover:brightness-110 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                onClick={handleConfirmCrop}
              >
                <Check className="h-4 w-4" />
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Selected Additives</h2>
            {selectedData.length > 0 && (
              <span className="text-xs font-medium text-purple-200">
                {selectedData.length} selected
              </span>
            )}
          </div>
          {selectedData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {selectedData.map((item) => (
                <Card key={item.value} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-purple-900/50 bg-[#0f0f14] p-8 text-center text-sm text-slate-500">
              Select items from the list or OCR suggestions to view details
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export { FoodInfo };
