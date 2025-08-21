import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Building2, MapPin, Globe, Star, ArrowRight, Download, Info,
  Package, IndianRupee, Hash, CheckCircle2, X
} from 'lucide-react';

// ---------------------------------------------------------------------------
// MarketLinkage — with Seller Listing + Delhi MSME cluster locations
// ---------------------------------------------------------------------------

interface Filters {
  industry: string;
  location: string;
  buyerType: string;
}

interface BuyerCard {
  name: string;
  industry: string;
  location: string;   // now Delhi MSME clusters
  type: string;       // OEM | Tier-1 | Exporter | Distributor | Retailer | Corporate
  procurement: string;
  rating: number;
  image: string;
}

interface SellerListing {
  productName: string;
  industry: string;
  price: string;
  moq: string;
  location: string;   // cluster
  description: string;
  image?: string;
}

// --- Delhi MSME clusters (for filters) ---
const CLUSTERS = [
  'Wazirpur', 'Bawana', 'Narela', 'Okhla', 'Mangolpuri',
  'Mayapuri', 'Kirti Nagar', 'Naraina', 'Badli', 'Jhilmil'
];

// --- richer mock buyers covering industries×types×clusters ---
const featuredBuyers: BuyerCard[] = [
  // Automotive
  { name: 'Maruti Suzuki India Ltd.', industry: 'Automotive', location: 'Gurgaon (Gateway)', type: 'OEM', procurement: 'Auto components, seat covers, electrical parts', rating: 4.8, image: 'https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'AutoTech Components Pvt Ltd', industry: 'Automotive', location: 'Wazirpur', type: 'Tier-1', procurement: 'Pressed sheet metal, bushings, brackets', rating: 4.5, image: 'https://images.pexels.com/photos/373460/pexels-photo-373460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Metro Axles & Gears', industry: 'Automotive', location: 'Mayapuri', type: 'Distributor', procurement: 'Gears, axles, aftermarket spares', rating: 4.2, image: 'https://images.pexels.com/photos/209230/pexels-photo-209230.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },

  // Textiles
  { name: 'Welspun India Ltd.', industry: 'Textiles', location: 'Narela', type: 'Exporter', procurement: 'Home textiles, bed linens, terry towels', rating: 4.6, image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Okhla Apparel Sourcing', industry: 'Textiles', location: 'Okhla', type: 'Corporate', procurement: 'Knitted garments, labels, trims', rating: 4.3, image: 'https://images.pexels.com/photos/4484103/pexels-photo-4484103.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'NorthWeave Retail', industry: 'Textiles', location: 'Mangolpuri', type: 'Retailer', procurement: 'Fabrics, ready-to-wear basics', rating: 4.1, image: 'https://images.pexels.com/photos/3738087/pexels-photo-3738087.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },

  // Electronics
  { name: 'Bajaj Electricals Ltd.', industry: 'Electronics', location: 'Kirti Nagar', type: 'Tier-1', procurement: 'Electronic components, consumer appliances', rating: 4.7, image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Okhla ElectroTech', industry: 'Electronics', location: 'Okhla', type: 'OEM', procurement: 'SMT assemblies, wire harnesses, enclosures', rating: 4.4, image: 'https://images.pexels.com/photos/4792723/pexels-photo-4792723.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Naraina Components Hub', industry: 'Electronics', location: 'Naraina', type: 'Distributor', procurement: 'Connectors, passives, power supplies', rating: 4.2, image: 'https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },

  // FMCG / Food
  { name: 'ITC Limited', industry: 'FMCG', location: 'Jhilmil', type: 'Corporate', procurement: 'Packaging materials, food ingredients', rating: 4.9, image: 'https://images.pexels.com/photos/4226883/pexels-photo-4226883.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Bawana Foods Procurement', industry: 'Food & Beverages', location: 'Bawana', type: 'Distributor', procurement: 'Snacking inputs, edible oil packs, PET jars', rating: 4.3, image: 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },

  // Chemicals
  { name: 'Narela Chem Traders', industry: 'Chemicals', location: 'Narela', type: 'Distributor', procurement: 'Solvents, dyes, auxiliaries', rating: 4.0, image: 'https://images.pexels.com/photos/22806/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Mayapuri Industrial Chemicals', industry: 'Chemicals', location: 'Mayapuri', type: 'Corporate', procurement: 'Industrial cleaners, fluxes, resins', rating: 4.2, image: 'https://images.pexels.com/photos/586339/pexels-photo-586339.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },

  // Machinery
  { name: 'Kirti Nagar Machines Ltd.', industry: 'Machinery', location: 'Kirti Nagar', type: 'OEM', procurement: 'CNC fixtures, jigs, machine sub-assemblies', rating: 4.5, image: 'https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  { name: 'Badli Engineering Works', industry: 'Machinery', location: 'Badli', type: 'Tier-1', procurement: 'Turned parts, shafts, housings', rating: 4.1, image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
];

const MarketLinkage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({ industry: '', location: '', buyerType: '' });

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);

  // Seller listing local state
  const [myListings, setMyListings] = useState<SellerListing[]>([]);
  const [newListing, setNewListing] = useState<SellerListing>({
    productName: '', industry: '', price: '', moq: '', location: '', description: '', image: ''
  });
  const [showListedPrompt, setShowListedPrompt] = useState(false);

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
        allLocations: 'All Clusters',
        allTypes: 'All Types',
        automotive: 'Automotive',
        textiles: 'Textiles',
        electronics: 'Electronics',
        food: 'Food & Beverages',
        chemicals: 'Chemicals',
        machinery: 'Machinery',
        oem: 'OEM', tier1: 'Tier-1', exporter: 'Exporter', distributor: 'Distributor', retailer: 'Retailer', corporate: 'Corporate',
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
        disclaimer: 'Note: This is a demonstration page. Data shown is illustrative only.',

        // Seller block
        sellerH: 'List Your Products (Seller)',
        sellerSub: 'Publish your product offering so buyers can discover you.',
        productName: 'Product Name',
        price: 'Price (₹)',
        moq: 'Minimum Order Quantity',
        description: 'Description',
        image: 'Image URL (optional)',
        chooseCluster: 'Choose Cluster',
        chooseIndustry: 'Choose Industry',
        listNow: 'List Product',
        yourListings: 'Your Listings',
        listedOK: 'Your product is listed!',
        close: 'Close',
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
        allLocations: 'सभी क्लस्टर',
        allTypes: 'सभी प्रकार',
        automotive: 'ऑटोमोटिव',
        textiles: 'टेक्सटाइल्स',
        electronics: 'इलेक्ट्रॉनिक्स',
        food: 'खाद्य एवं पेय',
        chemicals: 'रसायन',
        machinery: 'मशीनरी',
        oem: 'ओईएम', tier1: 'टियर-1', exporter: 'निर्यातक', distributor: 'वितरक', retailer: 'खुदरा', corporate: 'कॉरपोरेट',
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
        disclaimer: 'नोट: यह एक डेमो पेज है। प्रदर्शित डेटा केवल उदाहरण स्वरूप है।',

        sellerH: 'अपने उत्पाद सूचीबद्ध करें (सेलर)',
        sellerSub: 'अपना उत्पाद प्रकाशित करें ताकि खरीदार आपको ढूँढ सकें।',
        productName: 'उत्पाद का नाम',
        price: 'क़ीमत (₹)',
        moq: 'न्यूनतम ऑर्डर मात्रा',
        description: 'विवरण',
        image: 'इमेज URL (वैकल्पिक)',
        chooseCluster: 'क्लस्टर चुनें',
        chooseIndustry: 'उद्योग चुनें',
        listNow: 'उत्पाद सूचीबद्ध करें',
        yourListings: 'आपकी लिस्टिंग',
        listedOK: 'आपका उत्पाद सूचीबद्ध हो गया!',
        close: 'बंद करें',
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

  const handleListProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListing.productName || !newListing.industry || !newListing.location) return;
    setMyListings((prev) => [newListing, ...prev]);
    setShowListedPrompt(true);
    setNewListing({ productName: '', industry: '', price: '', moq: '', location: '', description: '', image: '' });
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
                  <option value="Automotive">{t('automotive')}</option>
                  <option value="Textiles">{t('textiles')}</option>
                  <option value="Electronics">{t('electronics')}</option>
                  <option value="Food & Beverages">{t('food')}</option>
                  <option value="Chemicals">{t('chemicals')}</option>
                  <option value="Machinery">{t('machinery')}</option>
                  <option value="FMCG">FMCG</option>
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
                  {CLUSTERS.map((c) => <option key={c} value={c}>{c}</option>)}
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
                  <option value="OEM">{t('oem')}</option>
                  <option value="Tier-1">{t('tier1')}</option>
                  <option value="Exporter">{t('exporter')}</option>
                  <option value="Distributor">{t('distributor')}</option>
                  <option value="Retailer">{t('retailer')}</option>
                  <option value="Corporate">{t('corporate')}</option>
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

        {/* Seller Listing */}
        <section className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow border p-6 md:p-8 mb-12`}>
          <div className="text-center mb-6">
            <Package className="h-10 w-10 text-[#138808] mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">{t('sellerH')}</h2>
            <p className="opacity-80">{t('sellerSub')}</p>
          </div>

          <form onSubmit={handleListProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('productName')}</label>
              <input
                value={newListing.productName}
                onChange={(e) => setNewListing({ ...newListing, productName: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('chooseIndustry')}</label>
              <select
                value={newListing.industry}
                onChange={(e) => setNewListing({ ...newListing, industry: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                required
              >
                <option value="">{t('chooseIndustry')}</option>
                <option value="Automotive">{t('automotive')}</option>
                <option value="Textiles">{t('textiles')}</option>
                <option value="Electronics">{t('electronics')}</option>
                <option value="Food & Beverages">{t('food')}</option>
                <option value="Chemicals">{t('chemicals')}</option>
                <option value="Machinery">{t('machinery')}</option>
                <option value="FMCG">FMCG</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('price')}</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                  className="w-full pl-9 px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('moq')}</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <input
                  type="number"
                  min="1"
                  value={newListing.moq}
                  onChange={(e) => setNewListing({ ...newListing, moq: e.target.value })}
                  className="w-full pl-9 px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('chooseCluster')}</label>
              <select
                value={newListing.location}
                onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                required
              >
                <option value="">{t('chooseCluster')}</option>
                {CLUSTERS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">{t('description')}</label>
              <textarea
                rows={3}
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">{t('image')}</label>
              <input
                type="url"
                value={newListing.image}
                onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-[#138808] focus:border-transparent"
                placeholder="https://…"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#138808] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {t('listNow')}
              </button>
            </div>
          </form>

          {/* Your Listings (simple preview) */}
          {myListings.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3">{t('yourListings')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myListings.map((l, i) => (
                  <article key={i} className={`${contrast ? 'bg-zinc-950' : 'bg-slate-50'} p-4 rounded-lg border`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{l.productName}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{l.industry}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{l.description || '-'}</p>
                    <div className="text-xs opacity-80 mb-2">
                      <span className="mr-3">₹{l.price || '-'}</span>
                      <span>MOQ: {l.moq || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPin className="h-4 w-4" /> {l.location || '-'}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
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

      {/* Prompt: listed successfully */}
      {showListedPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowListedPrompt(false)} />
          <div className={`${contrast ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900'} relative z-[61] w-[95%] max-w-md rounded-2xl shadow-xl border p-6`}>
            <button
              aria-label={t('close')}
              className="absolute right-3 top-3 p-2 rounded hover:bg-slate-100 text-slate-600"
              onClick={() => setShowListedPrompt(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-6 w-6 text-[#138808]" />
              <h3 className="text-lg font-bold">{t('listedOK')}</h3>
            </div>
            <p className="opacity-80">{lang === 'hi'
              ? 'खरीदार अब आपकी लिस्टिंग देख पाएँगे।'
              : 'Buyers can now discover your listing.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketLinkage;
