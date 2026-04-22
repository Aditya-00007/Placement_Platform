import React from 'react';
import { Briefcase, GraduationCap, UserCircle, Users, FileText, ChartBar, Calendar, Presentation, BookOpen, Lightbulb, Certificate, Target } from '@phosphor-icons/react';

export default function ServicesPage() {
  const corporateServices = [
    { icon: Users, title: 'Recruitment Services', description: 'End-to-end talent acquisition and recruitment solutions for businesses of all sizes' },
    { icon: FileText, title: 'HR Functions', description: 'Comprehensive HR management including employee relations, compliance, and policy development' },
    { icon: ChartBar, title: 'Payroll Management', description: 'Accurate and compliant payroll processing with seamless integration' }
  ];

  const academicServices = [
    { icon: GraduationCap, title: 'Campus Hiring', description: 'Connect with top talent from leading universities and educational institutions' },
    { icon: Briefcase, title: 'Internships', description: 'Structured internship programs to identify and nurture future talent' },
    { icon: Presentation, title: 'Corporate Training', description: 'Behavioral, technical, and aptitude training programs for employee development' },
    { icon: Lightbulb, title: 'Career Counselling', description: 'Professional guidance for students and professionals on career paths' },
    { icon: BookOpen, title: 'Corporate Expert Talk', description: 'Industry expert sessions to share insights and best practices' },
    { icon: Calendar, title: 'HR Events', description: 'Organizing and managing HR-related events and workshops' },
    { icon: Target, title: 'Industry Visits', description: 'Facilitate learning through real-world industry exposure' },
    { icon: Certificate, title: 'Standardizing Placement Process', description: 'Streamlined and efficient placement processes for institutions' }
  ];

  const jobSeekerServices = [
    { icon: FileText, title: 'Resume Writing', description: 'Professional resume crafting services to highlight your strengths' },
    { icon: Lightbulb, title: 'Career Counselling', description: 'Personalized guidance to help you navigate your career path' },
    { icon: Users, title: 'LinkedIn Profile Optimization', description: 'Enhance your professional presence on LinkedIn' },
    { icon: Presentation, title: 'Mock Interviews', description: 'Practice interviews with real-time feedback from experts' },
    { icon: ChartBar, title: 'Skill Assessments', description: 'Identify your strengths and areas for improvement' },
    { icon: Briefcase, title: 'Priority Job Listing', description: 'Get early access to exclusive job opportunities' },
    { icon: GraduationCap, title: 'Internships', description: 'Find and secure valuable internship opportunities' },
    { icon: Certificate, title: 'Certification Programs', description: 'Professional certifications to boost your credentials' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-slate-50">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/16c311a4-9b06-4b71-9892-e02e4cac7213/images/7d9abd35bb3767dca546bac9bb8bea2f3e8fa627e60493a337c11d2b6afa3920.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6" data-testid="services-hero-heading">
            Our Services
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored for businesses, academic institutions, and job seekers
          </p>
        </div>
      </section>

      {/* Corporate Support */}
      <section id="corporate" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase size={32} className="text-blue-600" weight="bold" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900" data-testid="corporate-services-heading">
                Corporate Support (B2B)
              </h2>
              <p className="text-slate-600">Professional HR and recruitment services for businesses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporateServices.map((service, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-8 rounded-lg card-hover" data-testid={`corporate-service-${idx}`}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-blue-600" weight="bold" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Support */}
      <section id="academic" className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <GraduationCap size={32} className="text-blue-600" weight="bold" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900" data-testid="academic-services-heading">
                Academic Support (B2B)
              </h2>
              <p className="text-slate-600">Comprehensive solutions for educational institutions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {academicServices.map((service, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-lg card-hover" data-testid={`academic-service-${idx}`}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-blue-600" weight="bold" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Seeker Support */}
      <section id="jobseeker" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCircle size={32} className="text-blue-600" weight="bold" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900" data-testid="jobseeker-services-heading">
                Job Seeker Support (B2C)
              </h2>
              <p className="text-slate-600">Personalized career development services for individuals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {jobSeekerServices.map((service, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-lg card-hover" data-testid={`jobseeker-service-${idx}`}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon size={24} className="text-blue-600" weight="bold" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}