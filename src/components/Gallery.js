import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Gallery = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState(images);
  const [featureImage, setFeatureImage] = useState(images[0].id);

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
    console.log(updatedImages);
    //update image list
    setCurrentImages(updatedImages);
    setSelectedImages([]);
  };

  const reorderImages = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = [...currentImages];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setCurrentImages(updatedImages);
  };

  const setFeatureImageById = (imageId) => {
    setFeatureImage(imageId);
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
      <div className="grid grid-cols-5 gap-6 p-8">
        {currentImages.map((image, index) => (
          <div
            key={image.id}
            className={`relative rounded-lg cursor-pointer ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
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
      {/* Gallery part */}
    </div>
  );
};

export default Gallery;
