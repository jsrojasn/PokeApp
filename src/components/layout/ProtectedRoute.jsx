import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {LOCAL_STORAGE_USER} from "../../utils/constants"

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
};

export default ProtectedRoute;
