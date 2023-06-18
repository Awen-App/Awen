import React, { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    token: "",
    orgEmail:null
  });

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

const TrakkerContext = createContext();

const TrakkerProvider = ({ children }) => {
  const [trakker, setTrakker] = useState(false);

  return (
    <TrakkerContext.Provider value={[trakker, setTrakker]}>
      {children}
    </TrakkerContext.Provider>
  );
};
const organizationContext = createContext();


export { AuthContext, AuthProvider, TrakkerContext, TrakkerProvider };

