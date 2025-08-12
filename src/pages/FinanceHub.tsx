import React, { useState } from 'react';
import { Calculator, FileText, Users, CreditCard, Building, ArrowRight, DollarSign } from 'lucide-react';

interface FormData {
  turnover: string;
  yearsInBusiness: string;
  industry: string;
  employees: string;
}

interface Result {
  eligibleAmount: number;
  loanTypes: string[];
  message: string;
}

const FinanceHub: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    turnover: '',
    yearsInBusiness: '',
    industry: '',
    employees: ''
  });
  
  const [result, setResult] = useState<Result | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const financingOptions = [
    {
      title: 'Invoice Discounting',
      description: 'Convert your unpaid invoices into immediate working capital',
      icon: FileText,
      details: 'Get up to 90% of your invoice value within 24 hours. Perfect for businesses with B2B sales.',
      color: 'bg-blue-500'
    },
    {
      title: 'Peer-to-Peer Lending',
      description: 'Connect directly with individual and institutional lenders',
      icon: Users,
      details: 'Competitive interest rates and flexible terms tailored to your business needs.',
      color: 'bg-green-500'
    },
    {
      title: 'Government Loan Schemes',
      description: 'Access subsidized loans under various government initiatives',
      icon: Building,
      details: 'MUDRA, MSME loans, and other government-backed financing options.',
      color: 'bg-purple-500'
    },
    {
      title: 'Working Capital Loans',
      description: 'Maintain smooth cash flow for daily operations',
      icon: CreditCard,
      details: 'Short-term financing to manage inventory, payroll, and operational expenses.',
      color: 'bg-yellow-500'
    }
  ];

  const calculateEligibility = () => {
    const turnover = parseFloat(formData.turnover);
    const years = parseInt(formData.yearsInBusiness);
    
    let baseAmount = Math.min(turnover * 0.25, 5000000); // Max 50 lakhs
    
    if (years >= 5) baseAmount *= 1.5;
    else if (years >= 2) baseAmount *= 1.2;
    
    const loanTypes = [];
    if (turnover >= 1000000) loanTypes.push('Working Capital Loan');
    if (years >= 2) loanTypes.push('Term Loan');
    if (formData.industry !== 'service') loanTypes.push('Equipment Financing');
    loanTypes.push('Government Schemes');
    
    setResult({
      eligibleAmount: Math.round(baseAmount),
      loanTypes,
      message: baseAmount > 0 ? 'Great! You qualify for multiple financing options.' : 'Please review your information and try again.'
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! A financial advisor will contact you within 24 hours.');
    setShowContactForm(false);
    setContactData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fueling Your Ambition: <span className="text-blue-600">Finance at Your Fingertips</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access tailored financing solutions designed specifically for Delhi's MSMEs. 
            From working capital to growth funding, we've got you covered.
          </p>
        </div>

        {/* Finance Eligibility Calculator */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Finance Eligibility Calculator</h2>
            <p className="text-gray-600">Find out how much funding you could qualify for in under 2 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Turnover (₹)</label>
                  <input
                    type="number"
                    value={formData.turnover}
                    onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                  <select
                    value={formData.yearsInBusiness}
                    onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select years</option>
                    <option value="1">Less than 1 year</option>
                    <option value="2">1-2 years</option>
                    <option value="3">2-5 years</option>
                    <option value="5">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="textiles">Textiles</option>
                    <option value="auto">Auto Components</option>
                    <option value="electronics">Electronics</option>
                    <option value="food">Food Processing</option>
                    <option value="service">Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                  <select
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>

                <button
                  onClick={calculateEligibility}
                  disabled={!formData.turnover || !formData.yearsInBusiness || !formData.industry}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover-glow flex items-center justify-center space-x-2"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Calculate Eligibility</span>
                </button>
              </div>
            </div>

            <div>
              {result ? (
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border-2 border-blue-200">
                  <div className="text-center mb-6">
                    <DollarSign className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                    <p className="text-gray-600">{result.message}</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">You may be eligible for up to</p>
                      <p className="text-3xl font-bold text-green-600">
                        ₹{result.eligibleAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 mb-2">Recommended loan types:</p>
                      <ul className="space-y-1">
                        {result.loanTypes.map((type, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-all hover-glow"
                    >
                      Connect with Advisor
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-xl flex items-center justify-center h-full">
                  <div className="text-center">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Fill in the details to see your eligibility</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financing Options</h2>
            <p className="text-lg text-gray-600">Explore our comprehensive range of funding solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => (
              <div key={index} className="card-flip h-80">
                <div className="card-flip-inner h-full relative">
                  {/* Front of card */}
                  <div className="card-flip-front absolute inset-0 bg-white rounded-xl shadow-lg border p-8 flex flex-col items-center justify-center text-center">
                    <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>

                  {/* Back of card */}
                  <div className="card-flip-back absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 flex flex-col justify-center text-white">
                    <h3 className="text-xl font-bold mb-4">{option.title}</h3>
                    <p className="text-blue-100 mb-6">{option.details}</p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect with a Financial Advisor</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="How can we help you?"
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                ></textarea>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors hover-glow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceHub;