import React, { useState, useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import { useDispatch } from 'react-redux';
    import { addToCart } from '../store/cartSlice';

    interface Product {
      id: number;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }
    const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
    // Fetch product details based on id (replace with actual API call)
    const fetchProductDetails = async () => {
    // Simulate fetching from an API
    const placeholderProduct: Product = {
    id: Number(id),
    name: `Product ${id}`,
    description: `Details for product ${id}... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    price: 99.99 * Number(id),
    imageUrl: `https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww`, // Replace with a relevant image
    };
    setProduct(placeholderProduct);
    };

    fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
    if (product) {
    dispatch(addToCart(product));
    alert('Added to cart!'); // Consider using a more sophisticated notification
    }
    };

    if (!product) {
    return <div>Loading product details...</div>;
    }

    return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 rounded-lg shadow-md" />
        <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    );
    };

    export default ProductDetailPage;
