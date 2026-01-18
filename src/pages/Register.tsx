import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../redux/slices/authSlice';
import { type AppDispatch, type RootState } from '../redux/store';
import { motion } from 'framer-motion';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        return () => {
            dispatch(clearError());
        };
    }, [isAuthenticated, navigate, dispatch]);

    const onSubmit = (data: any) => {
        dispatch(registerUser(data));
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join Maharana Enterprises today</p>
                </div>

                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="John Doe"
                        />
                        {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                            })}
                            type="email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message as string}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                            type="password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
