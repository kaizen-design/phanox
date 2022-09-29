import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ 
  product: { 
    image, 
    title, 
    slug: { current: slug }, 
    price 
  } 
}) => {  
  return (
    <div>
      <Link href={`/products/${slug}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            alt={title}
            width="250"
            height="250"
            className="product-image"
          />
          <p className="product-name">{title}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
};

export default Product;