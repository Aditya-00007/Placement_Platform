import React from 'react';
import { Link } from 'react-router-dom';

export default function CurrentJobsPage() {
  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'Looking for experienced senior engineers to lead our development team.'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Digital Solutions Ltd',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$100k - $140k',
      description: 'Drive product vision and strategy for our growing platform.'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $110k',
      description: 'Analyze complex datasets and derive actionable insights.'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: 'Creative Studios',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Design beautiful and intuitive user experiences.'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'Growth Marketing Co',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$70k - $100k',
      description: 'Build and execute marketing campaigns to drive growth.'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'Cloud Systems Inc',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $150k',
      description: 'Manage infrastructure and deployment pipelines.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Current Job Openings</h1>
          <p className="text-lg max-w-3xl">
            Find your next career opportunity with top companies
          </p>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-blue-600 font-semibold mb-4">{job.company}</p>
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-600"><strong>Location:</strong> {job.location}</p>
                  <p className="text-sm text-gray-600"><strong>Type:</strong> {job.type}</p>
                  <p className="text-sm text-gray-600"><strong>Salary:</strong> {job.salary}</p>
                </div>
                <p className="text-gray-700 text-sm mb-6">{job.description}</p>
                <Link
                  to={`/current-jobs/${job.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
