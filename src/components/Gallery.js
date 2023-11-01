import React, { useState } from "react";
import ImageGallery from "./ImageGallery";

const Gallery = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState(images);
  const [featureImage, setFeatureImage] = useState(images[0].id);
  const [draggedImage, setDraggedImage] = useState(null);

  const toggleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImages = currentImages.filter(
      (image) => !selectedImages.includes(image?.id)
    );
    // Update image list
    setCurrentImages(updatedImages);
    setSelectedImages([]);
  };

  const setFeatureImageById = (imageId) => {
    setFeatureImage(imageId);
  };

  const handleDragStart = (event, image) => {
    setDraggedImage(image);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
  };

  const handleDragOver = (index) => {
    const draggedOverImage = currentImages[index];
    if (draggedImage === draggedOverImage) return;
    let newImagesData = currentImages.filter((img) => img !== draggedImage);
    newImagesData.splice(index, 0, draggedImage);
    setCurrentImages(newImagesData);
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
  };

  return (
    <div>
      {/* Heading part */}
      <div className="flex justify-between items-center p-4 mb-2 border-b border-gray-300">
        <div className="px-6">
          <input
            type="checkbox"
            checked={selectedImages.length}
            onChange={() => setSelectedImages([])} // Uncheck when clicked
          />
          <span className="font-semibold px-2 py-4">
            {selectedImages.length}{" "}
            {selectedImages.length === 1 ? "File Selected" : "Files Selected"}
          </span>
        </div>
        <div>
          <span
            onClick={deleteSelectedImages}
            className="text-red-600 px-6 py-4 font-semibold cursor-pointer"
            disabled={selectedImages.length === 0}
          >
            Delete Files
          </span>
        </div>
      </div>
      {/* Heading part */}

      {/* Gallery part */}
      <ImageGallery
        images={images}
        currentImages={currentImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        featureImage={featureImage}
        setFeatureImage={setFeatureImage}
        deleteSelectedImages={deleteSelectedImages}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        toggleSelect={toggleSelect}
      />
      {/* Gallery part */}
    </div>
  );
};

export default Gallery;
