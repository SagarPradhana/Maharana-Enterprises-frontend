import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, CheckCircle2, Phone, Mail } from 'lucide-react';
import { fetchServiceById } from '../redux/slices/serviceSlice';
import { type AppDispatch, type RootState } from '../redux/store';
import BookingModal from '../components/services/BookingModal'; // Reusing existing modal

const ServiceDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { service, loading, error } = useSelector((state: RootState) => state.services);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchServiceById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div></div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!service) return <div className="text-center py-20">Service not found</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                {/* Replace with actual Image */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <span className="text-9xl font-bold text-white opacity-10 tracking-tighter uppercase">{service.title}</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/services" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium">
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Services
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
                        >
                            {service.title}
                        </motion.h1>
                        <p className="text-xl text-gray-200 max-w-2xl">{service.description}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
                        <div className="prose prose-lg text-gray-600 mb-10">
                            <p>{service.description}</p>
                            <p>We provide top-notch {service.title} with high-quality materials and expert craftsmanship. Our team ensures timely delivery and complete satisfaction.</p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose This Service?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {['Quality Assurance', 'Expert Team', 'Timely Completion', 'Affordable Pricing'].map((feature, idx) => (
                                <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                                    <span className="font-semibold text-gray-800">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24">
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-4xl font-extrabold text-gray-900">
                                    ₹{service.price > 0 ? service.price : 'Custom'}
                                </span>
                                {service.price > 0 && <span className="text-gray-500 font-medium mb-1">/ {service.unit}</span>}
                            </div>

                            <motion.button
                                onClick={() => setIsBookingModalOpen(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition mb-6 flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-5 h-5" /> Book Now
                            </motion.button>

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="w-5 h-5 text-blue-500" />
                                    <span>+91 97778 26640</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                    <span>info@maharana.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                service={service}
            />
        </div>
    );
};

export default ServiceDetails;
