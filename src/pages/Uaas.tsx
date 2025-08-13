import React from 'react';

const UaaS: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6">
          Register Your MSME on Udyam
        </h1>
        <p className="text-lg text-blue-800 mb-10 leading-relaxed">
          Udyam Registration is the official MSME registration portal by the Government of India. 
          Register your micro, small or medium enterprise to unlock government schemes, benefits, and more.
        </p>

        <a
          href="https://www.udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Go to Udyam Registration Portal
        </a>
      </div>
    </div>
  );
};

export default UaaS;
