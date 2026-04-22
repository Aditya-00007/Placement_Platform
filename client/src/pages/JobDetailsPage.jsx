import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    experience: '5+ years',
    description: 'Looking for experienced senior engineers to lead our development team.',
    responsibilities: [
      'Design and build scalable backend and frontend systems.',
      'Mentor junior engineers and perform code reviews.',
      'Work cross-functionally with product and design teams.'
    ],
    requirements: ['Strong JavaScript/React skills', 'Experience with Node.js and APIs', 'Problem-solving and leadership mindset']
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Digital Solutions Ltd',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $140k',
    experience: '4+ years',
    description: 'Drive product vision and strategy for our growing platform.',
    responsibilities: [
      'Define roadmap and prioritize features.',
      'Coordinate across engineering, marketing, and sales.',
      'Track performance and improve product outcomes.'
    ],
    requirements: ['Strong communication skills', 'Experience with agile workflows', 'Data-driven decision making']
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80k - $110k',
    experience: '2+ years',
    description: 'Analyze complex datasets and derive actionable insights.',
    responsibilities: [
      'Build dashboards and data reports.',
      'Run trend analysis and identify business opportunities.',
      'Partner with stakeholders to define KPIs.'
    ],
    requirements: ['SQL and Excel proficiency', 'Experience with BI tools', 'Basic statistics knowledge']
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$90k - $130k',
    experience: '3+ years',
    description: 'Design beautiful and intuitive user experiences.',
    responsibilities: [
      'Create wireframes and interactive prototypes.',
      'Conduct usability testing and iterate quickly.',
      'Collaborate with developers on implementation details.'
    ],
    requirements: ['Figma/Adobe XD proficiency', 'Strong visual design portfolio', 'User research understanding']
  },
  {
    id: 5,
    title: 'Marketing Specialist',
    company: 'Growth Marketing Co',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$70k - $100k',
    experience: '2+ years',
    description: 'Build and execute marketing campaigns to drive growth.',
    responsibilities: [
      'Plan and launch multi-channel campaigns.',
      'Track conversion metrics and optimize funnels.',
      'Coordinate with content and design teams.'
    ],
    requirements: ['Digital marketing fundamentals', 'Campaign analytics experience', 'Creative communication skills']
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Cloud Systems Inc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k - $150k',
    experience: '4+ years',
    description: 'Manage infrastructure and deployment pipelines.',
    responsibilities: [
      'Automate CI/CD and deployment workflows.',
      'Monitor system performance and reliability.',
      'Improve security posture and incident response.'
    ],
    requirements: ['Cloud platform expertise', 'Docker/Kubernetes experience', 'Scripting and automation skills']
  }
];

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [resumeFile, setResumeFile] = useState(null);
  const [application, setApplication] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    coverLetter: ''
  });

  const job = jobs.find((item) => item.id === Number(jobId));

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setApplication((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!resumeFile) {
      alert('Please upload your resume before submitting.');
      return;
    }

    alert('Application submitted successfully. We will contact you soon.');
    setApplication({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
      coverLetter: ''
    });
    setResumeFile(null);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for does not exist or has been removed.</p>
          <Link to="/current-jobs" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/current-jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Current Jobs
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-blue-600 font-semibold mb-5">{job.company}</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-8">
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Employment Type:</strong> {job.type}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Apply for this job</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={application.fullName}
                  onChange={onFieldChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={application.email}
                  onChange={onFieldChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={application.phone}
                  onChange={onFieldChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={application.experience}
                  onChange={onFieldChange}
                  placeholder="e.g. 3 years"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={application.skills}
                  onChange={onFieldChange}
                  placeholder="e.g. React, Node.js, SQL"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={application.coverLetter}
                  onChange={onFieldChange}
                  rows="4"
                  placeholder="Tell us why you're a good fit for this role..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {resumeFile ? `Selected: ${resumeFile.name}` : 'No file selected'}
                </p>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
