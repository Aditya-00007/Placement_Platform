import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, List, X, ShieldCheck } from "@phosphor-icons/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Current Jobs", path: "/current-jobs" },
    { name: "Services", path: "/services" },
    { name: "Certifications", path: "/certification" },
    { name: "Register", path: "/registration" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/75 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-600 transition-colors">
              <Briefcase size={18} weight="bold" />
            </div>
            <div>
              <span className="text-[17px] font-bold text-slate-900 tracking-tight block leading-tight font-heading">
                Placement<span className="text-blue-600">Platform</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                Campus & Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                    active
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              className="text-[13px] font-semibold text-slate-700 hover:text-slate-950 px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-[13px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-lg shadow-xs transition"
            >
              Get Started
            </Link>
            <Link
              to="/admin/login"
              title="Admin Access"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 transition"
            >
              <ShieldCheck size={17} weight="bold" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/signin"
              className="text-xs font-semibold text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md"
            >
              Sign In
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-5 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                isActive(link.path)
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-semibold text-slate-800 border border-slate-200 py-2 rounded-lg"
            >
              Sign In to Dashboard
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-semibold text-white bg-slate-900 py-2 rounded-lg"
            >
              Register Account
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-[11px] text-slate-400 py-1"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
