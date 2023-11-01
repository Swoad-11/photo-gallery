import React from "react";
import addImage from "../assets/images/addImages.png";

export default function AddImages({ handleImageUpload }) {
  return (
    <div className="w-full h-auto rounded-lg ">
      <label htmlFor="imageUpload" className="cursor-pointer">
        <div
          className="flex flex-col justify-center border-dashed relative rounded-lg cursor-pointer 
        border-2 h-full w-full border-gray-300 text-center"
        >
          <img
            src={addImage}
            alt="Add Images"
            className="w-16 h-16 sm:w-10 sm:h-10 md:w-20 md:h-20 mx-auto mb-2"
          />
          <div className="text-sm md:text-base sm:text-base font-semibold">
            Add Images
          </div>
        </div>
      </label>
      <input
        type="file"
        id="imageUpload"
        multiple
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}
