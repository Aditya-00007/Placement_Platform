import React, { useState } from "react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  PaperPlaneTilt,
  Clock,
  Question,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been received.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitting(false);
    }, 400);
  };

  const faqs = [
    {
      q: "How does candidate registration and matching work?",
      a: "Students create a profile with academic scores, branch, and technical skills. When applying to jobs, our platform automatically verifies minimum CGPA cutoffs and calculates skill match percentages.",
    },
    {
      q: "How do employers configure online assessments?",
      a: "Recruiters specify question distribution rules by skill (JavaScript, React, Node.js, SQL) and difficulty level. The system automatically randomizes and delivers the test to applicants.",
    },
    {
      q: "Are companies verified before posting positions?",
      a: "Yes. Every employer profile undergoes platform administrative verification before vacancies are made publicly accessible to candidates.",
    },
    {
      q: "Is there support for colleges and placement cells?",
      a: "Yes. We partner with universities to streamline campus recruitment drives, batch analytics, and student tracking.",
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Get in Touch
          </h1>
          <p className="text-sm text-gray-600">
            Have questions regarding campus recruitment drives, corporate partnerships, or platform features? Our team is here to assist.
          </p>
        </div>

        {/* Form and Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          {/* Info Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
                Contact Information
              </h2>

              <div className="space-y-4 text-xs text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <EnvelopeSimple size={16} weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Email Support</span>
                    <span>support@placementplatform.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone size={16} weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Phone Desk</span>
                    <span>+91 (020) 2567-8900</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin size={16} weight="bold" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Headquarters</span>
                    <span>Cyber City Tech Park, Tower B, Pune, Maharashtra 411057</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock size={15} /> Operating Hours
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-gray-900">10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Send us a Message
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and a representative will get back to you within 24 business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Campus Drive Partnership"
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="How can our placement team help you?"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-xs transition disabled:opacity-50"
              >
                <PaperPlaneTilt size={14} weight="bold" />
                {submitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-10 border-t border-gray-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500">
              Quick answers to common questions about accounts, assessments, and recruitment drives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs"
              >
                <h3 className="text-xs font-bold text-gray-900 mb-1.5 flex items-start gap-2">
                  <Question size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
