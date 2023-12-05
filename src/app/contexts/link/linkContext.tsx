'use client';
import { createContext, useReducer, Dispatch, ReactNode } from 'react';

interface LinkState {
  linkSuccess: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  linkToken: string | null;
  accessToken: string | null;
  itemId: string | null;
  isError: boolean;
  backend: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
}

const initialState: LinkState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: '', // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ['transactions'],
  linkTokenError: {
    error_type: '',
    error_code: '',
    error_message: '',
  },
};

type LinkAction = {
  type: 'SET_STATE';
  state: Partial<LinkState>;
};

interface LinkContext extends LinkState {
  dispatch: Dispatch<LinkAction>;
}

const LinkContext = createContext<LinkContext>(initialState as LinkContext);

const { Provider } = LinkContext;
export const LinkProvider: React.FC<{ children: ReactNode }> = (props) => {
  const reducer = (state: LinkState, action: LinkAction): LinkState => {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, ...action.state };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
};

export default LinkContext;
