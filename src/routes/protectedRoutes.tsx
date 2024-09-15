import { Navigate, useLocation,Outlet} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/service/firebase/firebase.config';

const ProtectedRoutes =  () => {
    const [user,loading] =  useAuthState(auth);
    const location = useLocation();

    if (loading) {
      return <div>...loading</div>
    }

      if (!user) {
        return  <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return <Outlet />;
}

export default ProtectedRoutes