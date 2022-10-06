import { useRef } from "react";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantity, cartItems, setShowCart } = useStateContext();  
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">
            ({totalQuantity} item{totalQuantity > 1 ? 's' : ''})
          </span>
        </button>
        
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty.</h3>
            <Link href="/">
              <button type="button" className="btn" onClick={() => setShowCart(false)}>
                Let&apos;s go shopping!
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 && cartItems.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={() => {}}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ 
    product: { 
      _id: id, 
      image, 
      title, 
      price, 
      quantity 
    } 
  }) => {
  const { toggleCartItemQuantity, deleteCartItem } = useStateContext();   
  return (
    <div className="product">
      <img 
        src={urlFor(image[0])} 
        alt={title} 
        className="cart-product-image" 
      />
      <div className="item-desc">
        <div className="flex top">
          <h5>{title}</h5>
          <h4>${price}</h4>
        </div>
        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
              <span 
                className="minus" 
                onClick={() => toggleCartItemQuantity(id, 'decrement')}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span 
                className="plus" 
                onClick={() => toggleCartItemQuantity(id, 'increment')}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div> 
          <button 
            type="button" 
            className="remove-item" 
            onClick={() => deleteCartItem(id)}
          >
            <TiDeleteOutline />
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Cart;