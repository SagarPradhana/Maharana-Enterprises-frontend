import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid, LayoutTemplate, Box, Settings, DoorOpen } from 'lucide-react';

const services = [
    {
        icon: <Grid className="w-8 h-8 text-blue-600" />,
        title: 'Aluminium Work',
        desc: 'Sliding windows, doors, partitions, glazing, mosquito nets, and ventilators.',
        bg: 'bg-blue-50',
        delay: 0
    },
    {
        icon: <LayoutTemplate className="w-8 h-8 text-green-600" />,
        title: 'UPVC Work',
        desc: 'UPVC sliding windows with mosquito nets, doors, and partitions.',
        bg: 'bg-green-50',
        delay: 0.1
    },
    {
        icon: <Box className="w-8 h-8 text-purple-600" />,
        title: 'Ceiling Work',
        desc: 'Gypsum, POP, and PVC ceilings. We create custom designs to match your style.',
        bg: 'bg-purple-50',
        delay: 0.2
    },
    {
        icon: <Settings className="w-8 h-8 text-orange-600" />,
        title: 'Steel Work',
        desc: 'Staircase railings, steel gates, main entrance sliding gates, and window grills.',
        bg: 'bg-orange-50',
        delay: 0.3
    },
    {
        icon: <DoorOpen className="w-8 h-8 text-teal-600" />,
        title: 'Door Solutions',
        desc: 'Sunmica pasting, HDMR, Lamination, Membrane, 3D/2D Carving, and WPC Doors.',
        bg: 'bg-teal-50',
        delay: 0.4
    },
];

const ServiceShowcase = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Our Expertise
                    </motion.h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer relative overflow-hidden flex flex-col h-full"
                        >
                            {/* Background Decoration */}
                            <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-full blur-2xl -mr-10 -mt-10 opacity-50`}></div>

                            <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                                {item.desc}
                            </p>

                            <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold text-sm group/link mt-auto">
                                Explore <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceShowcase;
