import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ChartBar,
  UsersThree,
  CheckCircle,
} from "@phosphor-icons/react";
import axios from "axios";

export default function AboutPage() {
  const [stats, setStats] = useState({ open_jobs: 3, candidates: 1, employers: 1 });

  useEffect(() => {
    axios
      .get("/api/public/stats")
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch(() => {});
  }, []);

  const pillars = [
    {
      icon: Cpu,
      title: "Automated Eligibility Matching",
      description:
        "Instant validation of graduation level, branch specializations, and minimum CGPA benchmarks to compute exact candidate match scores.",
    },
    {
      icon: ShieldCheck,
      title: "Built-in Online Assessments",
      description:
        "Timed technical examinations with randomized questions, difficulty-weighted rules, and automatic evaluation upon submission.",
    },
    {
      icon: GraduationCap,
      title: "Structured Talent Profiles",
      description:
        "Comprehensive candidate profiles showcasing verified degrees, multi-tier scores, projects, work experience, and skill proficiencies.",
    },
    {
      icon: Briefcase,
      title: "Recruiter Control Pipeline",
      description:
        "Create custom hiring criteria, evaluate applicant pools with status filters (Shortlisted, Hired, Rejected), and review test scores.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Profile & Academic Verification",
      description:
        "Students register and construct an end-to-end profile detailing degree credentials, CGPA grading, GitHub repositories, and core competencies.",
    },
    {
      step: "02",
      title: "Precision Job Discovery",
      description:
        "The platform automatically evaluates eligibility across available positions, presenting matching roles with custom match score indicators.",
    },
    {
      step: "03",
      title: "Automated Assessments & Hiring",
      description:
        "Candidates complete timed assessments directly in-app. Employers review ranked applicant lists and progress candidates to offer stage.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 sm:py-32 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Enterprise Recruitment & Assessment Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-heading">
              Connecting Campus Talent With Global Enterprises
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl">
              An integrated placement ecosystem combining multi-tier academic eligibility checks, adaptive skill evaluations, and structured applicant tracking.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/current-jobs"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-sm transition"
              >
                Browse Open Roles <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                to="/registration"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="border-b border-slate-100 bg-slate-50/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 block mb-0.5 font-heading">
                {stats.open_jobs}+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Active Job Openings
              </span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block mb-0.5 font-heading">
                100%
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Verified Eligibility Checks
              </span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block mb-0.5 font-heading">
                {stats.candidates}+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Registered Students
              </span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 block mb-0.5 font-heading">
                {stats.employers}+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Hiring Organizations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2 font-heading">
              Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Built Specifically for Streamlined Campus Recruitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-200/80 bg-white hover:border-blue-200 hover:shadow-xs transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <Icon size={22} weight="bold" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2 font-heading">
              Operational Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              A Standardized Three-Stage Placement Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-xs relative"
              >
                <span className="text-3xl font-black text-slate-200 font-mono block mb-3">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Card */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)] pointer-events-none" />
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 font-heading">
              Ready to Accelerate Your Placement Operations?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              Whether you are an ambitious student preparing for campus drives or an enterprise recruiter seeking pre-assessed talent, start in minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/signup?role=candidate"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-xs transition"
              >
                Candidate Onboarding
              </Link>
              <Link
                to="/signup?role=employer"
                className="bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs px-5 py-2.5 rounded-lg shadow-xs transition"
              >
                Employer Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
