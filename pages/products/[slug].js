import { client, urlFor } from "../../lib/client";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { Product } from "../../components";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { handleCheckout } from "../../lib/stripe";

const ProductDetails = ({ product, products }) => {    
  const { title, image, details, price} = product;
  const [index, setIndex] = useState(0); 
  const { increaseQty, decreaseQty, qty, addToCart } = useStateContext();  
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt={title}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                alt={title}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{title}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <div className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className="buttons">
            <button 
              type="button" 
              className="add-to-cart" 
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button 
              type="button" 
              className="buy-now" 
              onClick={() => handleCheckout([{
                ...product, 
                quantity: qty
              }])}
            >
              Byu Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {    
  const product = await client.fetch(`*[_type == "product" && slug.current == "${slug}"][0]`);  
  const products = await client.fetch(`*[_type == "product" && slug.current != "${slug}"]`);  
  return {
    props: { product, products }
  };
};

export default ProductDetails;