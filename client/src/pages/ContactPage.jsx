import React, { useState } from "react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  Briefcase,
  Clock,
} from "@phosphor-icons/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl text-blue-100 text-base">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h2>

                <div className="space-y-5 text-sm text-gray-700">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <EnvelopeSimple size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>info@jobconnect.com</p>
                      <p>support@jobconnect.com</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p>+1 (555) 123-4567</p>
                      <p>Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Office</p>
                      <p>123 Business Avenue</p>
                      <p>Suite 100</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-300 bg-blue-50 p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-800 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#020826] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b1b45] transition"
                >
                  <PaperPlaneTilt size={14} weight="fill" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I register as a candidate?
              </h3>
              <p className="text-sm text-gray-600">
                Visit our Registration page and fill out the Candidate Zone
                form. You'll get instant access to browse jobs and apply.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does employer approval take?
              </h3>
              <p className="text-sm text-gray-600">
                Employer accounts are typically reviewed within 24-48 hours.
                You'll receive an email once approved.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                What services do you offer to job seekers?
              </h3>
              <p className="text-sm text-gray-600">
                We offer resume writing, career counseling, LinkedIn
                optimization, mock interviews, skill assessments, and more.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I get a refund for certification programs?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, we offer a 7-day money back guarantee for all certification
                programs. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-10 bg-[#071128] text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <p className="flex items-center gap-2 font-semibold text-white mb-3">
                <Briefcase size={16} /> JobConnect
              </p>
              <p className="text-sm text-blue-100/70">
                Connecting talent with opportunity through comprehensive
                placement and training services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Services</li>
                <li>Certifications</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">For Users</h4>
              <ul className="space-y-2 text-sm">
                <li>Browse Jobs</li>
                <li>Register</li>
                <li>Candidate Zone</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">For Employers</h4>
              <ul className="space-y-2 text-sm">
                <li>Post Jobs</li>
                <li>HR Services</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-blue-100/70">
            © 2026 JobConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
