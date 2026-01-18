import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, Tag } from 'lucide-react';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { type AppDispatch, type RootState } from '../redux/store';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                product: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock || 10,
                qty: 1
            }));
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative h-96 lg:h-auto bg-gray-100 flex items-center justify-center overflow-hidden group">
                            {/* Placeholder logic if no meaningful image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white opacity-50"></div>

                            {/* Replace with actual IMG tag in production */}
                            {/* <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> */}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative z-10 text-center"
                            >
                                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-6xl text-blue-500 font-bold mb-4">
                                    {product.name.charAt(0)}
                                </div>
                                <span className="text-gray-400 text-sm tracking-widest">{product.category}</span>
                            </motion.div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {product.category}
                                    </span>
                                    {product.countInStock > 0 ? (
                                        <span className="text-green-600 text-sm font-medium flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> In Stock</span>
                                    ) : (
                                        <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>

                                <div className="flex items-center mb-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                    </div>
                                    <span className="ml-2 text-gray-500 text-sm">(Customer Reviews)</span>
                                </div>

                                <div className="text-4xl font-bold text-gray-900 mb-6">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </div>

                                <p className="text-gray-600 text-lg mb-8 leading-relaxed border-t border-b border-gray-100 py-6">
                                    {product.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        onClick={handleAddToCart}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={product.countInStock === 0}
                                        className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-6 h-6" />
                                        Add to Cart
                                    </motion.button>
                                </div>

                                <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-gray-400" />
                                        <span>Fast Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-gray-400" />
                                        <span>Quality Guarantee</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
