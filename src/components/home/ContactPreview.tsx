import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const ContactPreview = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log('Contact form data:', data);
        alert('Thank you! We will contact you soon.');
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get a Free Quote</h2>
                            <p className="text-gray-600">Have a project in mind? Let us help you build it.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        {...register('phone', { required: true })}
                                        type="tel"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Mobile Number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    {...register('message', { required: true })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tell us about your requirement..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPreview;
