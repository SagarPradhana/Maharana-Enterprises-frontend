import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceProps {
    service: {
        id: string;
        title: string;
        description: string;
        price: number;
        unit: string;
        image: string;
    };
    onBook: (service: any) => void;
}

const ServiceCard = ({ service, onBook }: ServiceProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group relative"
        >
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100" />

            <div className="h-48 bg-gray-100 relative overflow-hidden">
                {/* Placeholder for Image */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-50 flex items-center justify-center">
                    <span className="text-gray-400 font-bold text-2xl italic opacity-50 tracking-widest">{service.title}</span>
                </div>

                {/* Overlay Link */}
                <Link to={`/services/${service.id}`} className="absolute inset-0 z-10" />

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm z-20">
                    <span className="text-blue-600 font-extrabold text-lg">
                        {service.price > 0 ? `₹${service.price}` : 'Custom'}
                    </span>
                    {service.price > 0 && <span className="text-gray-500 text-xs font-medium ml-1">/ {service.unit}</span>}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <Link to={`/services/${service.id}`}>
                        {service.title}
                    </Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                </p>

                {/* Feature List (Mock) */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-xs text-gray-500">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                        <span>Premium Materials</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                        <span>Expert Installation</span>
                    </div>
                </div>

                <motion.button
                    onClick={() => onBook(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group/btn hover:bg-blue-600 transition-colors shadow-lg"
                >
                    <Calendar className="w-5 h-5" />
                    <span>Book Service</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
