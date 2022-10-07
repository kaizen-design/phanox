import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const QuantityCounter = ({ handleDecrement, handleIncrement }) => {
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    })
  };
  return (
    <div className="quantity-desc">
      <span 
        className="minus" 
        onClick={() => decreaseQuantity()}
      >
        <AiOutlineMinus />
      </span>
      <span className="num">{quantity}</span>
      <span 
        className="plus" 
        onClick={() => increaseQuantity()}
      >
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default QuantityCounter;