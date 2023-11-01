import Gallery from "./components/Gallery";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
} from "./assets/images/index";

function App() {
  const images = [
    { id: "1", src: img1, alt: "Image 1" },
    { id: "2", src: img2, alt: "Image 2" },
    { id: "3", src: img3, alt: "Image 3" },
    { id: "4", src: img4, alt: "Image 4" },
    { id: "5", src: img5, alt: "Image 5" },
    { id: "6", src: img6, alt: "Image 6" },
    { id: "7", src: img7, alt: "Image 7" },
    { id: "8", src: img8, alt: "Image 8" },
    { id: "9", src: img9, alt: "Image 9" },
    { id: "10", src: img10, alt: "Image 10" },
    { id: "11", src: img11, alt: "Image 11" },
  ];

  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}

export default App;
