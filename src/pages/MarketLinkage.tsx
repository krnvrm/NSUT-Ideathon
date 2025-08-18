import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Globe, Star, ArrowRight, Download, Info } from 'lucide-react';

// ---------------------------------------------------------------------------
// MarketLinkage — Consistent with GoI-style Navbar/Homepage/FinanceHub
// - Listens to Navbar events: gov-ui:lang / gov-ui:contrast / gov-ui:font-step
// - Conservative NIC-ish palette; rounded-2xl cards, border shadows
// - EN/HI i18n via lightweight t() map
// - Accessibility: labels, helper texts
// ---------------------------------------------------------------------------

interface Filters {
  industry: string;
  location: string;
  buyerType: string;
}

interface BuyerCard {
  name: string;
  industry: string;
  location: string;
  type: string;
  procurement: string;
  rating: number;
  image: string;
}

const featuredBuyers: BuyerCard[] = [
  {
    name: 'Maruti Suzuki India Ltd.',
    industry: 'Automotive',
    location: 'Gurgaon, Haryana',
    type: 'OEM',
    procurement: 'Auto components, seat covers, electrical parts',
    rating: 4.8,
    image:
      'https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    name: 'Welspun India Ltd.',
    industry: 'Textiles',
    location: 'Mumbai, Maharashtra',
    type: 'Exporter',
    procurement: 'Home textiles, bed linens, terry towels',
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    name: 'Bajaj Electricals Ltd.',
    industry: 'Electronics',
    location: 'Pune, Maharashtra',
    type: 'Tier-1',
    procurement: 'Electronic components, consumer appliances',
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
  {
    name: 'ITC Limited',
    industry: 'FMCG',
    location: 'Kolkata, West Bengal',
    type: 'Corporate',
    procurement: 'Packaging materials, food ingredients',
    rating: 4.9,
    image:
      'https://images.pexels.com/photos/4226883/pexels-photo-4226883.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  },
];

const MarketLinkage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({ industry: '', location: '', buyerType: '' });

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const onFont = (e: any) => setFontStep(e.detail?.fontStep ?? 0);
    const onContrast = (e: any) => setContrast(!!e.detail?.contrast);
    const onLang = (e: any) => setLang(e.detail?.lang === 'hi' ? 'hi' : 'en');
    window.addEventListener('gov-ui:font-step', onFont as EventListener);
    window.addEventListener('gov-ui:contrast', onContrast as EventListener);
    window.addEventListener('gov-ui:lang', onLang as EventListener);
    return () => {
      window.removeEventListener('gov-ui:font-step', onFont as EventListener);
      window.removeEventListener('gov-ui:contrast', onContrast as EventListener);
      window.removeEventListener('gov-ui:lang', onLang as EventListener);
    };
  }, []);

  const t = (k: string) => {
    const dict: Record<string, Record<string, string>> = {
      en: {
        titleA: 'Market Linkage',
        titleB: 'Find Verified Buyers',
        subtitle:
          'Bridge the gap between your business and procurement teams — discover verified OEMs, exporters and corporates actively sourcing.',
        searchH: 'Find Your Perfect Buyer',
        searchSub: 'Search thousands of verified buyers actively looking for suppliers',
        placeholder: 'Search for buyers, products, or industries…',
        industry: 'Industry',
        location: 'Location',
        buyerType: 'Buyer Type',
        allIndustries: 'All Industries',
        allLocations: 'All Locations',
        allTypes: 'All Types',
        automotive: 'Automotive',
        textiles: 'Textiles',
        electronics: 'Electronics',
        food: 'Food & Beverages',
        chemicals: 'Chemicals',
        machinery: 'Machinery',
        delhi: 'Delhi NCR',
        mumbai: 'Mumbai',
        bangalore: 'Bengaluru',
        chennai: 'Chennai',
        pune: 'Pune',
        hyderabad: 'Hyderabad',
        oem: 'OEM', tier1: 'Tier-1', exporter: 'Exporter', distributor: 'Distributor', retailer: 'Retailer',
        btnSearch: 'Search Buyers',
        featuredH: 'Featured Buyers',
        featuredSub: 'Leading companies actively seeking suppliers',
        needs: 'Current Procurement Needs:',
        viewProfile: 'View Full Profile',
        guideH: 'Become a Preferred Supplier',
        guideSub:
          'Download our comprehensive guide to understand what buyers look for and how to position your business for success.',
        pages: 'Page Comprehensive Guide',
        sectors: 'Industry Sectors Covered',
        cases: 'Success Case Studies',
        download: 'Download Free Guide',
        disclaimer: 'Note: This is a demonstration page. Data shown is illustrative only.'
      },
      hi: {
        titleA: 'मार्केट लिंकेंज',
        titleB: 'मान्य खरीदार खोजें',
        subtitle:
          'अपने व्यवसाय और प्रोक्योरमेंट टीमों के बीच की दूरी घटाएँ — सक्रिय रूप से सोर्सिंग करने वाले OEM, निर्यातक और कॉरपोरेट खोजें।',
        searchH: 'अपना उपयुक्त खरीदार खोजें',
        searchSub: 'हज़ारों सत्यापित खरीदारों में खोजें जो सप्लायर ढूँढ रहे हैं',
        placeholder: 'खरीदार, उत्पाद या उद्योग खोजें…',
        industry: 'उद्योग',
        location: 'स्थान',
        buyerType: 'खरीदार प्रकार',
        allIndustries: 'सभी उद्योग',
        allLocations: 'सभी स्थान',
        allTypes: 'सभी प्रकार',
        automotive: 'ऑटोमोटिव',
        textiles: 'टेक्सटाइल्स',
        electronics: 'इलेक्ट्रॉनिक्स',
        food: 'खाद्य एवं पेय',
        chemicals: 'रसायन',
        machinery: 'मशीनरी',
        delhi: 'दिल्ली एनसीआर',
        mumbai: 'मुंबई',
        bangalore: 'बेंगलुरु',
        chennai: 'चेन्नई',
        pune: 'पुणे',
        hyderabad: 'हैदराबाद',
        oem: 'ओईएम', tier1: 'टियर-1', exporter: 'निर्यातक', distributor: 'वितरक', retailer: 'खुदरा',
        btnSearch: 'खरीदार खोजें',
        featuredH: 'विशिष्ट खरीदार',
        featuredSub: 'अग्रणी कंपनियाँ सक्रिय रूप से सप्लायर ढूँढ रही हैं',
        needs: 'वर्तमान खरीद आवश्यकताएँ:',
        viewProfile: 'पूरा प्रोफ़ाइल देखें',
        guideH: 'प्रिफर्ड सप्लायर बनें',
        guideSub:
          'खरीदार क्या देखते हैं और अपनी कंपनी को सफलता के लिए कैसे प्रस्तुत करें — इस पर हमारा विस्तृत गाइड डाउनलोड करें।',
        pages: 'पेज व्यापक गाइड',
        sectors: 'उद्योग सेक्टर सम्मिलित',
        cases: 'सफलता के केस स्टडी',
        download: 'मुफ़्त गाइड डाउनलोड करें',
        disclaimer: 'नोट: यह एक डेमो पेज है। प्रदर्शित डेटा केवल उदाहरण स्वरूप है।'
      },
    };
    return dict[lang][k];
  };

  const fontClass = fontStep === -1 ? 'text-[15px]' : fontStep === 1 ? 'text-[19px]' : 'text-[17px]';
  const theme = contrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900';

  const handleSearch = () => {
    if (searchQuery.trim() || filters.industry || filters.location || filters.buyerType) {
      const params = new URLSearchParams({ query: searchQuery, ...filters });
      navigate(`/search-results?${params.toString()}`);
    }
  };

  const handleDownloadGuide = () => {
    // Create a lightweight demo PDF blob
    const content = `%PDF-1.4\n% Demo PDF for Market Linkage Guide\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Preferred_Supplier_Guide.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${theme} ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-center">
            <span className="block">{t('titleA')}</span>
            <span className="block text-[#0F5BA7]">{t('titleB')}</span>
          </h1>
          <p className="text-base md:text-lg opacity-80 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Search Section */}
        <section className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow border p-6 md:p-8 mb-12`}>
          <div className="text-center mb-6">
            <Search className="h-10 w-10 text-[#0F5BA7] mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">{t('searchH')}</h2>
            <p className="opacity-80">{t('searchSub')}</p>
          </div>

          <div className="space-y-6">
            {/* Main Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full px-6 py-4 text-base md:text-lg border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent pl-12 bg-white text-slate-900"
                aria-label={t('placeholder')}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-60" />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('industry')}</label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('allIndustries')}</option>
                  <option value="automotive">{t('automotive')}</option>
                  <option value="textiles">{t('textiles')}</option>
                  <option value="electronics">{t('electronics')}</option>
                  <option value="food">{t('food')}</option>
                  <option value="chemicals">{t('chemicals')}</option>
                  <option value="machinery">{t('machinery')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('location')}</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('allLocations')}</option>
                  <option value="delhi">{t('delhi')}</option>
                  <option value="mumbai">{t('mumbai')}</option>
                  <option value="bangalore">{t('bangalore')}</option>
                  <option value="chennai">{t('chennai')}</option>
                  <option value="pune">{t('pune')}</option>
                  <option value="hyderabad">{t('hyderabad')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('buyerType')}</label>
                <select
                  value={filters.buyerType}
                  onChange={(e) => setFilters({ ...filters, buyerType: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('allTypes')}</option>
                  <option value="oem">{t('oem')}</option>
                  <option value="tier1">{t('tier1')}</option>
                  <option value="exporter">{t('exporter')}</option>
                  <option value="distributor">{t('distributor')}</option>
                  <option value="retailer">{t('retailer')}</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white py-3 md:py-4 px-8 rounded-lg font-semibold text-base md:text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span>{t('btnSearch')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-2 text-xs opacity-80">
              <Info className="h-4 w-4 mt-0.5" />
              <p>{t('disclaimer')}</p>
            </div>
          </div>
        </section>

        {/* Featured Buyers */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('featuredH')}</h2>
            <p className="opacity-80">{t('featuredSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredBuyers.map((buyer, index) => (
              <article
                key={index}
                className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-transform hover:-translate-y-0.5`}
              >
                <img src={buyer.image} alt={buyer.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1">{buyer.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-80">
                        <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {buyer.industry}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {buyer.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="font-semibold">{buyer.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {buyer.type}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wide opacity-70 mb-1">{t('needs')}</p>
                    <p>{buyer.procurement}</p>
                  </div>

                  <button className="w-full bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white py-2.5 px-6 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{t('viewProfile')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Supplier Guide Section */}
        <section className={`${contrast ? 'bg-zinc-900' : 'bg-gradient-to-r from-[#138808] to-green-700'} rounded-2xl p-8 text-white text-center`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('guideH')}</h2>
            <p className="text-base md:text-lg mb-6 opacity-95">{t('guideSub')}</p>

            <div className={`${contrast ? 'bg-zinc-950 text-white' : 'bg-white/20 text-white'} rounded-lg p-6 mb-6`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold mb-1">50+</div>
                  <div className="text-xs md:text-sm opacity-90">{t('pages')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">15</div>
                  <div className="text-xs md:text-sm opacity-90">{t('sectors')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">100+</div>
                  <div className="text-xs md:text-sm opacity-90">{t('cases')}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadGuide}
              className={`${contrast ? 'bg-white text-black hover:bg-slate-200' : 'bg-white text-green-700 hover:bg-slate-100'} px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2`}
            >
              <Download className="h-5 w-5" />
              <span>{t('download')}</span>
            </button>
          </div>
        </section>

        <p className="text-[11px] opacity-60 mt-6 text-center">{t('disclaimer')}</p>
      </div>
    </div>
  );
};

export default MarketLinkage;
