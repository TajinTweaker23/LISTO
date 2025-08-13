import React from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-400 dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-inner flex flex-col items-center gap-8 transition-all duration-300">
      {/* Decorative Divider */}
      <div className="w-11/12 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50 rounded-full"></div>

      {/* Logo and Tagline */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-widest">
          LISTO
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 italic">
          Productivity elevated, style embraced.
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6">
        {[
          {
            href: "https://github.com/tajintweaker23",
            icon: <FaGithub />,
            label: "GitHub",
          },
          {
            href: "https://twitter.com",
            icon: <FaTwitter />,
            label: "Twitter",
          },
          {
            href: "https://instagram.com",
            icon: <FaInstagram />,
            label: "Instagram",
          },
          {
            href: "https://linkedin.com",
            icon: <FaLinkedin />,
            label: "LinkedIn",
          },
        ].map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-transform transform hover:scale-125"
            aria-label={social.label}
          >
            {React.cloneElement(social.icon, { size: 30 })}
          </a>
        ))}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-6 text-base font-medium text-gray-800 dark:text-gray-300">
        {[
          { href: "/about", text: "About" },
          { href: "/privacy", text: "Privacy Policy" },
          { href: "/terms", text: "Terms of Service" },
          { href: "/contact", text: "Contact Us" },
        ].map((link, index) => (
          <Link href={link.href} key={index}>
            <a className="hover:text-purple-700 dark:hover:text-purple-400 transition-all">
              {link.text}
            </a>
          </Link>
        ))}
      </nav>

      {/* Newsletter Section */}
      <div className="w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Subscribe to our Newsletter
        </h2>
        <form className="mt-4 flex items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Copyright and Credits */}
      <div className="text-center text-gray-500 text-sm dark:text-gray-400 space-y-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            LISTO
          </span>
          . All rights reserved.
        </p>
        <p>
          Made with <span className="text-pink-500 animate-heartbeat">♥</span>{" "}
          by{" "}
          <a
            href="https://github.com/tajintweaker23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-300 underline hover:opacity-80"
          >
            TajinTweaker23
          </a>
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="w-11/12 h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 opacity-50 rounded-full"></div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1);}
          20% { transform: scale(1.2);}
          40% { transform: scale(0.95);}
          60% { transform: scale(1.1);}
          80% { transform: scale(0.98);}
        }
        .animate-heartbeat {
          animation: heartbeat 1.2s infinite;
          display: inline-block;
        }
      `}</style>
    </footer>
  );
}
