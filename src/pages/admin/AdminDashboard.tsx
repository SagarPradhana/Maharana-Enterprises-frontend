import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { fetchProducts, createProduct, deleteProduct, updateProduct } from '../../redux/slices/productSlice';
import { fetchServices, createService, deleteService, updateService } from '../../redux/slices/serviceSlice';
import { type AppDispatch, type RootState } from '../../redux/store';
import { LayoutDashboard, Package, Briefcase, Plus, Trash2, Edit, X, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);
    const { services } = useSelector((state: RootState) => state.services);

    const [activeTab, setActiveTab] = useState('overview');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Initial Data Fetch
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchServices());
    }, [dispatch]);

    // Handle Auth Config for Requests
    // Note: token should be from selector or localStorage? Slice passes it from state properly?
    // Assuming token in auth state is valid due to AdminRoute.

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    // --- Product Handlers ---
    const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            category: formData.get('category') as string,
            description: formData.get('description') as string,
            countInStock: Number(formData.get('countInStock')),
            image: formData.get('image') as string, // Manual URL input for now
        };

        if (editingItem) {
            dispatch(updateProduct({ id: editingItem.id, productData: data, token: token! }));
        } else {
            dispatch(createProduct({ productData: data, token: token! }));
        }
        setIsProductModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Delete this product?')) {
            dispatch(deleteProduct({ id, token: token! }));
        }
    };

    // --- Service Handlers ---
    const handleServiceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title') as string,
            price: Number(formData.get('price')),
            description: formData.get('description') as string,
            unit: formData.get('unit') as string,
            image: formData.get('image') as string,
        };

        if (editingItem) {
            dispatch(updateService({ id: editingItem.id, serviceData: data, token: token! }));
        } else {
            dispatch(createService({ serviceData: data, token: token! }));
        }
        setIsServiceModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteService = (id: string) => {
        if (window.confirm('Delete this service?')) {
            dispatch(deleteService({ id, token: token! }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
                    <p className="text-sm text-gray-500 mt-1">Hello, {user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Package className="w-5 h-5" /> Products
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Briefcase className="w-5 h-5" /> Services
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 mt-8">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Products</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{products.length}</h3>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Package /></div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Services</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{services.length}</h3>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg text-green-600"><Briefcase /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                            <button
                                onClick={() => { setEditingItem(null); setIsProductModalOpen(true); }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                            >
                                <Plus className="w-4 h-4" /> Add Product
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">₹{product.price}</td>
                                            <td className="px-6 py-4 text-gray-600">{product.countInStock}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => { setEditingItem(product); setIsProductModalOpen(true); }} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
                            <button
                                onClick={() => { setEditingItem(null); setIsServiceModalOpen(true); }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                            >
                                <Plus className="w-4 h-4" /> Add Service
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Unit</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Per Unit</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {services.map(service => (
                                        <tr key={service.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                                            <td className="px-6 py-4 text-gray-600">{service.unit}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">₹{service.price}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => { setEditingItem(service); setIsServiceModalOpen(true); }} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteService(service.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingItem ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="space-y-4">
                            <input name="name" defaultValue={editingItem?.name} placeholder="Product Name" required className="w-full px-4 py-2 border rounded-lg" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="price" type="number" defaultValue={editingItem?.price} placeholder="Price" required className="w-full px-4 py-2 border rounded-lg" />
                                <input name="countInStock" type="number" defaultValue={editingItem?.countInStock} placeholder="Stock" required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <input name="category" defaultValue={editingItem?.category} placeholder="Category" required className="w-full px-4 py-2 border rounded-lg" />
                            <input name="image" defaultValue={editingItem?.image} placeholder="Image URL (e.g. /images/door.jpg)" className="w-full px-4 py-2 border rounded-lg" />
                            <textarea name="description" defaultValue={editingItem?.description} placeholder="Description" rows={3} required className="w-full px-4 py-2 border rounded-lg" />

                            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 mt-4">
                                {editingItem ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{editingItem ? 'Edit Service' : 'Add New Service'}</h3>
                            <button onClick={() => setIsServiceModalOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <input name="title" defaultValue={editingItem?.title} placeholder="Service Title" required className="w-full px-4 py-2 border rounded-lg" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="price" type="number" defaultValue={editingItem?.price} placeholder="Price" className="w-full px-4 py-2 border rounded-lg" />
                                <input name="unit" defaultValue={editingItem?.unit} placeholder="Unit (e.g. sqft)" className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <input name="image" defaultValue={editingItem?.image} placeholder="Image URL" className="w-full px-4 py-2 border rounded-lg" />
                            <textarea name="description" defaultValue={editingItem?.description} placeholder="Description" rows={3} required className="w-full px-4 py-2 border rounded-lg" />

                            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 mt-4">
                                {editingItem ? 'Update Service' : 'Create Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
