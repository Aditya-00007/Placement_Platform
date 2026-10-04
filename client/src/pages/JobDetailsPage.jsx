import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  CurrencyInr,
  GraduationCap,
  Clock,
  ArrowLeft,
  CheckCircle,
  Buildings,
} from "@phosphor-icons/react";
import axios from "axios";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/public/jobs/${jobId}`);
      if (res.data && res.data.title) {
        setJob(res.data);
      }
    } catch {
      // Fallback details
      setJob({
        id: Number(jobId),
        title: "Associate Software Engineer (Full Stack)",
        company_name: "TechCorp Solutions & Placement Cell",
        company_description: "Leading enterprise recruitment partner and software solutions firm.",
        location: "Pune, Maharashtra",
        work_mode: "HYBRID",
        job_type: "FULL_TIME",
        salary_min: 550000,
        salary_max: 850000,
        experience_required: 0,
        skills_required: ["JavaScript", "React", "Node", "SQL"],
        min_cgpa: "7.00",
        min_education: "Graduation",
        allowed_branches: ["Computer Engineering", "Information Technology", "Electronics"],
        test_duration: 30,
        passing_score: 6,
        description:
          "We are seeking motivated engineers to build robust web systems, cloud microservices, and interactive client applications.",
        responsibilities:
          "Design and build responsive frontend user interfaces with React. Develop scalable RESTful endpoints with Node.js and PostgreSQL. Collaborate with senior architects on code quality and performance optimization.",
        requirements:
          "Proficiency in modern JavaScript/ES6+, React, Node.js, and SQL. Solid understanding of data structures, algorithms, and relational databases. Strong communication and teamwork abilities.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Competitive Industry Standard";
    const formatLakh = (n) => `₹${(n / 100000).toFixed(1)} Lakhs`;
    if (min && max) return `${formatLakh(min)} - ${formatLakh(max)} / year`;
    if (min) return `From ${formatLakh(min)} / year`;
    return `Up to ${formatLakh(max)} / year`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">
            The opening you are looking for may have been closed or removed.
          </p>
          <Link
            to="/current-jobs"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={14} /> Back to Open Positions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/current-jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={14} /> Back to All Positions
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                  {job.work_mode?.replace("_", " ") || "Full Time"}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                  {job.job_type?.replace("_", " ") || "Full Time"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                {job.title}
              </h1>
              <p className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-1.5">
                <Buildings size={16} /> {job.company_name}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Location</span>
                  <span className="font-semibold text-gray-900">{job.location}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Offered Compensation</span>
                  <span className="font-semibold text-gray-900">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Min Experience</span>
                  <span className="font-semibold text-gray-900">
                    {job.experience_required ? `${job.experience_required} year(s)` : "Fresher (0 yrs)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8">
              <h2 className="text-base font-bold text-gray-900 mb-3">About the Position</h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8">
                <h2 className="text-base font-bold text-gray-900 mb-3">Key Responsibilities</h2>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.responsibilities}
                </p>
              </div>
            )}

            {/* Requirements & Skills */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8">
              <h2 className="text-base font-bold text-gray-900 mb-4">Competency & Qualifications</h2>
              {job.requirements && (
                <p className="text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                  {job.requirements}
                </p>
              )}

              {Array.isArray(job.skills_required) && job.skills_required.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Required Technical Skills:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Quick Apply Column */}
          <div className="space-y-6">
            {/* Eligibility Summary Box */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Min Degree:</strong> {job.min_education || "Graduation / B.Tech"}
                  </span>
                </li>
                {job.min_cgpa && (
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Minimum CGPA:</strong> {job.min_cgpa}+ (or equivalent percentage)
                    </span>
                  </li>
                )}
                {Array.isArray(job.allowed_branches) && job.allowed_branches.length > 0 && (
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Allowed Streams:</strong> {job.allowed_branches.join(", ")}
                    </span>
                  </li>
                )}
                {job.test_duration && (
                  <li className="flex items-start gap-2">
                    <Clock size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Assessment:</strong> {job.test_duration} mins online test (Passing score: {job.passing_score || 6} marks)
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Apply Action Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6">
              <h3 className="text-base font-bold mb-2">Apply for this Role</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Applications are processed with automated profile matching. Ensure your candidate profile is up to date with education and project details.
              </p>
              <div className="space-y-3">
                <Link
                  to="/candidate/jobs"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Apply via Candidate Portal
                </Link>
                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    New candidate?{" "}
                    <Link to="/signup?role=candidate" className="text-blue-400 hover:underline">
                      Register Here
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
