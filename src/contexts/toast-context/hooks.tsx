"use client";

import { useContext } from 'react';

import { ToastContext } from './context';

function useSafeToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

export function useToast() {
  return useSafeToastContext().showToast;
}

export function useToastList() {
  return useSafeToastContext().toasts;
}
