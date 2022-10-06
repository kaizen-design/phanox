import Link from "next/link";
import { Cart } from './';
import { useStateContext } from "../context/StateContext";
import { AiOutlineShopping } from 'react-icons/ai';

const Navbar = () => {
  const { showCart, setShowCart, cartItems, totalPrice, totalQuantity, qty } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          PHANOX
        </Link>
      </p>  
      <button type="button" className="cart-icon" onClick={() => setShowCart((prev) => !prev)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      {!!showCart && <Cart />}      
    </div>
  )
};

export default Navbar;