import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Buildings,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";

export default function RegistrationPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Sparkle size={14} weight="fill" /> Join PlacementPlatform
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Choose Your Registration Portal
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Select your account type below to get started with verified campus placements or enterprise candidate discovery.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Candidate Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xs p-8 flex flex-col justify-between transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <GraduationCap size={28} weight="duotone" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Candidate / Student Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                For undergraduate, graduate, and alumni job seekers looking for internships and full-time campus and lateral placements.
              </p>

              <div className="space-y-2.5 text-xs text-gray-700 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Build structured academic and technical profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Automated eligibility and branch matching scores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Take timed skill assessments with instant grading</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Real-time status tracking for all applications</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup?role=candidate"
              className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 rounded-lg shadow-xs transition"
            >
              Register as Candidate <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Employer Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 hover:border-slate-400 hover:shadow-xs p-8 flex flex-col justify-between transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
                <Buildings size={28} weight="duotone" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Corporate / Recruiter Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                For corporate talent acquisition teams, HR leaders, and campus recruiters seeking pre-assessed, verified candidates.
              </p>

              <div className="space-y-2.5 text-xs text-gray-700 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Post jobs with customized eligibility criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Define assessment rules (skills & difficulty counts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Applicant tracking pipeline (Shortlist, Hire, Reject)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>Company profile verification and recruiter dashboard</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup?role=employer"
              className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 rounded-lg shadow-xs transition"
            >
              Register as Employer <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Existing user prompt */}
        <div className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign In to your Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
