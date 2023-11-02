import React, { useState } from "react";
import ImageGallery from "./ImageGallery";

const Gallery = ({ images }) => {
  /*  State variables for managing selected images, 
  current images, feature image, and the image being dragged  */
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState(images);
  const [featureImage, setFeatureImage] = useState(images[0].id);
  const [draggedImage, setDraggedImage] = useState(null);

  // Function to toggle the selection of an image by its ID
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

  // Function to handle the start of dragging an image
  const handleDragStart = (event, image) => {
    setDraggedImage(image);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.target.classList.add("dragged-image");
  };

  // Function to handle dragging over a specific index in the gallery
  const handleDragOver = (index) => {
    const draggedOverImage = currentImages[index];
    if (draggedImage === draggedOverImage) return;
    let newImagesData = currentImages.filter((img) => img !== draggedImage);
    newImagesData.splice(index, 0, draggedImage);
    setCurrentImages(newImagesData);
  };

  // Function to handle the end of dragging an image
  const handleDragEnd = () => {
    if (draggedImage) {
      draggedImage.classList?.remove("dragged-image"); // Remove the "dragged-image" class
    }
    setDraggedImage(null);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => {
      const id = Math.random().toString(36).substr(2, 9); // Generate a unique id for the new image
      return {
        id,
        src: URL.createObjectURL(file), // Create a preview URL for the image
        alt: file.name,
      };
    });

    // Add the new images to the currentImages state
    setCurrentImages([...currentImages, ...newImages]);
  };

  return (
    <div>
      {/* Heading part */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-2 mb-2 border-b border-gray-300">
        <div className="flex items-baseline sm:px-6">
          {selectedImages.length > 0 && (
            <input
              type="checkbox"
              checked={selectedImages.length > 0}
              onChange={() => setSelectedImages([])} // Uncheck when clicked
            />
          )}
          <span className="font-semibold text-xl px-2 py-4">
            {selectedImages.length === 0
              ? "Gallery"
              : selectedImages.length === 1
              ? "1 File Selected"
              : `${selectedImages.length} Files Selected`}
          </span>
        </div>
        {selectedImages.length > 0 && (
          <div className="mt-2 sm:mt-0">
            <span
              onClick={deleteSelectedImages}
              className="text-red-600 px-6 py-4 font-semibold cursor-pointer hover:underline hover:underline-offset-4"
            >
              Delete Files
            </span>
          </div>
        )}
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
        handleImageUpload={handleImageUpload}
        draggedImage={draggedImage}
      />
      {/* Gallery part */}
    </div>
  );
};

export default Gallery;
