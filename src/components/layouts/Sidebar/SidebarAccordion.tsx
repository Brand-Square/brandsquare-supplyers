import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type SidebarAccordionProps = {
  collapseSidebar: boolean;
  icon: ReactNode;
  triggerHeading: string;
  links: Array<{ label: string; href: string }>;
};

export const SidebarAccordion = ({
  collapseSidebar,
  icon,
  triggerHeading,
  links,
}: SidebarAccordionProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      {/* TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "cursor-pointer w-full p-2 rounded-md  flex items-center  gap-1 justify-between  transition-colors hover:bg-gray-200 "
        )}
      >
        <div className="flex items-center  gap-2 text-[14px]  rounded-md  transition-colors">
          {icon}
          {collapseSidebar ? null : triggerHeading}
        </div>

        <ChevronDown
          size={20}
          className={cn(
            "transition-all duration-300 ease-in",
            isOpen ? "rotate-180" : "rotate-0",
            collapseSidebar ? "hidden" : "block"
          )}
        />
      </button>

      {/* CONTENT */}
      {!collapseSidebar && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.ul
              key={"product"}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-4 space-y-1 py-1"
            >
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center  gap-2 text-[14px] p-2 rounded-md hover:bg-gray-200 transition-colors",
                      pathname === link.href
                        ? "text-theme-blue bg-gray-200"
                        : ""
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
