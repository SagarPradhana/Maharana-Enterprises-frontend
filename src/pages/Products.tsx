import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { fetchProducts } from '../redux/slices/productSlice';
import { type AppDispatch, type RootState } from '../redux/store';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-white shadow-sm sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
                            <p className="text-gray-500 text-sm mt-1">Explore our premium collection of home solutions</p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-600">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium max-w-2xl mx-auto">
                        {error}
                    </div>
                ) : (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="text-gray-300 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search terms</p>
                            </div>
                        ) : (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
