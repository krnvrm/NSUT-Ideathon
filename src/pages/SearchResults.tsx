import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Building2, MapPin, Star, Globe, Mail, Phone, ArrowLeft, Filter } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  industry: string;
  location: string;
  type: string;
  procurement: string;
  rating: number;
  employees: string;
  revenue: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
  verified: boolean;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');

  // Mock search results based on query parameters
  useEffect(() => {
    const query = searchParams.get('query') || '';
    const industry = searchParams.get('industry') || '';
    const location = searchParams.get('location') || '';
    const buyerType = searchParams.get('buyerType') || '';

    // Simulate API call delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          name: 'Mahindra & Mahindra Ltd.',
          industry: 'Automotive',
          location: 'Mumbai, Maharashtra',
          type: 'OEM',
          procurement: 'Auto components, electrical systems, seat assemblies',
          rating: 4.8,
          employees: '50,000+',
          revenue: '₹1,50,000 Cr',
          contactEmail: 'procurement@mahindra.com',
          contactPhone: '+91-22-2490-1441',
          image: 'https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: true
        },
        {
          id: '2',
          name: 'Raymond Lifestyle Ltd.',
          industry: 'Textiles',
          location: 'Mumbai, Maharashtra',
          type: 'Manufacturer',
          procurement: 'Fabrics, buttons, zippers, packaging materials',
          rating: 4.6,
          employees: '25,000+',
          revenue: '₹8,500 Cr',
          contactEmail: 'suppliers@raymond.co.in',
          contactPhone: '+91-22-6172-2000',
          image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: true
        },
        {
          id: '3',
          name: 'Godrej Industries Ltd.',
          industry: 'FMCG',
          location: 'Mumbai, Maharashtra',
          type: 'Corporate',
          procurement: 'Packaging materials, chemicals, raw materials',
          rating: 4.7,
          employees: '18,000+',
          revenue: '₹12,400 Cr',
          contactEmail: 'vendor@godrej.com',
          contactPhone: '+91-22-2518-8010',
          image: 'https://images.pexels.com/photos/4226883/pexels-photo-4226883.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: true
        },
        {
          id: '4',
          name: 'Lupin Pharmaceuticals',
          industry: 'Pharmaceuticals',
          location: 'Mumbai, Maharashtra',
          type: 'Manufacturer',
          procurement: 'Active pharmaceutical ingredients, packaging, machinery',
          rating: 4.5,
          employees: '15,000+',
          revenue: '₹16,800 Cr',
          contactEmail: 'sourcing@lupin.com',
          contactPhone: '+91-22-6640-2323',
          image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: true
        },
        {
          id: '5',
          name: 'Tech Export Solutions',
          industry: 'Electronics',
          location: 'Bangalore, Karnataka',
          type: 'Exporter',
          procurement: 'Electronic components, semiconductors, PCBs',
          rating: 4.4,
          employees: '500+',
          revenue: '₹850 Cr',
          contactEmail: 'exports@techsolutions.com',
          contactPhone: '+91-80-4567-8900',
          image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: false
        },
        {
          id: '6',
          name: 'Global Textile Exports',
          industry: 'Textiles',
          location: 'Delhi, NCR',
          type: 'Exporter',
          procurement: 'Cotton fabrics, garments, home textiles',
          rating: 4.3,
          employees: '1,200+',
          revenue: '₹450 Cr',
          contactEmail: 'business@globaltextile.in',
          contactPhone: '+91-11-4567-1234',
          image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
          verified: true
        }
      ];

      // Filter results based on search parameters
      let filteredResults = mockResults;

      if (query) {
        filteredResults = filteredResults.filter(result => 
          result.name.toLowerCase().includes(query.toLowerCase()) ||
          result.industry.toLowerCase().includes(query.toLowerCase()) ||
          result.procurement.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (industry) {
        filteredResults = filteredResults.filter(result => 
          result.industry.toLowerCase() === industry.toLowerCase()
        );
      }

      if (location) {
        filteredResults = filteredResults.filter(result => 
          result.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (buyerType) {
        filteredResults = filteredResults.filter(result => 
          result.type.toLowerCase() === buyerType.toLowerCase()
        );
      }

      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const sortResults = (results: SearchResult[]) => {
    switch (sortBy) {
      case 'rating':
        return [...results].sort((a, b) => b.rating - a.rating);
      case 'name':
        return [...results].sort((a, b) => a.name.localeCompare(b.name));
      case 'location':
        return [...results].sort((a, b) => a.location.localeCompare(b.location));
      default:
        return results;
    }
  };

  const sortedResults = sortResults(results);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">Searching for buyers...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/market-linkage" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Market Linkage</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
              <p className="text-gray-600">
                Found {sortedResults.length} potential buyers matching your criteria
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="name">Company Name</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {sortedResults.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{result.name}</h3>
                        {result.verified && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verified
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{result.industry}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{result.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Revenue: {result.revenue}</span>
                        <span>Employees: {result.employees}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{result.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {result.type}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Current Procurement Needs:</p>
                    <p className="text-gray-800">{result.procurement}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{result.contactEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{result.contactPhone}</span>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-lg font-semibold transition-all hover-glow flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Contact Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedResults.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No buyers found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse our featured buyers.
            </p>
            <Link 
              to="/market-linkage"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover-glow"
            >
              Back to Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;