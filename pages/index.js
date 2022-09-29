import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client';

const Home = ({ products, headerBanner, footerBanner }) => {
  console.log(products);
  return (
    <>      
      <HeroBanner data={headerBanner.length && headerBanner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => <Product key={product?._id} product={product} />)}
      </div>
      <FooterBanner data={footerBanner.length && footerBanner[0]} />
    </>
  )
};

export const getServerSideProps = async () => {  
  const products = await client.fetch('*[_type == "product"]');
  const headerBanner = await client.fetch('*[_type == "header_banner"]');
  const footerBanner = await client.fetch('*[_type == "footer_banner"]');

  return {
    props: { products, headerBanner, footerBanner }
  }
};

export default Home;
