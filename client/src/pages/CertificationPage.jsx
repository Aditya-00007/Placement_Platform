import React from 'react';
import { Certificate, Clock, Users, CheckCircle, Medal, Sparkle, Target } from '@phosphor-icons/react';

export default function CertificationPage() {
  const highlights = [
    { icon: Certificate, label: 'Industry-Recognized' },
    { icon: Users, label: 'Expert Instructors' },
    { icon: Clock, label: 'Flexible Learning' }
  ];

  const benefits = [
    {
      icon: Medal,
      title: 'Recognized Credentials',
      description: 'Certifications valued by top employers'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals'
    },
    {
      icon: CheckCircle,
      title: 'Practical Projects',
      description: 'Hands-on experience with real scenarios'
    },
    {
      icon: Clock,
      title: 'Lifetime Access',
      description: 'Revisit course materials anytime'
    }
  ];

  const certifications = [
    {
      level: 'Beginner to Intermediate',
      title: 'Professional Communication Certification',
      description: 'Master the art of professional communication in workplace settings.',
      duration: '4 weeks',
      enrolled: '1,200 enrolled',
      modules: ['Business Writing', 'Presentation Skills', 'Email Etiquette', 'Interview Communication']
    },
    {
      level: 'Intermediate',
      title: 'Data Analytics Certification',
      description: 'Learn to analyze and interpret complex datasets for business insights.',
      duration: '8 weeks',
      enrolled: '850 enrolled',
      modules: ['Python for Data Analysis', 'SQL Fundamentals', 'Data Visualization', 'Statistics']
    },
    {
      level: 'Beginner',
      title: 'Digital Marketing Certification',
      description: 'Comprehensive digital marketing skills for the modern marketer.',
      duration: '6 weeks',
      enrolled: '2,100 enrolled',
      modules: ['SEO Basics', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting']
    },
    {
      level: 'Advanced',
      title: 'Project Management Professional',
      description: 'Advanced project management techniques aligned with industry standards.',
      duration: '10 weeks',
      enrolled: '650 enrolled',
      modules: ['Agile Methodology', 'Risk Management', 'Resource Planning', 'Stakeholder Management']
    },
    {
      level: 'Intermediate to Advanced',
      title: 'Full Stack Web Development',
      description: 'Complete web development training from frontend to backend.',
      duration: '12 weeks',
      enrolled: '1,500 enrolled',
      modules: ['Frontend Technologies', 'Backend Development', 'Database Management', 'Deployment']
    },
    {
      level: 'Intermediate',
      title: 'HR Management Certification',
      description: 'Essential HR skills for modern human resource professionals.',
      duration: '6 weeks',
      enrolled: '900 enrolled',
      modules: ['Talent Acquisition', 'Performance Management', 'HR Analytics', 'Employee Relations']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-violet-700 via-fuchsia-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 mb-5">
              <Sparkle size={16} /> Certification Programs
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Certification Programs
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl">
              Enhance your skills and boost your career with industry-recognized certifications designed by experts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                  >
                    <Icon size={16} />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Certifications?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700 mb-4">
                    <Icon size={24} weight="bold" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-[14rem] mx-auto">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            Available Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <article
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-700">
                    {cert.level}
                  </span>
                  <span className="text-violet-700">
                    <Certificate size={18} weight="bold" />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{cert.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {cert.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><Users size={14} /> {cert.enrolled}</span>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">Key Modules</p>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    {cert.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
                  Enroll Now
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-purple-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our certification programs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-purple-800 hover:bg-gray-100 transition-colors">
              Browse All Programs
            </button>
            <button className="rounded-md border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Contact Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
