import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/slices/serviceSlice';
import { resetBookingState } from '../redux/slices/bookingSlice';
import { type AppDispatch, type RootState } from '../redux/store';
import ServiceCard from '../components/services/ServiceCard';
import BookingModal from '../components/services/BookingModal';
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { services, loading, error } = useSelector((state: RootState) => state.services);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleBookClick = (service: any) => {
        dispatch(resetBookingState());
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Services Hero */}
            <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            Professional Services
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                            Expert Solutions for Your Home
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            From artistic Ceilings to durable Fabrications, we deliver quality that stands the test of time.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        Error: {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onBook={handleBookClick}
                            />
                        ))}
                    </div>
                )}

                <BookingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    service={selectedService}
                />
            </div>
        </div>
    );
};

export default Services;
