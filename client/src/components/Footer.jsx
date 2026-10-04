import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                <Briefcase size={18} weight="bold" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                PlacementPlatform
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering campus talent and enterprise recruiters through automated eligibility checks, skill assessments, and streamlined hiring workflows.
            </p>
          </div>

          {/* Candidates */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              For Candidates
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/current-jobs" className="hover:text-white transition">
                  Browse Open Positions
                </Link>
              </li>
              <li>
                <Link to="/registration" className="hover:text-white transition">
                  Candidate Registration
                </Link>
              </li>
              <li>
                <Link to="/certification" className="hover:text-white transition">
                  Skill Certifications
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              For Employers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/registration" className="hover:text-white transition">
                  Employer Onboarding
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Campus Recruitment Services
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition">
                  Recruiter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Enterprise Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Helpdesk
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition text-slate-500 hover:text-slate-300">
                  Administrative Portal
                </Link>
              </li>
              <li className="text-slate-500 text-[11px] pt-1">
                Version 1.0 • PostgreSQL Powered
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlacementPlatform. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
