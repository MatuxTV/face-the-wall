"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface MobileNavProps {
  headerLinks: { href: string; label: string }[];
  languageOptions: { code: string; flag: string }[];
  locale: string;
}

export default function MobileNav({
  headerLinks,
  languageOptions,
  locale,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4">
          <nav className="flex flex-col space-y-4">
            {headerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <DropdownMenuSeparator className="mt-3" />
          <div className="mt-4 flex items-center space-x-4">
            {languageOptions.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}`}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-4 transition transform hover:scale-110 ${
                  locale === lang.code
                    ? "bg-blue-600 border-blue-800 text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={lang.flag}
                  alt={lang.code}
                  width={28}
                  height={20}
                  className="object-cover rounded-full"
                />
                {locale === lang.code && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-blue-800"></div>
                )}
              </Link>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
