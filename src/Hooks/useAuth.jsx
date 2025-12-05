import React, { use } from "react";
import { AuthContext } from "../../../../Milestone-11/Zapshift/zap-shift-client/src/Providers/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
