import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import Contact from '../pages/Contact';
import Cart from '../pages/Cart';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoute from '../components/layout/AdminRoute';

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Admin Protected Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        {/* Future admin routes will go here */}
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default AppRoutes;
