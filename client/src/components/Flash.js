import { useContext } from "react";
import { FlashContext } from "../App";
import { ImCross } from "react-icons/im";

function Flash() {
  const { flash, setFlash } = useContext(FlashContext);

  const handleClick = () => {
    setFlash("");
  };

  let content;

  if (flash !== "") {
    content = (
      <div className="bg-green-50 py-2 px-4 text-xl font-bold text-red-500 flex justify-between text-center my-auto">
        <div className="w-full text-center">{flash}</div>
        <ImCross
          className="w-fit my-auto cursor-pointer"
          onClick={() => {
            handleClick();
          }}
        ></ImCross>
      </div>
    );
  } else {
    content = <div></div>;
  }
  return <div>{content}</div>;
}

export default Flash;
