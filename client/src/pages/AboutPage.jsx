import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Transforming careers and connecting talent with opportunities
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the most trusted and innovative platform connecting talent with opportunities, 
                empowering individuals to achieve their career goals and helping organizations build exceptional teams.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-400 h-64 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 h-64 rounded-lg order-2 md:order-1"></div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the recruitment and career development ecosystem by providing comprehensive solutions 
                for job seekers, academic institutions, and corporations to connect, grow, and succeed together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who We Are</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovative</h3>
              <p className="text-gray-600">
                We continuously innovate to provide cutting-edge solutions for modern recruitment and career development challenges.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trusted</h3>
              <p className="text-gray-600">
                Trusted by thousands of candidates, educational institutions, and companies for our reliability and excellence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Committed</h3>
              <p className="text-gray-600">
                We are committed to making a positive impact on careers and helping people achieve their professional aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
