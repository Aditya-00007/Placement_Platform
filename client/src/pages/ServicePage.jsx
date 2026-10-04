import React from "react";
import {
  Briefcase,
  GraduationCap,
  UserCircle,
  Users,
  FileText,
  ChartBar,
  Calendar,
  Presentation,
  BookOpen,
  Lightbulb,
  Certificate,
  Target,
  ArrowRight,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const corporateServices = [
    {
      icon: Users,
      title: "End-to-End Campus Hiring",
      description: "Direct access to top student talent from verified universities with automated eligibility filtering.",
    },
    {
      icon: ChartBar,
      title: "Custom Assessment Engines",
      description: "Build custom skill assessment tests per vacancy with difficulty weighting and automatic scoring.",
    },
    {
      icon: FileText,
      title: "Applicant Pipeline Tracking",
      description: "Structured ATS to review resumes, track test performance, shortlist candidates, and extend offers.",
    },
  ];

  const academicServices = [
    {
      icon: GraduationCap,
      title: "Placement Cell Automation",
      description: "Standardize recruitment drives, track branch-wise placement statistics, and manage corporate visits.",
    },
    {
      icon: Presentation,
      title: "Corporate Expert Sessions",
      description: "Facilitate industry masterclasses and technical webinars for career readiness.",
    },
    {
      icon: Target,
      title: "Industry Skill Benchmarking",
      description: "Assess student cohorts with standardized industry test questions to identify curriculum gaps.",
    },
    {
      icon: Certificate,
      title: "Standardized Drive Execution",
      description: "Seamless recruitment process management from initial notice to final onboarding rounds.",
    },
  ];

  const candidateServices = [
    {
      icon: FileText,
      title: "Structured Digital Resume",
      description: "Organize academic history, certifications, projects, and verified skills into an ATS-friendly format.",
    },
    {
      icon: ChartBar,
      title: "Skill Verification Assessments",
      description: "Test your coding and technical knowledge across React, JavaScript, Node.js, and SQL.",
    },
    {
      icon: Briefcase,
      title: "Direct Job Application",
      description: "Apply to verified openings matching your academic credentials and skill match score.",
    },
    {
      icon: Certificate,
      title: "Credential Badges",
      description: "Earn recognizable certification badges to elevate your job applications above competition.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-20 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
            Platform Capabilities
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Our Recruitment & Assessment Services
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored for corporate talent acquisition teams, academic placement cells, and ambitious students.
          </p>
        </div>
      </section>

      {/* Corporate Solutions */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase size={22} weight="bold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Corporate & Recruiter Solutions
              </h2>
              <p className="text-xs text-gray-500">Accelerated hiring and talent pipelines</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporateServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-200/80 bg-white hover:border-blue-200 hover:shadow-xs transition"
                >
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Solutions */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap size={22} weight="bold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Academic Institution Partnerships
              </h2>
              <p className="text-xs text-gray-500">Standardized placement cell workflows</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-200/80 bg-white hover:border-blue-200 hover:shadow-xs transition"
                >
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Candidate Solutions */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCircle size={22} weight="bold" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Candidate Career Acceleration
              </h2>
              <p className="text-xs text-gray-500">Individual tools to showcase your potential</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {candidateServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-200/80 bg-white hover:border-blue-200 hover:shadow-xs transition"
                >
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-xs transition"
            >
              Get Started with Our Platform <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}