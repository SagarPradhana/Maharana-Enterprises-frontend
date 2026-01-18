import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { createOrder, resetOrder } from '../redux/slices/orderSlice';
import { type RootState, type AppDispatch } from '../redux/store';
import { useEffect } from 'react';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);
    const { cartItems } = cart;
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { success, order } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        if (success) {
            alert(`Order Placed Successfully! ID: ${order?.id}`);
            dispatch(clearCart());
            dispatch(resetOrder());
            navigate('/');
        }
    }, [success, order, navigate, dispatch]);

    const updateQty = (item: any, qty: number) => {
        if (qty < 1) return;
        dispatch(addToCart({ ...item, qty }));
    };

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Create Order directly (Mocking a simple Checkout process without payment gateway for now)
        const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: "Bhubaneswar, Odisha", // Hardcoded for demo
            paymentMethod: "COD",
            itemsPrice: totalPrice,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: totalPrice
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
                        <Link to="/products" className="inline-flex items-center text-blue-600 hover:underline font-medium">
                            Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.product} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" /> */}
                                        {item.name}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-blue-600 font-bold">₹{item.price}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQty(item, item.qty - 1)}
                                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item, item.qty + 1)}
                                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCartHandler(item.product)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-2 mb-4 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
