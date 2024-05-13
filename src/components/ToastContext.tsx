import { createContext, useContext } from 'react';

export const ToastContext = createContext({
  callToast: (message: string, type: 'success' | 'error' = 'success') => {},
});

export const useToast = () => useContext(ToastContext);
