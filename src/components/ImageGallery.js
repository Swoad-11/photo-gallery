import React, { useState } from "react";

const ImageGallery = ({
  images,
  currentImages,
  selectedImages,
  setSelectedImages,
  featureImage,
  setFeatureImage,
  deleteSelectedImages,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  toggleSelect,
}) => {
  return (
    <div className="grid grid-cols-5 gap-6 p-8">
      {currentImages.map((image, index) => (
        <div
          key={image.id}
          className={`relative rounded-lg cursor-pointer ${
            index === 0 ? "col-span-2 row-span-2" : ""
          }`}
          onDragOver={() => handleDragOver(index)}
        >
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragEnd={handleDragEnd}
            onClick={() => setFeatureImage(image.id)}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg border border-gray-300"
            />
            <div
              className="absolute inset-0 h-full w-full overflow-hidden bg-slate-400
               bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-60"
            ></div>
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => toggleSelect(image.id)}
              className="absolute top-2 right-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
