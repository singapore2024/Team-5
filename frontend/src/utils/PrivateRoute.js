import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }
};

export default PrivateRoute;