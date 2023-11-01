import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Gallery = ({ images }) => {
  console.log(images[0]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(images[0].id);

  const handleSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleDelete = () => {
    // Implement logic to delete selected images
    console.log("Deleting images:", selectedImages);
    setSelectedImages([]);
  };

  const handleDragEnd = (result) => {
    // Implement logic to reorder images
    if (!result.destination) {
      return;
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    // Update the state with the new image order
    // You may also need to update featureImage if it has changed
    console.log("Reordered images:", updatedImages);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex space-x-4"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative rounded-lg ${
                        image.id === featureImage
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={() => handleSelect(image.id)}
                        className="absolute top-2 right-2"
                      />
                      <img src={image.src} alt={image.alt} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleDelete} className="btn">
        Delete
      </button>
    </div>
  );
};

export default Gallery;
