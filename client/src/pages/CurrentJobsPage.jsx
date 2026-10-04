import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  CurrencyInr,
  GraduationCap,
  Clock,
  MagnifyingGlass,
  ArrowRight,
  Buildings,
} from "@phosphor-icons/react";
import axios from "axios";

export default function CurrentJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("ALL");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/public/jobs");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setJobs(res.data);
      } else {
        // Fallback default jobs
        setJobs([
          {
            id: 1,
            title: "Associate Software Engineer (Full Stack)",
            company_name: "TechCorp Solutions & Placement Cell",
            location: "Pune, Maharashtra",
            work_mode: "HYBRID",
            job_type: "FULL_TIME",
            salary_min: 550000,
            salary_max: 850000,
            skills_required: ["JavaScript", "React", "Node", "SQL"],
            min_cgpa: "7.00",
            min_education: "Graduation",
            allowed_branches: ["Computer Engineering", "Information Technology"],
            test_duration: 30,
            description: "Build scalable web applications and cloud services using modern stacks.",
          },
          {
            id: 2,
            title: "Frontend React Developer",
            company_name: "TechCorp Solutions & Placement Cell",
            location: "Remote - India",
            work_mode: "REMOTE",
            job_type: "FULL_TIME",
            salary_min: 500000,
            salary_max: 750000,
            skills_required: ["React", "JavaScript"],
            min_cgpa: "6.50",
            min_education: "Graduation",
            allowed_branches: ["Computer Engineering", "Information Technology"],
            test_duration: 25,
            description: "Translate modern UI/UX mockups into production-grade interactive React apps.",
          },
          {
            id: 3,
            title: "Backend Developer (Node.js & PostgreSQL)",
            company_name: "TechCorp Solutions & Placement Cell",
            location: "Mumbai, Maharashtra",
            work_mode: "ONSITE",
            job_type: "FULL_TIME",
            salary_min: 650000,
            salary_max: 1000000,
            skills_required: ["Node", "SQL", "JavaScript"],
            min_cgpa: "7.50",
            min_education: "Graduation",
            allowed_branches: ["Computer Engineering", "Information Technology"],
            test_duration: 30,
            description: "Architect high-throughput backend services, PostgreSQL queries, and APIs.",
          },
        ]);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Competitive";
    const formatLakh = (n) => `₹${(n / 100000).toFixed(1)}L`;
    if (min && max) return `${formatLakh(min)} - ${formatLakh(max)}`;
    if (min) return `From ${formatLakh(min)}`;
    return `Up to ${formatLakh(max)}`;
  };

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();
    const matchesSearch =
      job.title?.toLowerCase().includes(query) ||
      job.company_name?.toLowerCase().includes(query) ||
      (Array.isArray(job.skills_required) &&
        job.skills_required.some((s) => s.toLowerCase().includes(query)));
    const matchesMode =
      workMode === "ALL" ||
      job.work_mode?.toUpperCase() === workMode.toUpperCase();
    return matchesSearch && matchesMode;
  });

  return (
    <div className="bg-slate-50/60 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1 font-heading">
            Live Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 font-heading">
            Current Campus & Corporate Openings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Browse verified vacancies with automated eligibility cutoffs, technical skill assessments, and transparent criteria.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-3 justify-between">
          <div className="relative w-full md:w-96">
            <MagnifyingGlass
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by role, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["ALL", "REMOTE", "HYBRID", "ONSITE"].map((mode) => (
              <button
                key={mode}
                onClick={() => setWorkMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition ${
                  workMode === mode
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {mode === "ALL" ? "All Modes" : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-medium">Loading verified openings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200/80 p-8 max-w-md mx-auto">
            <Briefcase size={36} className="text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900 mb-1 font-heading">No Openings Found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search keyword or selected work mode.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setWorkMode("ALL");
              }}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition flex flex-col justify-between p-6"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100/60">
                      {job.work_mode?.replace("_", " ") || "Full Time"}
                    </span>
                    {job.test_duration && (
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {job.test_duration}m test
                      </span>
                    )}
                  </div>

                  {/* Company & Role */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 font-heading">
                      {job.company_name?.slice(0, 2).toUpperCase() || "TC"}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug font-heading">
                        {job.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {job.company_name}
                      </p>
                    </div>
                  </div>

                  {/* Quick details */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CurrencyInr size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900">
                        {formatSalary(job.salary_min, job.salary_max)} / year
                      </span>
                    </div>
                    {job.min_cgpa && (
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-slate-400 shrink-0" />
                        <span>Min CGPA: {job.min_cgpa}+ ({job.min_education || "Degree"})</span>
                      </div>
                    )}
                  </div>

                  {/* Skills tags */}
                  {Array.isArray(job.skills_required) && job.skills_required.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills_required.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills_required.length > 4 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{job.skills_required.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {job.application_deadline ? `Ends: ${new Date(job.application_deadline).toLocaleDateString()}` : "Active"}
                  </span>
                  <Link
                    to={`/current-jobs/${job.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
                  >
                    View Details
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
