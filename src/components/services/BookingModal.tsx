// import { useState } from 'react';
import { X, Calendar, MapPin, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../redux/slices/bookingSlice';
import { type AppDispatch, type RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: any;
}

const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, success, error } = useSelector((state: RootState) => state.bookings);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isOpen) return null;

    const onSubmit = (data: any) => {
        dispatch(createBooking({
            serviceId: service.id,
            serviceName: service.title,
            ...data
        }));
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Book {service?.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        {!isAuthenticated ? (
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">Please login to book a service.</p>
                                <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Login to Continue</Link>
                            </div>
                        ) : success ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-600 mb-6">We have received your request. Our team will contact you shortly.</p>
                                <button onClick={onClose} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Close</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            {...register('date', { required: 'Date is required' })}
                                            type="date"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    {errors.date && <span className="text-red-500 text-xs">{errors.date.message as string}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            {...register('address', { required: 'Address is required' })}
                                            rows={3}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Enter full address..."
                                        ></textarea>
                                    </div>
                                    {errors.address && <span className="text-red-500 text-xs">{errors.address.message as string}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            {...register('notes')}
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Any specific requirements?"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {loading ? 'Confirming...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
