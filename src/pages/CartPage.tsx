import React from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { RootState } from '../store/store';
    import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
    import { Link } from 'react-router-dom';

    const CartPage: React.FC = () => {
      const cartItems = useSelector((state: RootState) => state.cart.items);
      const dispatch = useDispatch();

      const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
      };

      const handleUpdateQuantity = (productId: number, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
      };

      const handleClearCart = () => {
        dispatch(clearCart());
      };

      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      return (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                <div className='flex gap-4'>
                  <button onClick={handleClearCart} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Clear Cart
                  </button>
                  <Link to='/checkout'>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                      Checkout
                    </button>
                  </Link>
                </div>

              </div>
            </>
          )}
        </div>
      );
    };

    export default CartPage;
