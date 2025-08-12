import React, { useState } from 'react';
import { Search, Filter, Building2, MapPin, Globe, Star, ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketLinkage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    buyerType: ''
  });
  
  const navigate = useNavigate();

  const featuredBuyers = [
    {
      name: "Maruti Suzuki India Ltd.",
      industry: "Automotive",
      location: "Gurgaon, Haryana",
      type: "OEM",
      procurement: "Auto components, seat covers, electrical parts",
      rating: 4.8,
      image: "https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      name: "Welspun India Ltd.",
      industry: "Textiles",
      location: "Mumbai, Maharashtra", 
      type: "Exporter",
      procurement: "Home textiles, bed linens, terry towels",
      rating: 4.6,
      image: "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      name: "Bajaj Electricals Ltd.",
      industry: "Electronics",
      location: "Pune, Maharashtra",
      type: "Tier-1",
      procurement: "Electronic components, consumer appliances",
      rating: 4.7,
      image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      name: "ITC Limited",
      industry: "FMCG",
      location: "Kolkata, West Bengal",
      type: "Corporate",
      procurement: "Packaging materials, food ingredients",
      rating: 4.9,
      image: "https://images.pexels.com/photos/4226883/pexels-photo-4226883.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim() || filters.industry || filters.location || filters.buyerType) {
      const searchParams = new URLSearchParams({
        query: searchQuery,
        ...filters
      });
      navigate(`/search-results?${searchParams.toString()}`);
    }
  };

  const handleDownloadGuide = () => {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,'; // Mock PDF data
    link.download = 'Preferred_Supplier_Guide.pdf';
    alert('Guide downloaded! This is a demo - in production, a real PDF would be downloaded.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connecting You to a <span className="text-blue-600">World of Opportunities</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridge the gap between your business and potential buyers. Access verified corporations, 
            exporters, and procurement managers actively seeking suppliers like you.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Buyer</h2>
            <p className="text-gray-600">Search through thousands of verified buyers actively looking for suppliers</p>
          </div>

          <div className="space-y-6">
            {/* Main Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for buyers, products, or industries..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-14"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Industries</option>
                  <option value="automotive">Automotive</option>
                  <option value="textiles">Textiles</option>
                  <option value="electronics">Electronics</option>
                  <option value="food">Food & Beverages</option>
                  <option value="chemicals">Chemicals</option>
                  <option value="machinery">Machinery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Type</label>
                <select
                  value={filters.buyerType}
                  onChange={(e) => setFilters({ ...filters, buyerType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="oem">OEM</option>
                  <option value="tier1">Tier-1</option>
                  <option value="exporter">Exporter</option>
                  <option value="distributor">Distributor</option>
                  <option value="retailer">Retailer</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 hover-glow flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search Buyers</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Featured Buyers Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Buyers</h2>
            <p className="text-lg text-gray-600">Leading companies actively seeking suppliers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBuyers.map((buyer, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img 
                  src={buyer.image} 
                  alt={buyer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{buyer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{buyer.industry}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{buyer.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{buyer.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {buyer.type}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Current Procurement Needs:</p>
                    <p className="text-gray-800">{buyer.procurement}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all hover-glow flex items-center justify-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>View Full Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Guide Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Become a Preferred Supplier</h2>
            <p className="text-xl mb-8 text-green-100">
              Download our comprehensive guide to understand what buyers look for 
              and how to position your business for success.
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold mb-2">50+</div>
                  <div className="text-sm text-green-100">Page Comprehensive Guide</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">15</div>
                  <div className="text-sm text-green-100">Industry Sectors Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-2">100+</div>
                  <div className="text-sm text-green-100">Success Case Studies</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadGuide}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all hover-glow flex items-center space-x-2 mx-auto"
            >
              <Download className="h-5 w-5" />
              <span>Download Free Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLinkage;