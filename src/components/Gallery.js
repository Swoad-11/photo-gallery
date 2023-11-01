import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Gallery = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(images[0].id);

  const toggleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    // Implement logic to delete selected images
    console.log("Deleting images:", selectedImages);
    setSelectedImages([]);
  };

  const reorderImages = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    // Update the state with the new image order
    console.log("Reordered images:", updatedImages);
  };

  const setFeatureImageById = (imageId) => {
    setFeatureImage(imageId);
  };

  return (
    <div className="m-4">
      {/* Heading part starts */}
      <div className="flex justify-between items-center mb-2 border-b border-gray-300">
        <div>
          <span className="font-semibold">
            {selectedImages.length}{" "}
            {selectedImages.length === 1 ? "photo selected" : "photos selected"}
          </span>
        </div>
        <div>
          <button
            onClick={deleteSelectedImages}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={selectedImages.length === 0}
          >
            Delete Files
          </button>
        </div>
      </div>
      {/* Heading part ends */}

      <div className="grid grid-cols-5 grid-rows-3 gap-2">
        {/* Featured photo starts */}
        <div className="col-span-2 row-span-2">
          <div className="relative rounded-lg cursor-pointer">
            <div
              onClick={() => setFeatureImageById(images[0].id)}
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-auto"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {images[0].id === featureImage && (
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
                  <div className="text-white font-semibold">Feature</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Featured photo ends */}

        {/* Other photos starts part-1*/}
        <div className="col-span-3 row-span-2">
          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {images.slice(1, 7).map((image, index) => (
              <div
                key={image.id}
                className={`relative rounded-lg cursor-pointer ${
                  image.id === featureImage ? "border-2 border-blue-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => toggleSelect(image.id)}
                  className="absolute top-2 right-2"
                />
                <div
                  onClick={() => setFeatureImageById(image.id)}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {image.id === featureImage && (
                    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
                      <div className="text-white font-semibold">Feature</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Other photos ends part-1*/}

        {/* Other photos starts part-2*/}
        <div className="col-span-5">
          <div className="grid grid-cols-5 grid-rows-1 gap-2">
            {images.slice(7).map((image, index) => (
              <div
                key={image.id}
                className={`relative rounded-lg cursor-pointer ${
                  image.id === featureImage ? "border-2 border-blue-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => toggleSelect(image.id)}
                  className="absolute top-2 right-2"
                />
                <div
                  onClick={() => setFeatureImageById(image.id)}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {image.id === featureImage && (
                    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
                      <div className="text-white font-semibold">Feature</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Other photos ends part-2*/}
      </div>
    </div>
  );
};

export default Gallery;
