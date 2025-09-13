"use client";

import { useToastList } from '@/contexts/toast-context/hooks';
import { twMerge } from 'tailwind-merge';

export const Toast = () => {
  const toasts = useToastList();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map(({ id, message, type }) => {
        const bgColor = {
          error: 'bg-red-600',
          success: 'bg-green-600',
          warning: 'bg-yellow-500 text-black',
          info: 'bg-blue-600',
        }[type];

        return (
          <div
            key={id}
            className={twMerge(
              twMerge(
                'px-4 py-2 rounded shadow-md text-white animate-fade-in-up',
                bgColor
              )
            )}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
