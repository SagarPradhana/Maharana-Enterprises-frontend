import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute w-[500px] h-[500px] bg-blue-400 rounded-full blur-[100px] opacity-20 -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-[500px] h-[500px] bg-purple-400 rounded-full blur-[100px] opacity-20 -bottom-20 -right-20 animate-pulse delay-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/50 backdrop-blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                        Elevate Your Space <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            With Excellence
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        From modern False Ceilings to robust Steel Fabrication, we bring artistry and durability to your doorstep. Experience the difference of quality craftsmanship.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/40 transition-all flex items-center gap-2 group"
                            >
                                Shop Products
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                            >
                                Get a Quote
                            </motion.button>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span>Top Rated Quality</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span>500+ Projects Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
