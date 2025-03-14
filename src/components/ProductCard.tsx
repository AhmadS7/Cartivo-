import { Link } from 'react-router-dom';

    interface Product {
      id: number;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }

    interface ProductCardProps {
      product: Product;
    }

    const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
          {/* <p className="text-gray-500 mt-2 text-sm">{product.description}</p>  */}
          {/* Keep description short or truncate */}
        </div>
      </Link>
    </div>
    );
    };

    export default ProductCard;
