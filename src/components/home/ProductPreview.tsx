import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const products = [
    { id: 1, name: 'Premium Gypsum Board', price: '₹450', category: 'Ceiling' },
    { id: 2, name: 'Tough Steel Gate', price: '₹12,000', category: 'Fabrication' },
    { id: 3, name: 'UPVC Sliding Window', price: '₹3,500', category: 'UPVC' },
];

const ProductPreview = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Shop Best Sellers</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Featured Products</h2>
                    </div>
                    <Link to="/products" className="hidden md:flex items-center text-gray-700 font-medium hover:text-blue-600 transition">
                        View All Collection <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group block"
                        >
                            <div className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden mb-5">
                                {/* Placeholder for Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl italic bg-gray-50 group-hover:scale-105 transition-transform duration-700">
                                    {product.name}
                                </div>

                                {/* Overlay Action */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <Link to="/products" className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.category}</span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
                                <p className="text-gray-500 mt-1">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/products" className="inline-flex items-center text-blue-600 font-bold">
                        View All Collection <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductPreview;
