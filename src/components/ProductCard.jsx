import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  const isAvailable = product?.isAvailable ?? true;
  const variations = product?.variations ?? {
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
  };
  return (
    <div
      id={product.id}
      key={product.id}
      className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
    >
      <div className="card text-center h-100 cursor-pointer" key={product.id}>
        <img
          className="card-img-top p-3 object-fit-contain"
          src={product.image}
          alt="Card"
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title font-weight-bold">
            {product.title.substring(0, 12)}...
          </h5>
          <p className="card-text text-body-tertiary">
            {product.description.substring(0, 90)}...
          </p>
        </div>
        {isAvailable && (
          <div className="card-body">
            <div className="list-group-item lead font-weight-bold">{`$${product.price}`}</div>
          </div>
        )}
        {!isAvailable && (
          <div className="card-body">
            <div className="list-group-item text-danger font-weight-bold">
              Out of Stock
            </div>
          </div>
        )}
        <div className="list-group list-group-flush p-3">
            <select className="form-select mb-2">
              <option value="">Select Color</option>
              {variations.colors.map((color, index) => (
                <option key={index} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
        </div>
        <div className="row m-0 p-3 card-footer">
          <div className="col-6">
            <Link to={"/product/" + product.id} className="btn btn-dark btn-block">
              Buy Now
            </Link>
          </div>
          <div className="col-6">
            <button
              className="btn btn-block btn-outline-dark"
              onClick={() => {
                toast.success("Added to cart");
                addProduct(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
