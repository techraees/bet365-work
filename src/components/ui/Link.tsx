"use client"
import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?:string;
  activeClassName?: string;
  active?:boolean
}

const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  activeClassName,
  active,
  className,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = active || pathname?.startsWith(props.href as string);



  return (
    <Link {...props} prefetch={false}>
      <span className={cn("text-[#9c9c9c] hover:text-white",className, isActive && activeClassName)}>
        {children}
      </span>
    </Link>
  );
};

export default CustomLink;
