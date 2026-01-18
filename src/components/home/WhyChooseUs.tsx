import { motion } from 'framer-motion';
import { Shield, Clock, Award, ThumbsUp } from 'lucide-react';

const features = [
    { icon: <Shield className="w-8 h-8" />, title: 'Verified Quality', desc: 'ISO certified materials used in every single project.', color: 'text-blue-500' },
    { icon: <Clock className="w-8 h-8" />, title: 'On-Time Delivery', desc: 'We respect your time. Projects delivered exactly when promised.', color: 'text-green-500' },
    { icon: <Award className="w-8 h-8" />, title: 'Expert Team', desc: '10+ years of experience in fabrication and interior design.', color: 'text-purple-500' },
    { icon: <ThumbsUp className="w-8 h-8" />, title: 'Best Pricing', desc: 'Premium services at the most competitive market rates.', color: 'text-orange-500' },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-gray-900 text-white">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why We Are The Best</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-gray-300 transition">
                        We don't just build; we create lasting value for your homes and offices.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className={`w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 ${feature.color}`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
