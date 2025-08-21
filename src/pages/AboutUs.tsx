import React from 'react';
import { Target, Eye, Users, Award, TrendingUp, Building2 } from 'lucide-react';

const AboutUs: React.FC = () => {
  const stats = [
    { number: '50,000+', label: 'MSMEs Empowered' },
    { number: '₹2,500Cr+', label: 'Credit Facilitated' },
    { number: '15,000+', label: 'Successful Connections' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide, ensuring MSMEs receive world-class support.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and collaborative growth within the MSME ecosystem.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously innovate our platform and services to stay ahead of industry needs.'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'We maintain the highest standards of integrity and transparency in all our operations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop)' 
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Saksham</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
              Transforming the MSME landscape through innovative technology, strategic partnerships, and unwavering commitment to growth.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-center lg:text-left">
              <Target className="h-16 w-16 text-blue-600 mx-auto lg:mx-0 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower Delhi's Micro, Small, and Medium Enterprises by providing seamless access to finance, 
                expanding market opportunities, and facilitating technology adoption. We are committed to being 
                the bridge that connects MSMEs to sustainable growth and success in the digital economy.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <Eye className="h-16 w-16 text-green-600 mx-auto lg:mx-0 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a thriving ecosystem where every MSME in Delhi has equal access to growth opportunities, 
                financial resources, and cutting-edge technology. We envision a future where MSMEs are not just 
                participants but leaders in India's economic transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">Making a difference in the lives of thousands of entrepreneurs</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delhi Industrial Landscape Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Powering Delhi's Industrial Growth</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Delhi is home to over 4 lakh MSMEs, contributing significantly to the state's economy and employment. 
                From traditional manufacturing in areas like Mayapuri to modern tech startups in Connaught Place, 
                our platform serves the diverse needs of Delhi's entrepreneurial ecosystem.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With strategic location advantages, skilled workforce, and government support, Delhi's MSMEs are 
                positioned to lead India's economic transformation. We're here to ensure every enterprise can 
                realize its full potential.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4L+</div>
                  <div className="text-sm text-gray-600">MSMEs in Delhi</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">25L+</div>
                  <div className="text-sm text-gray-600">People Employed</div>
                </div>
              </div>
            </div>

            <div>
              <img 
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Delhi Industrial Landscape"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Government Partnership Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Government Partnership</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Delhi MSME Ascend is a flagship initiative of the Government of National Capital Territory of Delhi, 
              designed to accelerate MSME growth through digital transformation and strategic interventions.
            </p>
            
            <div className="bg-gray-800 p-8 rounded-xl max-w-4xl mx-auto">
              <blockquote className="text-lg italic mb-6">
                "Our government is committed to making Delhi the most business-friendly state in India. 
                The MSME Ascend platform represents our vision of empowering every entrepreneur with 
                the tools and resources they need to succeed in the modern economy."
              </blockquote>
              <div className="text-center">
                <div className="font-semibold text-lg">Government of NCT of Delhi</div>
                <div className="text-gray-400">Department of Industries</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;