import React from "react";
import { motion } from "framer-motion";
import { Home, Search, Heart, User, Plus } from "lucide-react";
import { useRouter } from "next/router";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  special?: boolean; // For highlighted tabs like "create"
}

interface TabBarProps {
  items?: TabItem[];
  className?: string;
}

const defaultTabs: TabItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="w-6 h-6" />,
    href: "/",
  },
  {
    id: "explore", 
    label: "Explore",
    icon: <Search className="w-6 h-6" />,
    href: "/explore",
  },
  {
    id: "create",
    label: "Create", 
    icon: <Plus className="w-6 h-6" />,
    href: "/vision-board",
    special: true,
  },
  {
    id: "demo",
    label: "UI Demo",
    icon: <Heart className="w-6 h-6" />,
    href: "/mobile-ui-demo",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="w-6 h-6" />,
    href: "/profile",
  },
];

export const TabBar: React.FC<TabBarProps> = ({
  items = defaultTabs,
  className = "",
}) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`
        fixed bottom-0 left-0 right-0 z-40
        bg-white/95 backdrop-blur-lg border-t border-sage-200
        md:hidden ${className}
      `}
    >
      {/* Safe area padding for devices with home indicators */}
      <div className="pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {items.map((item) => {
            const active = isActive(item.href);
            
            return (
              <motion.a
                key={item.id}
                href={item.href}
                className={`
                  relative flex flex-col items-center justify-center
                  min-w-0 flex-1 py-2 px-1 rounded-2xl
                  transition-all duration-200
                  ${active ? "text-sage-600" : "text-sage-400"}
                  ${item.special ? "mx-2" : ""}
                `}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
              >
                {/* Special styling for create button */}
                {item.special ? (
                  <motion.div
                    className={`
                      p-3 rounded-2xl shadow-lg
                      ${active 
                        ? "bg-sage-600 text-white" 
                        : "bg-gradient-to-r from-sage-500 to-sage-600 text-white"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.div>
                ) : (
                  <>
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-sage-100 rounded-2xl"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Icon container */}
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: active ? 1.1 : 1,
                          color: active ? "#6d7c6d" : "#9ca3af"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {/* Badge */}
                      {item.badge && item.badge > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                        >
                          {item.badge > 99 ? "99+" : item.badge}
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
                
                {/* Label (hidden for special buttons) */}
                {!item.special && (
                  <motion.span
                    className={`
                      relative z-10 text-xs font-medium mt-1 truncate max-w-full
                      ${active ? "text-sage-700" : "text-sage-400"}
                    `}
                    animate={{
                      opacity: active ? 1 : 0.8,
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Hook to manage tab badges
export const useTabBadges = () => {
  const [badges, setBadges] = React.useState<Record<string, number>>({});

  const setBadge = (tabId: string, count: number) => {
    setBadges(prev => ({
      ...prev,
      [tabId]: count,
    }));
  };

  const clearBadge = (tabId: string) => {
    setBadges(prev => {
      const newBadges = { ...prev };
      delete newBadges[tabId];
      return newBadges;
    });
  };

  const incrementBadge = (tabId: string) => {
    setBadges(prev => ({
      ...prev,
      [tabId]: (prev[tabId] || 0) + 1,
    }));
  };

  return {
    badges,
    setBadge,
    clearBadge,
    incrementBadge,
  };
};

export default TabBar;
