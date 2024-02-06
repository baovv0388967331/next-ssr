import { createContext, Dispatch, ReactNode, useReducer } from 'react';

type Props = {
  children: ReactNode;
};

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
};

enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Action = {
  payload: AuthState;
  type: ActionType;
};

type AppContextType = {
  state: AuthState;
  dispatch: Dispatch<Action>;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
};

export const AuthContext = createContext<AppContextType | undefined>(undefined);

export const setJwtCookie = (payload: Partial<AuthState>) => {
  //cookies().set('jwtToken', payload, { expires: 7, path: '/' });
  return payload;
};

const reducer = (state: AuthState, action: Action) => {
  const actions = {
    [ActionType.LOGIN]: (): AuthState => {
      const payload = {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      setJwtCookie(payload);

      return payload;
    },
    [ActionType.LOGOUT]: (): AuthState => {
      return {
        ...state,
        ...initialState,
      };
    },
  };

  if (actions[action.type]) {
    return actions[action.type]();
  }

  return state;
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
