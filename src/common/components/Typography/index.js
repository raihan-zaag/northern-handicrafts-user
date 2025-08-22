import { cn } from '@/common/lib/utils';

const Typography = {
  Title1: ({ children, className = '' }) => (
    <h1
      className={cn(
        'text-xl font-bold leading-tight text-text-primary',
        className
      )}
    >
      {children}
    </h1>
  ),

  Title2: ({ children, className = '' }) => (
    <h2
      className={cn(
        'text-lg font-semibold leading-tight text-text-primary',
        className
      )}
    >
      {children}
    </h2>
  ),

  Title3: ({ children, className = '' }) => (
    <h3
      className={cn(
        'text-md font-medium leading-tight text-text-primary',
        className
      )}
    >
      {children}
    </h3>
  ),

  Paragraph: ({ children, className = '' }) => (
    <p
      className={cn(
        'text-base font-regular leading-normal text-text-secondary',
        className
      )}
    >
      {children}
    </p>
  ),

  BodyText: ({ children, className = '' }) => (
    <p
      className={cn(
        'text-sm font-regular leading-normal text-text-primary',
        className
      )}
    >
      {children}
    </p>
  ),

  SmallText: ({ children, className = '' }) => (
    <p
      className={cn(
        'text-xs font-regular leading-normal text-text-subtle',
        className
      )}
    >
      {children}
    </p>
  ),

  Description: ({ children, className = '' }) => (
    <p
      className={cn(
        'text-base font-regular leading-normal text-text-subtle',
        className
      )}
    >
      {children}
    </p>
  ),
};

export default Typography;
