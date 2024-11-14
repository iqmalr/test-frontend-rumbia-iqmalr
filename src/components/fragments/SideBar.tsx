"use client";
import {
  IconBrandMedium,
  IconBrandTabler,
  IconHome,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import ThemeToggle from "./theme-toggle";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

interface LinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function SideBar({ children }: { children: React.ReactNode }) {
  const links: LinkItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconHome className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Products",
      href: "/products",
      icon: (
        <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Product List",
      href: "/product-list",
      icon: (
        <IconBrandMedium className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Log Out",
      href: "/",
      icon: (
        <IconLogout className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // ,
    // {
    //   label: "Profile",
    //   href: "/profile",
    //   icon: (
    //     <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: "Settings",
    //   href: "/settings",
    //   icon: (
    //     <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden dark:bg-neutral-900">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex h-full flex-col justify-between border-r-2 border-neutral-200">
          <div className="flex flex-1 flex-col overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-neutral-200 px-4 py-2 dark:border-neutral-700">
            <Image
              src="https://res.cloudinary.com/dr79rpzsv/image/upload/v1731221028/laptop/Lenovo_ThinkPad_X1_Carbon_lvwa0n.jpg"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              alt="Avatar"
            />
            {open && (
              <div className="text-sm text-neutral-700 dark:text-neutral-300">
                Dana Davis
              </div>
            )}
          </div>
          {open && (
            <div className="mt-4 px-4 text-sm text-neutral-500 dark:text-neutral-400">
              Hosted on Vercel
              <br />
              Made with Aceternity UI
            </div>
          )}
          {/* <ThemeToggle /> */}
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-auto py-2 sm:py-4 md:py-8">
        <div className="w-full px-2 sm:px-4 md:px-8">{children}</div>
      </main>
    </div>
  );
}

export const Logo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="whitespace-pre font-medium text-black dark:text-white"
    >
      My Sidebar App Demo
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
  </Link>
);
