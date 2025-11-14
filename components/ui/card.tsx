import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Card variants for different sizes and styles
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      size: {
        sm: "p-4",
        default: "",
        lg: "p-8",
      },
      variant: {
        default: "",
        elevated: "shadow-lg hover:shadow-xl",
        flat: "shadow-none border-2",
        interactive: "hover:shadow-md cursor-pointer transition-shadow",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ size, variant }), className)}
      role="article"
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Fixed type mismatch and added heading level flexibility
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = "h3", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: "start" | "center" | "end" | "between" | "around";
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = "start", ...props }, ref) => {
    const justifyClasses = {
      start: "justify-start",
      center: "justify-center", 
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-6 pt-0",
          justifyClasses[justify],
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

// New: Convenient wrapper for common card patterns
interface QuickCardProps extends Omit<CardProps, 'title'> {
  cardTitle?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

const QuickCard = React.forwardRef<HTMLDivElement, QuickCardProps>(
  ({ cardTitle, description, footer, children, ...props }, ref) => (
    <Card ref={ref} {...props}>
      {(cardTitle || description) && (
        <CardHeader>
          {cardTitle && <CardTitle>{cardTitle}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
);
QuickCard.displayName = "QuickCard";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  QuickCard,
  type CardProps,
  type CardTitleProps,
  type CardFooterProps,
  type QuickCardProps
};