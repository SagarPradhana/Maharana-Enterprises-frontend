import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type RootState, type AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white shadow-sm py-4'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                            MAHARANA ENTERPRISES
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link key={link.name} to={link.path} className="relative group px-1 py-1">
                                <span className={`font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                                    {link.name}
                                </span>
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <ShoppingCart className={`w-6 h-6 ${cartItems.length > 0 ? 'fill-current' : ''}`} />
                            {cartItems.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm"
                                >
                                    {cartItems.reduce((acc: number, item: any) => acc + (item.qty || 0), 0)}
                                </motion.span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition font-medium">
                                    <User className="w-5 h-5" />
                                    <span>{user?.name?.split(' ')[0]}</span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 flex items-center space-x-2">
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-t overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-3">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition ${location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">
                                Cart ({cartItems.length})
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
