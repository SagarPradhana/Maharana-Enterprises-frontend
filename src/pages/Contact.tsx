import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log('Contact Data:', data);
        alert('Thank you for contacting us! We will get back to you soon.');
        reset();
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Header */}
            <div className="bg-blue-600 text-white py-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-2"
                >
                    Get in Touch
                </motion.h1>
                <p className="text-blue-100">We'd love to hear from you. Here's how you can reach us.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Information & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Our Location</h3>
                                        <p className="text-gray-600">123 Industrial Area, Phase 1</p>
                                        <p className="text-gray-600">Bhubaneswar, Odisha, 751010</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone Number</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-gray-600">+91 12345 67890</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email Address</h3>
                                        <p className="text-gray-600">info@maharanaenterprises.com</p>
                                        <p className="text-gray-600">support@maharanaenterprises.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Clock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                        <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0645645!2d85.8!3d20.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE4JzAwLjAiTiA4NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        {...register('phone', { required: 'Phone is required' })}
                                        type="tel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                        placeholder="+91 98765 43210"
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message as string}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    {...register('subject', { required: 'Please select a subject' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                >
                                    <option value="">Select a service...</option>
                                    <option value="Gypsum Ceiling">Gypsum Ceiling</option>
                                    <option value="UPVC Work">UPVC Work</option>
                                    <option value="Steel Fabrication">Steel Fabrication</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message as string}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    {...register('message', { required: 'Message is required' })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                    placeholder="Tell us about your project requirements..."
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs">{errors.message.message as string}</span>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
