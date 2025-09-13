"use client";

import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextType | null>(null);
