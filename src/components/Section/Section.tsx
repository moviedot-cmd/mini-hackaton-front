import type { FC, ReactNode } from 'react';
import './Section.scss';

export interface SectionProps {
  title: string;
  color: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
  id?: string;
}

export const Section: FC<SectionProps> = ({
  title,
  color,
  className = '',
  children,
  id,
}) => {
  // Fallback for runtime values that don't match the TypeScript union.
  const theme = color === 'primary' || color === 'secondary' ? color : 'primary';

  return (
    <section
      id={id}
      className={`section section--${theme} ${className}`.trim()}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="section__container">
        <h2 id={id ? `${id}-title` : undefined} className="section__title">
          {title}
        </h2>
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
};
