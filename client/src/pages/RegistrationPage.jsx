import React, { useState } from 'react';

export default function RegistrationPage() {
  const [userType, setUserType] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Registration</h1>
          <p className="text-lg">Choose your registration type to get started</p>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!userType ? (
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Employer Zone */}
              <div className="bg-white p-12 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <div className="text-5xl font-bold text-blue-600 mb-4">👔</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Employer Zone</h2>
                <p className="text-gray-600 mb-8">
                  Post job openings, find top talent, and build your team
                </p>
                <button
                  onClick={() => setUserType('employer')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Register as Employer
                </button>
              </div>

              {/* Candidates Zone */}
              <div className="bg-white p-12 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <div className="text-5xl font-bold text-purple-600 mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidates Zone</h2>
                <p className="text-gray-600 mb-8">
                  Find your dream job and advance your career
                </p>
                <button
                  onClick={() => setUserType('candidate')}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Register as Candidate
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setUserType(null)}
                className="mb-8 text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Registration Type
              </button>

              <div className="bg-white p-12 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {userType === 'employer' ? 'Employer Registration' : 'Candidate Registration'}
                </h2>

                <form className="space-y-6">
                  {userType === 'employer' ? (
                    <>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Industry</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Company Size</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                          <option>Select company size</option>
                          <option>Startup (1-50)</option>
                          <option>Small (51-500)</option>
                          <option>Medium (501-5000)</option>
                          <option>Large (5000+)</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Current Role</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                          <option>Select experience level</option>
                          <option>Fresher (0-1 years)</option>
                          <option>Junior (1-3 years)</option>
                          <option>Mid-level (3-7 years)</option>
                          <option>Senior (7+ years)</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
