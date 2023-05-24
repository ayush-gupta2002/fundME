import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  Link,
} from "@material-ui/icons";
import { useState } from "react";
import React from "react";
import Arrow from "./Arrow";
import Wrapper from "./Wrapper";
import Slide from "./Slide";
import InfoContainer from "./InfoContainer";
import TitleDesc from "./TitleDesc";
import TitleHeading from "./TitleHeading";
import { sliderItems } from "../data";
import { RxDotFilled } from "react-icons/rx";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = sliderItems.map((item) => {
    return (
      <Slide
        bgColor={item.bgColor}
        id={item.id}
        className="w-full h-full duration-500"
      >
        <div className="flex-2 sm:flex-1 h-[550px] overflow-hidden my-1 flex">
          <div className="max-h-sm max-w-full rounded-lg mx-1 flex-1">
            <img className="h-full rounded-lg" src={item.img1}></img>
          </div>
          <div className="max-h-sm max-w-full rounded-lg mx-1 flex-1">
            <img className="h-full rounded-lg" src={item.img2}></img>
          </div>
        </div>
        <InfoContainer className="w-1/3">
          <TitleHeading>{item.title}</TitleHeading>
          <TitleDesc>{item.desc}</TitleDesc>
          <div className="text-gray-600 hover:text-black hover:underline text-decoration cursor-pointer">
            Know More
          </div>
        </InfoContainer>
      </Slide>
    );
  });

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    if (isLastSlide) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    if (isFirstSlide) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleSlide = slides[currentIndex];
  console.log(visibleSlide);

  return (
    <div className="hidden sm:block max-h-fit w-full relative bg-white text-center">
      <Arrow direction="left">
        <ArrowLeftOutlined onClick={prevSlide}></ArrowLeftOutlined>
      </Arrow>
      <Wrapper className="max-h-[600px] sm:max-h-[700px]">
        {visibleSlide}
      </Wrapper>
      <Arrow direction="right">
        <ArrowRightOutlined onClick={nextSlide}></ArrowRightOutlined>
      </Arrow>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => {
          return (
            <div
              key={slideIndex}
              onClick={() => {
                goToSlide(slideIndex);
              }}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;

//           <ImgContainer>
// <Image url="https://img.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_10045-646.jpg?w=1380&t=st=1673468436~exp=1673469036~hmac=f3e38df98865af74c402e4bd0257e3767c0fe1deb5c874fff124fbcbcc3df85b"></Image>
// </ImgContainer>
