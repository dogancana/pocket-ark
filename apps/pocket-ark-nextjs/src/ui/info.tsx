import { FC } from '../utils';

export interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success';
}

const CLASS_MAP = {
  info: {
    bg: 'bg-teal-100',
    border: 'border-teal-500',
    text: 'text-teal-900',
  },
  error: {
    bg: 'bg-rose-100',
    border: 'border-rose-500',
    text: 'text-rose-900',
  },
  warning: {
    bg: 'bg-amber-100',
    border: 'border-amber-500',
    text: 'text-amber-900',
  },
  success: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-900',
  },
};

export const Alert: FC<AlertProps> = ({ children, type }) => {
  const { bg, border, text } = CLASS_MAP[type ?? 'info'];

  return (
    <div
      className={`${bg} ${border} ${text} border-t-4 rounded-b px-4 py-3 shadow-md`}
      role="alert"
    >
      <div className="flex container mx-auto">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 ${text} mr-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
