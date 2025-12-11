import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const ProductsCard = ({ product }) => {
  // Call hooks
  const { user } = useAuth();

  const { media, productName, description, price, category, _id } = product;
  // console.log(product._id);

  return (
    <div>
      <div className="card bg-base-100 shadow-sm p-4 transform transition-transform duration-300 hover:scale-95 hover:duration-500 md:h-[600px] lg:h-[650px]">
        <figure className="p-4">
          <img
            className="w-full h-[200px] md:h-[250px] lg:h-[300px] rounded border"
            src={media.images[0]}
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{productName}</h2>
          <p className="text-justify text-gray-500">{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{category}</div>
          </div>
          <h2 className="text-lg font-bold">Price : ${price}</h2>
        </div>
        <div className="px-6 w-full pb-4">
          {user ? (
            <Link
              to={`/product-details/${_id}`}
              className="bg-primary px-8 py-2 rounded-2xl "
            >
              View Details
            </Link>
          ) : (
            <Link
              to="/auth/register"
              className="bg-primary px-8 py-2 rounded-2xl "
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
