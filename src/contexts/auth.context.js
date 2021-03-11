import { createContext, useContext } from 'react';

const AuthContext = createContext({ isLogged: false });

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;