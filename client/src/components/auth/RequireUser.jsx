import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import jwtDecode from "jwt-decode";

import {selectCurrentToken} from "../../app/features/auth/authSlice";

const RequireUser = ({elm}) => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  let content;

  if (token) {
    const decoded = jwtDecode(token);
    const {role} = decoded.UserInfo;
    content =
      role === "user" ? (
        elm
      ) : (
        <Navigate to="/dashboard" state={{from: location}} replace />
      );
  } else {
    content = <Navigate to="/login" state={{from: location}} replace />;
  }

  return content;
};

export default RequireUser;
