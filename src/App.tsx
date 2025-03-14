import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Header from './components/Header';
    import Footer from './components/Footer';
    import HomePage from './pages/HomePage';
    import ProductDetailPage from './pages/ProductDetailPage';
    import LoginPage from './pages/LoginPage';
    import RegisterPage from './pages/RegisterPage';
    import CartPage from './pages/CartPage';
    import OrdersPage from './pages/OrdersPage';
    import AdminPage from './pages/AdminPage';
    import { Provider } from 'react-redux';
    import store from './store/store';
    import { useDispatch } from 'react-redux';
    import { checkAuth } from './store/authSlice';

    function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [isAdmin, setIsAdmin] = useState(false);
      const dispatch = useDispatch();

      useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const authStatus = await dispatch(checkAuth());
            setIsAuthenticated(authStatus.payload.isAuthenticated);
            setIsAdmin(authStatus.payload.isAdmin);
          } catch (error) {
            console.error('Failed to check authentication:', error);
          }
        };

        checkAuthentication();
      }, [dispatch]);

      const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
      };

      return (
        <Provider store={store}>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </Provider>
      );
    }

    export default App;
