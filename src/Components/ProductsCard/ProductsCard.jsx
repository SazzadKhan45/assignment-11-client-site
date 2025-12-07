import React from "react";

const ProductsCard = ({ product }) => {
  const { media, productName, description } = product;

  return (
    <div>
      <div className="card bg-base-100 shadow-sm p-4 transform transition-transform duration-300 hover:scale-105 hover:duration-500">
        <figure className="p-4">
          <img
            className="w-full h-[200px] md:h-[250px] lg:h-[300px] rounded border"
            src={media.images[0]}
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{productName}</h2>
          <p className="text-justify">{description}</p>
          <div className="card-actions">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
