import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import classNames from "classnames";
import { useState } from "react";

function ImageSlider({ sliderImg }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let nextImage, previousImage, goToImage, visibleImage, dotSlider;

  visibleImage = sliderImg[currentIndex];
  nextImage = () => {
    if (currentIndex === sliderImg.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    previousImage = () => {
      if (currentIndex === 0) {
        setCurrentIndex(sliderImg.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    };

    goToImage = (newIndex) => {
      setCurrentIndex(newIndex);
    };
    dotSlider = sliderImg.map((image, imageIndex) => {
      const classes = classNames({
        "text-2xl": true,
        "text-gray-400": imageIndex !== currentIndex,
        "cursor-pointer": true,
        "text-gray-700": imageIndex === currentIndex,
      });
      return (
        <div className={classes} key={imageIndex}>
          <RxDotFilled onClick={() => goToImage(imageIndex)}></RxDotFilled>
        </div>
      );
    });
  };

  return (
    <div className="max-w-[700px] h-[600px] w-full m-auto py-16 px-4 relative group cursor-pointer">
      <div
        style={{ backgroundImage: `url(${visibleImage})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft
          size={25}
          onClick={previousImage}
        ></BsChevronCompactLeft>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight
          size={25}
          onClick={nextImage}
        ></BsChevronCompactRight>
      </div>
      <div className="flex top-4 justify-center py-2 hover:bg-gray-100 w-fit mx-auto my-1 rounded-lg">
        {dotSlider}
      </div>
    </div>
  );
}

export default ImageSlider;
