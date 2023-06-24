import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import React from "react";
import Arrow from "./Arrow";
import Wrapper from "./Wrapper";
import Slide from "./Slide";
import InfoContainer from "./InfoContainer";
import TitleDesc from "./TitleDesc";
import TitleHeading from "./TitleHeading";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";
import { useSelector } from "react-redux";
import Error from "./Error";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getSliderItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/campaigns", {
          headers: { token: `Bearer ${user.currentUser.accessToken}` },
        });
        const slides = res.data.slice(0, 3);
        setSliderItems(slides);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    getSliderItems();
  }, []);

  const slides = sliderItems.map((item) => {
    return (
      <Slide key={item._id} className="w-full h-full duration-500">
        <div className="flex-2 sm:flex-1 h-[550px] overflow-hidden my-1 flex max-w-1/2">
          <div className="max-h-sm w-full rounded-lg mx-1 flex-1">
            <img
              className="h-full rounded-lg"
              src={item.img[0]}
              alt="slide"
            ></img>
          </div>
        </div>
        <InfoContainer className="w-1/3">
          <TitleHeading>{item.title}</TitleHeading>
          <TitleDesc>{item.desc}</TitleDesc>
          <Link
            to={`/campaign/${item._id}`}
            className="text-gray-600 hover:text-black hover:underline text-decoration cursor-pointer"
          >
            Know More
          </Link>
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
  // console.log(visibleSlide);

  let content = <div></div>;

  if (isLoading) {
    content = (
      <div className="p-6 bg-gray-50">
        <div className="m-auto spinner"></div>
      </div>
    );
  } else if (!isLoading && !isError) {
    content = (
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
  } else {
    content = (
      <div className="flex w-full h-full bg-gray-50 my-6">
        <Error></Error>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Slider;

//           <ImgContainer>
// <Image url="https://img.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_10045-646.jpg?w=1380&t=st=1673468436~exp=1673469036~hmac=f3e38df98865af74c402e4bd0257e3767c0fe1deb5c874fff124fbcbcc3df85b"></Image>
// </ImgContainer>
