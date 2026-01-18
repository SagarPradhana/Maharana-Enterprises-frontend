

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">MAHARANA ENTERPRISES</h2>
                        <p className="text-gray-400 text-sm mt-1">Premium UPVC, Steel & Interior Works</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Maharana Enterprises. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
