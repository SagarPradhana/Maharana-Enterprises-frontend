import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

interface ProductProps {
    product: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: string;
        countInStock?: number;
    };
}

const ProductCard = ({ product }: ProductProps) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            product: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock || 10,
            qty: 1
        }));
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                {/* Placeholder Gradient if Image Missing (Real app would use img tag) */}
                {/* <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> */}

                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10 text-center p-4">
                    {/* Fallback Icon or Text */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-blue-500 font-bold text-xl">
                        {product.name.charAt(0)}
                    </div>
                    <span className="text-gray-400 font-medium text-sm italic">{product.name}</span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Tag className="w-3 h-3 text-blue-500" />
                        {product.category}
                    </span>
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <Link to={`/products/${product.id}`}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 shadow-lg"
                            title="View Details"
                        >
                            <Eye className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <motion.button
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow-lg"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Price</span>
                        <span className="text-xl font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <motion.button
                        onClick={handleAddToCart}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        Add
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
