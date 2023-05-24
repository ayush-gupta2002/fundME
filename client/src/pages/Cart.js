import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoIosArrowBack } from "react-icons/io";
import campaigns from "../Campaigns";
import Terms from "../components/Terms";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { removeProduct } from "../redux/cartRedux";
import { RxCross1 } from "react-icons/rx";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState(cart.products);
  const dispatch = useDispatch();
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    setProducts(cart.products);
    console.log("component ");
  }, [cart.quantity]);

  const renderedInfoFields = campaigns[0].requirements.map((req) => {
    return (
      <div>
        <div className="font-semibold text-gray-700 mb-3 text-lg">{req}</div>
        <textarea
          placeholder="Type here"
          className="bg-gray-100 rounded-lg outline-none text-gray-700 w-full text-lg p-4"
          maxLength={200}
          rows={5}
        ></textarea>
      </div>
    );
  });
  console.log(cart);

  const handleRemove = (product) => {
    console.log(product);
    dispatch(removeProduct({ product: product, price: product.perPrice }));
  };

  const renderedCampaigns = products.map((campaign) => {
    return (
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-gray-700 text-md font-semibold my-2 w-full">
            YOU'RE BUYING THE SERVICE(S)
          </div>
          <RxCross1
            className="text-xl my-auto"
            onClick={() => {
              handleRemove(campaign);
            }}
          ></RxCross1>
        </div>
        <div className="md:flex my-2">
          <img
            className="rounded-full w-10 h-10 border-gray-700 b-2 my-auto mr-4"
            src={campaign.img[0]}
          ></img>
          <div className="font-bold text-3xl">{campaign.title}</div>
          <div className="font-semibold text-2xl my-auto mx-3">
            INR {campaign.perPrice}
          </div>
        </div>
        <div className="mt-5">{renderedInfoFields}</div>
      </div>
    );
  });

  const handleNext = () => {
    if (visibleIndex == cart.products.length - 1) {
      setVisibleIndex(0);
    } else {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const handlePrev = () => {
    if (visibleIndex == 0) {
      setVisibleIndex(cart.products.length - 1);
    } else {
      setVisibleIndex(visibleIndex - 1);
    }
  };

  return (
    <div className="w-full h-full text-center">
      <Navbar></Navbar>
      <div className="flex w-full">
        <div className="w-1/2 h-full p-4 m-10 text-left">
          <div className="flex w-full">
            <IoIosArrowBack className="my-auto cursor-pointer font-semibold"></IoIosArrowBack>
            <Link className="group w-fit h-fit cursor-pointer" to="/">
              <div className="font-semibold hover:underline text-lg">Back</div>
            </Link>
          </div>
          <div className="flex w-full">
            <div className="rounded-full my-auto mr-4 bg-gray-200 p-1 w-fit h-fit hover:scale-105 hover:bg-gray-300 duration-500">
              <AiOutlineLeft
                className="text-xl my-auto w-fit h-fit cursor-pointer"
                onClick={() => {
                  handleNext();
                }}
              ></AiOutlineLeft>
            </div>
            <div className="duration-500 w-full">
              {renderedCampaigns[visibleIndex]}
            </div>
            <div className="rounded-full ml-4 my-auto  bg-gray-200 p-1 h-fit w-fit hover:scale-105 hover:bg-gray-300 duration-500">
              <AiOutlineRight
                className="text-xl my-auto w-fit h-fit cursor-pointer"
                onClick={() => {
                  handlePrev();
                }}
              ></AiOutlineRight>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full bg-gray-100 p-8 m-6 rounded-lg">
          <h1 className="font-semibold text-xl text-left mb-10">
            PAYMENT SUMMARY
          </h1>
          <div className="justify-between flex my-2">
            <div className="text-gray-700 text-xl">SUBTOTAL</div>
            <div className="text-xl">INR {cart.total}</div>
          </div>
          <div className="justify-between flex my-2">
            <div className="text-gray-700 text-xl">fundME tip</div>
            <div className="text-xl">INR {cart.total / 3}</div>
          </div>
          <div className="mt-10 flex justify-between">
            <h2 className="text-2xl font-bold">Estimated Total</h2>
            <h2 className="text-2xl font-semibold">
              INR {(cart.total * 4) / 3}
            </h2>
          </div>
          <div className="bg-green-100 border-green-700 border-2 my-4 text-left p-4">
            <h3 className="text-lg font-semibold">
              This payment will be transferred through a secure payment gateway.
            </h3>
            <p>
              In countries other than India, the estimated total may differ by
              some amount as all the calculations have been done in INR. fundME
              is not responsible for any fraud or scam on the seller's side.
            </p>
          </div>
          <Terms></Terms>
          <Link to="/checkout/payment">
            <Button bgRed wide>
              PROCEED
            </Button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
