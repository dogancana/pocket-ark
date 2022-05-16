import { FC } from '../../utils';

export interface PriceSectionProps {
  title: string;
  className?: string;
}

export const PriceSection: FC<PriceSectionProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={`mt-4 w-full ${className || ''}`}>
      <h3 className="ml-2 font-bold">{title}</h3>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};
