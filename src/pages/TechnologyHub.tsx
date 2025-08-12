import React, { useState } from 'react';
import { Smartphone, Monitor, CreditCard, ChevronDown, ChevronUp, CheckCircle, Star } from 'lucide-react';

interface AssessmentData {
  currentSystems: string;
  digitalPresence: string;
  paymentMethods: string;
  dataManagement: string;
  automation: string;
}

interface AssessmentResult {
  score: number;
  level: string;
  recommendations: string[];
  color: string;
}

const TechnologyHub: React.FC = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    currentSystems: '',
    digitalPresence: '',
    paymentMethods: '',
    dataManagement: '',
    automation: ''
  });
  
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const technologyCategories = [
    {
      id: 'erp-crm',
      title: 'ERP & CRM Systems',
      icon: Monitor,
      description: 'Streamline your business operations and customer relationships',
      solutions: [
        { name: 'Tally Prime', description: 'Complete business management solution', price: '₹18,000/year' },
        { name: 'Zoho CRM', description: 'Customer relationship management', price: '₹1,200/month' },
        { name: 'SAP Business One', description: 'Enterprise resource planning', price: '₹50,000/year' },
        { name: 'Microsoft Dynamics', description: 'Integrated business applications', price: '₹4,500/month' }
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce & Digital Marketing',
      icon: Smartphone,
      description: 'Expand your reach with online presence and digital marketing',
      solutions: [
        { name: 'Shopify Plus', description: 'Enterprise e-commerce platform', price: '₹15,000/month' },
        { name: 'Google Ads Setup', description: 'Professional advertising campaigns', price: '₹25,000 setup' },
        { name: 'WhatsApp Business API', description: 'Customer communication platform', price: '₹3,000/month' },
        { name: 'Social Media Management', description: 'Complete social media presence', price: '₹12,000/month' }
      ],
      color: 'bg-green-500'
    },
    {
      id: 'payments',
      title: 'Digital Payment Solutions',
      icon: CreditCard,
      description: 'Accept payments seamlessly across all channels',
      solutions: [
        { name: 'Razorpay Payment Gateway', description: 'Complete payment solutions', price: '2% per transaction' },
        { name: 'PayU Business', description: 'Multi-channel payment acceptance', price: '1.8% per transaction' },
        { name: 'Paytm for Business', description: 'QR codes and online payments', price: '1.5% per transaction' },
        { name: 'PhonePe Business', description: 'UPI and digital wallet integration', price: '0.9% per transaction' }
      ],
      color: 'bg-yellow-500'
    }
  ];

  const calculateDigitalScore = () => {
    let score = 0;
    const responses = Object.values(assessmentData);
    
    responses.forEach(response => {
      switch(response) {
        case 'advanced': score += 20;
        break;
        case 'intermediate': score += 12;
        break;
        case 'basic': score += 6;
        break;
        case 'none': score += 0;
        break;
      }
    });

    let level = '';
    let color = '';
    let recommendations = [];

    if (score >= 80) {
      level = 'Digital Leader';
      color = 'text-green-600';
      recommendations = [
        'Implement AI and machine learning solutions',
        'Explore blockchain for supply chain transparency',
        'Consider IoT integration for smart operations'
      ];
    } else if (score >= 60) {
      level = 'Digital Progressive';
      color = 'text-blue-600';
      recommendations = [
        'Integrate advanced analytics and reporting',
        'Implement automated workflow systems',
        'Expand digital marketing capabilities'
      ];
    } else if (score >= 40) {
      level = 'Digital Adopter';
      color = 'text-yellow-600';
      recommendations = [
        'Implement a comprehensive CRM system',
        'Set up e-commerce platform',
        'Digitize payment processing'
      ];
    } else {
      level = 'Digital Beginner';
      color = 'text-red-600';
      recommendations = [
        'Start with basic accounting software',
        'Create digital presence with website',
        'Implement digital payment methods'
      ];
    }

    setAssessmentResult({ score, level, recommendations, color });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Future-Proof Your Business with <span className="text-blue-600">Smart Technology</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your operations with cutting-edge technology solutions designed specifically for MSMEs. 
            Boost efficiency, reduce costs, and scale faster.
          </p>
        </div>

        {/* Digital Readiness Assessment */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <Monitor className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Digital Readiness Assessment</h2>
            <p className="text-gray-600">Discover your current technology adoption level and get personalized recommendations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What business management systems do you currently use?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'advanced', label: 'Integrated ERP/CRM systems' },
                      { value: 'intermediate', label: 'Basic accounting software' },
                      { value: 'basic', label: 'Spreadsheets and manual tracking' },
                      { value: 'none', label: 'Paper-based processes only' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="currentSystems"
                          value={option.value}
                          checked={assessmentData.currentSystems === option.value}
                          onChange={(e) => setAssessmentData({ ...assessmentData, currentSystems: e.target.value })}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How strong is your digital presence?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'advanced', label: 'Professional website with e-commerce and SEO' },
                      { value: 'intermediate', label: 'Basic website and social media presence' },
                      { value: 'basic', label: 'Social media accounts only' },
                      { value: 'none', label: 'No online presence' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="digitalPresence"
                          value={option.value}
                          checked={assessmentData.digitalPresence === option.value}
                          onChange={(e) => setAssessmentData({ ...assessmentData, digitalPresence: e.target.value })}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What payment methods do you accept?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'advanced', label: 'Multiple digital payments (UPI, cards, wallets)' },
                      { value: 'intermediate', label: 'UPI and basic digital payments' },
                      { value: 'basic', label: 'Cash and cheques only' },
                      { value: 'none', label: 'Cash only' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethods"
                          value={option.value}
                          checked={assessmentData.paymentMethods === option.value}
                          onChange={(e) => setAssessmentData({ ...assessmentData, paymentMethods: e.target.value })}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How do you manage customer and business data?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'advanced', label: 'Cloud-based CRM with analytics' },
                      { value: 'intermediate', label: 'Digital databases and basic tracking' },
                      { value: 'basic', label: 'Excel sheets and basic digital files' },
                      { value: 'none', label: 'Paper records only' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="dataManagement"
                          value={option.value}
                          checked={assessmentData.dataManagement === option.value}
                          onChange={(e) => setAssessmentData({ ...assessmentData, dataManagement: e.target.value })}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What level of process automation do you have?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'advanced', label: 'Automated workflows and AI-powered processes' },
                      { value: 'intermediate', label: 'Some automated reporting and notifications' },
                      { value: 'basic', label: 'Basic automated calculations' },
                      { value: 'none', label: 'All manual processes' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="automation"
                          value={option.value}
                          checked={assessmentData.automation === option.value}
                          onChange={(e) => setAssessmentData({ ...assessmentData, automation: e.target.value })}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateDigitalScore}
                  disabled={Object.values(assessmentData).some(value => !value)}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover-glow"
                >
                  Get My Digital Score
                </button>
              </div>
            </div>

            <div>
              {assessmentResult ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200 h-full">
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center mx-auto mb-4">
                        <div className={`w-24 h-24 rounded-full ${assessmentResult.color.replace('text-', 'bg-').replace('-600', '-100')} flex items-center justify-center`}>
                          <span className={`text-3xl font-bold ${assessmentResult.color}`}>
                            {assessmentResult.score}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Digital Score</h3>
                    <p className={`text-lg font-semibold ${assessmentResult.color}`}>
                      {assessmentResult.level}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-4">Recommended Next Steps:</h4>
                    <ul className="space-y-3">
                      {assessmentResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t">
                      <div className="text-center">
                        <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Ready to take the next step? Explore our technology solutions below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-xl flex items-center justify-center h-full">
                  <div className="text-center">
                    <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Complete the assessment to see your digital readiness score</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technology Solutions */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Solutions</h2>
            <p className="text-lg text-gray-600">Explore our curated technology solutions designed for MSMEs</p>
          </div>

          <div className="space-y-6">
            {technologyCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    {expandedCategory === category.id ? 
                      <ChevronUp className="h-6 w-6 text-gray-400" /> : 
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    }
                  </div>
                </button>

                {expandedCategory === category.id && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      {category.solutions.map((solution, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{solution.name}</h4>
                            <span className="text-sm font-medium text-blue-600">{solution.price}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{solution.description}</p>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                            {category.id === 'erp-crm' ? 'Request a Demo' :
                             category.id === 'ecommerce' ? 'Get a Free Consultation' : 
                             'See Integrations'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyHub;