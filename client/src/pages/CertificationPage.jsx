import React from "react";
import {
  Certificate,
  Clock,
  Users,
  CheckCircle,
  Medal,
  Sparkle,
  ArrowRight,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function CertificationPage() {
  const certifications = [
    {
      level: "Intermediate",
      title: "Full Stack Web Engineering (React & Node.js)",
      description: "Comprehensive curriculum covering modern React architecture, REST APIs, PostgreSQL integration, and cloud deployments.",
      duration: "10 weeks",
      enrolled: "1,500+ candidates",
      modules: [
        "Modern React 19 & Component Architecture",
        "Express & Node.js Backend Microservices",
        "PostgreSQL Schema Design & Query Optimization",
        "Production Deployment & CI/CD Pipelines",
      ],
    },
    {
      level: "Intermediate to Advanced",
      title: "Relational Database Design & PostgreSQL Mastery",
      description: "Deep dive into ACID transactions, indexing strategies, complex joins, views, and database connection pooling.",
      duration: "6 weeks",
      enrolled: "950+ candidates",
      modules: [
        "Advanced SQL Queries & Indexing",
        "Relational Schema Normalization",
        "Transactions, Locks & Performance Tuning",
        "Database Administration & Production Readiness",
      ],
    },
    {
      level: "Beginner to Intermediate",
      title: "JavaScript ES6+ & Modern Web Fundamentals",
      description: "Core programming language concepts, asynchronous promises, event loop mechanics, and modern ECMAScript standards.",
      duration: "4 weeks",
      enrolled: "2,200+ candidates",
      modules: [
        "Closures, Scope & Prototypes",
        "Async / Await & Fetch APIs",
        "DOM Manipulation & Event Handling",
        "Unit Testing & Code Quality",
      ],
    },
    {
      level: "Intermediate",
      title: "Data Analytics & Applied SQL for Business",
      description: "Practical data analysis techniques, data visualization, business metrics modeling, and automated report generation.",
      duration: "8 weeks",
      enrolled: "850+ candidates",
      modules: [
        "SQL Aggregations & Window Functions",
        "Data Cleaning & Transformation",
        "Dashboard Visualization",
        "Business KPI Reporting",
      ],
    },
    {
      level: "Advanced",
      title: "Campus Placement Interview Readiness",
      description: "Technical interview preparation, data structures and algorithms, mock interviews, and resume structuring.",
      duration: "6 weeks",
      enrolled: "3,100+ candidates",
      modules: [
        "Data Structures & Algorithmic Problem Solving",
        "System Architecture Basics",
        "Technical & HR Mock Interviews",
        "ATS-Optimized Resume Crafting",
      ],
    },
    {
      level: "Beginner",
      title: "Professional Workplace Communication",
      description: "Executive presentation skills, business email writing, stakeholder management, and corporate etiquette.",
      duration: "4 weeks",
      enrolled: "1,200+ candidates",
      modules: [
        "Business Writing & Email Etiquette",
        "Technical Presentations",
        "Team Collaboration Dynamics",
        "Professional Interview Speech",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-20 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold mb-4">
            <Sparkle size={14} weight="fill" /> Verified Technical Certifications
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Industry-Recognized Skill Certifications
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Upgrade your resume with practical, project-driven certifications designed in alignment with enterprise hiring requirements.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-slate-50/60 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Medal size={24} className="text-blue-600 mx-auto mb-2" weight="duotone" />
              <h3 className="text-xs font-bold text-gray-900 mb-0.5">Recruiter Recognized</h3>
              <p className="text-[11px] text-gray-500">Valued across partner companies</p>
            </div>
            <div>
              <Users size={24} className="text-blue-600 mx-auto mb-2" weight="duotone" />
              <h3 className="text-xs font-bold text-gray-900 mb-0.5">Expert-Curated</h3>
              <p className="text-[11px] text-gray-500">Built by senior practitioners</p>
            </div>
            <div>
              <CheckCircle size={24} className="text-blue-600 mx-auto mb-2" weight="duotone" />
              <h3 className="text-xs font-bold text-gray-900 mb-0.5">Hands-on Projects</h3>
              <p className="text-[11px] text-gray-500">Real codebase assessments</p>
            </div>
            <div>
              <Clock size={24} className="text-blue-600 mx-auto mb-2" weight="duotone" />
              <h3 className="text-xs font-bold text-gray-900 mb-0.5">Flexible Timeline</h3>
              <p className="text-[11px] text-gray-500">Self-paced learning modules</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Curriculum Catalog
            </h2>
            <h3 className="text-2xl font-bold text-gray-900">
              Available Skill Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200/90 hover:border-blue-200 hover:shadow-xs p-6 flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                      {cert.level}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock size={13} /> {cert.duration}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 leading-snug mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="mb-6 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-2">
                      Core Modules
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {cert.modules.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/signup?role=candidate"
                  className="inline-flex items-center justify-center gap-1.5 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                >
                  Enroll via Candidate Portal <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
