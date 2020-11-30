import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2> This Section is to load all the products</h2>
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This Section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Welcome to Your Favourites">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout
          products={products}
          setReload={setReload}
           />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
