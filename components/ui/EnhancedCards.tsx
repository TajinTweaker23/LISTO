import React from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark } from "lucide-react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled" | "glass";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  size = "md",
  interactive = false,
  href,
  onClick,
  className = "",
}) => {
  const variants = {
    default: "bg-white border border-sage-200 shadow-sm",
    elevated: "bg-white shadow-lg border-0",
    outlined: "bg-transparent border-2 border-sage-300",
    filled: "bg-sage-50 border-0",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg",
  };

  const sizes = {
    sm: "p-4 rounded-xl",
    md: "p-6 rounded-2xl", 
    lg: "p-8 rounded-3xl",
  };

  const interactiveClasses = interactive
    ? "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
    : "";

  const Component = href ? "a" : "div";

  return (
    <motion.div
      initial={interactive ? { scale: 1 } : undefined}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${interactiveClasses}
        ${className}
      `}
      onClick={onClick}
      {...(href && { href })}
      // @ts-ignore
      as={Component}
    >
      {children}
    </motion.div>
  );
};

interface ProductCardProps {
  title: string;
  description?: string;
  image: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  onLike?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onClick?: () => void;
  liked?: boolean;
  bookmarked?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  price,
  originalPrice,
  badge,
  onLike,
  onShare,
  onBookmark,
  onClick,
  liked = false,
  bookmarked = false,
}) => {
  return (
    <Card variant="glass" interactive onClick={onClick} className="group overflow-hidden">
      <div className="relative">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {badge && (
          <div className="absolute top-3 left-3 bg-sage-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {badge}
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${
              liked ? "bg-red-500 text-white" : "bg-white/80 text-gray-600"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.();
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${
              bookmarked ? "bg-sage-500 text-white" : "bg-white/80 text-gray-600"
            }`}
          >
            <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-sage-900 group-hover:text-sage-700 transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-sage-600 line-clamp-2">{description}</p>
        )}
        
        {price && (
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sage-900">{price}</span>
            {originalPrice && (
              <span className="text-sm text-sage-400 line-through">{originalPrice}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

interface ProfileCardProps {
  name: string;
  title?: string;
  avatar: string;
  bio?: string;
  stats?: { label: string; value: string | number }[];
  actions?: { label: string; onClick: () => void; variant?: "primary" | "secondary" }[];
  verified?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatar,
  bio,
  stats = [],
  actions = [],
  verified = false,
}) => {
  return (
    <Card variant="glass" className="text-center">
      <div className="relative inline-block">
        <motion.img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
          whileHover={{ scale: 1.05 }}
        />
        {verified && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-bold text-lg text-sage-900">{name}</h3>
        {title && <p className="text-sage-600">{title}</p>}
        {bio && <p className="text-sm text-sage-500 max-w-xs mx-auto">{bio}</p>}
      </div>
      
      {stats.length > 0 && (
        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-sage-200">
          {stats.map((stat, index) => (
            <div key={`stat-${stat.label}-${index}`} className="text-center">
              <div className="font-bold text-sage-900">{stat.value}</div>
              <div className="text-xs text-sage-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      {actions.length > 0 && (
        <div className="flex space-x-2 mt-6">
          {actions.map((action, index) => (
            <motion.button
              key={`action-${action.label}-${index}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={`
                flex-1 py-2 px-4 rounded-xl font-medium transition-colors
                ${action.variant === "primary" 
                  ? "bg-sage-600 text-white hover:bg-sage-700" 
                  : "bg-sage-100 text-sage-700 hover:bg-sage-200"
                }
              `}
            >
              {action.label}
            </motion.button>
          ))}
        </div>
      )}
    </Card>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
}) => {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      if (allowMultiple) {
        return prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <Card key={item.id} variant="outlined" className="overflow-hidden">
            <motion.button
              onClick={() => toggleItem(item.id)}
              className="w-full text-left flex items-center justify-between p-0"
            >
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <div className="text-sage-600">{item.icon}</div>
                )}
                <span className="font-medium text-sage-900">{item.title}</span>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-sage-400"
              >
                ↓
              </motion.div>
            </motion.button>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-sage-200 mt-4">
                {item.content}
              </div>
            </motion.div>
          </Card>
        );
      })}
    </div>
  );
};

export default Card;
