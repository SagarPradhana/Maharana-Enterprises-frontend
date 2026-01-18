import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';

const AdminRoute = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    // 1. Not Authenticated -> Redirect to Login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Authenticated but Not Admin -> Redirect to Home
    if (user && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 3. Authenticated Admin -> Allow access
    return <Outlet />;
};

export default AdminRoute;
