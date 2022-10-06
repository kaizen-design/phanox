import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  const addToCart = (product, quantity) => {        
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantity((prev) => prev + quantity);

    if (cartItems.find((item) => item._id === product._id)) {      
      const updatedCartItems = cartItems.map((item) => {        
        if (item._id === product._id) return {
          ...item,
          quantity: item.quantity + quantity
        }
      });
      setCartItems(updatedCartItems);          
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);      
    }
    
    toast.success(`${qty} ${product.title}${quantity > 1 ? 's' : ''} added to the cart.`);
  };

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    })
  };

  const toggleCartItemQuantity = (id, action) => {
    const product = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((item) => item._id === id);    
    const updatedCartItems = [...cartItems];    

    switch(action) {
      case 'increment':
        updatedCartItems[index] = {
          ...product, 
          quantity: product.quantity + 1
        };        
        setTotalPrice((prev) => prev + product.price);
        setTotalQuantity((prev) => prev + 1);
        break;
      case 'decrement':
        if (product.quantity > 1) {
          updatedCartItems[index] = {
            ...product, 
            quantity: product.quantity - 1
          }          
          setTotalPrice((prev) => prev - product.price);
          setTotalQuantity((prev) => prev - 1);
        }        
        break;
    }

    setCartItems([...updatedCartItems]);
  };

  const deleteCartItem = (id) => {
    const product = cartItems.find((item) => item._id === id);    
    setCartItems([...cartItems.filter((item) => item._id !== id)]);
    setTotalPrice((prev) => prev - product.price * product.quantity);
    setTotalQuantity((prev) => prev - product.quantity);
  };

  return (
    <Context.Provider value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantity,
      qty,
      increaseQty,
      decreaseQty,
      addToCart,
      toggleCartItemQuantity,
      deleteCartItem
    }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);