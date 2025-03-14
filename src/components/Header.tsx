import { Link } from 'react-router-dom';
    import { ShoppingCart, User, LogIn, LogOut } from 'lucide-react';

    interface HeaderProps {
      isAuthenticated: boolean;
      isAdmin: boolean;
      onLogout: () => void; // Add this prop
    }
    const Header: React.FC<HeaderProps> = ({ isAuthenticated, isAdmin, onLogout }) => {

    return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold text-gray-800">
          <ShoppingCart className="mr-2" />
          E-Commerce
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-500">Products</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/cart" className="hover:text-blue-500">Cart</Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-blue-500">Orders</Link>
                </li>
                {isAdmin &amp;&amp; (
                  <li>
                    <Link to="/admin" className="hover:text-blue-500">Admin</Link>
                  </li>
                )}
                <li>
                  <button onClick={onLogout} className="hover:text-blue-500 flex items-center">
                    <LogOut className="mr-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-blue-500 flex items-center">
                  <LogIn className="mr-1" /> Login / Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
    );
    };

    export default Header;
