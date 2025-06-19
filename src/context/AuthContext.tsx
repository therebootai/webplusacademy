"use client";
import { checkTokenAuth } from "@/actions/authAction";
import { UserDocument } from "@/models/User";
import { createContext, Dispatch, useEffect, useReducer } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: UserDocument | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: any } // Replace `any` with your actual user type
  | { type: "LOGOUT" };

interface AuthContextType extends AuthState {
  login: (user: UserDocument) => void;
  logout: () => void;
  dispatch: Dispatch<AuthAction>;
}

const authState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>({
  ...authState,
  login: () => {},
  logout: () => {},
  dispatch: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, authState);

  const checkAuth = async () => {
    try {
      const user = await checkTokenAuth();

      if (user) {
        dispatch({ type: "LOGIN", payload: user.user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = (user: UserDocument) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  // Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
