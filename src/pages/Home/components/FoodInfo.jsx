import { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Tesseract from "tesseract.js";
// import Cropper from "react-easy-crop";

import 'react-advanced-cropper/dist/style.css';
import { Cropper } from 'react-advanced-cropper';


import useLoadJson from "../../../hooks/useLoadJson";
import { reactSelectCustomOptions, urlInsEachStart, urlInsSummary } from "../../../utils/consts";
import { Card } from "./Card";
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
  const fileInputRef = useRef(null);

  // for image cropping
  const [rawImageUrl, setRawImageUrl] = useState(null);   // for preview
  // const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [cropSource, setCropSource] = useState(null);
  const [cropping, setCropping] = useState(false);
  const cropperRef = useRef(null);


  const ocrOnFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setOcrFile(file);
      setOcrError(""); // Clear any previous errors
    } else {
      setOcrError("Please select a valid image file.");
      setOcrFile(null);
    }
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
        setOcrResult(text);
      })
      .catch(() => {
        setOcrError("An error occurred while processing the image.");
      });
  };


  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setOcrError("Please select a valid image file.");
      setOcrFile(null);
      return;
    }

    // Keep the original file in state if you want
    setOcrFile(file);
    setOcrError("");

    // Create a preview URL and open crop UI
    const url = URL.createObjectURL(file);
    setRawImageUrl(url);
    setCropping(true);
  };

  async function getCroppedImg(imageSrc, cropPixels) {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      cropPixels.width,
      cropPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        // Turn Blob into File so Tesseract is happy
        const file = new File([blob], "cropped-image.png", { type: "image/png" });
        resolve(file);
      }, "image/png");
    });
  }

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

        // Send cropped file into your existing OCR function
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

        {/* OCR Menu Stuffs */}

        <>
          {/* Hidden input – always rendered so ref is valid */}
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

        {/* OCR Image Cropping Stuffs */}
        {cropping && rawImageUrl && (
          <div className="my-6 mx-2 bg-base-200 rounded-xl p-4 shadow-lg">
            <div className="relative w-full h-72">
              <Cropper
                image={rawImageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1} // or any ratio you want
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-sm flex-1 mr-4"
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={handleConfirmCrop}
              >
                Use This Crop
              </button>
            </div>
          </div>
        )}

        {cropping && cropSource && (
          <div className="my-6 mx-2 bg-base-200 rounded-xl p-4 shadow-lg">
            <div className="relative w-full h-80">
              <Cropper
                ref={cropperRef}
                src={cropSource}
                className="w-full h-full"
                // Rectangle stencil with *no* aspectRatio => free, like Google Photos
                stencilProps={{
                  movable: true,
                  resizable: true,
                  lines: true,
                  handlers: true,
                  grid: true, // optional: show rule-of-thirds grid
                }}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setCropping(false);
                  URL.revokeObjectURL(cropSource);
                  setCropSource(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleConfirmCrop}
              >
                Use This Crop
              </button>
            </div>
          </div>
        )}



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
