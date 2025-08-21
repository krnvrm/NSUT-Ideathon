import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

// ---------------------------------------------------------------------------
// Footer (GoI / Samarth / S3WaaS-inspired)
// - Bilingual headings (listens to Navbar's gov-ui:lang event)
// - GIGW-ish footer lines: Content Owned By, Web Information Manager, Last Updated
// - Policies links, Back to top, initiative logos
// - No restricted emblems; use your own assets
// ---------------------------------------------------------------------------
import MAKE_IN_INDIA_LOGO from '../assets/make-in-india-seeklogo.png';
import DIGITAL_INDIA_LOGO from '../assets/digital-india.svg';
interface FooterProps {
  orgName?: string;
  email?: string; // primary contact
  phone?: string;
  address?: string;
  wimEmail?: string; // Web Information Manager
  ownedBy?: string;
  lastUpdated?: string; // if omitted, uses today
  showInitiativeLogos?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  orgName = 'Saksham',
  email = 'info@saksham.gov.in',
  phone = '+91-11-2345-6789',
  address = 'Delhi Secretariat, New Delhi',
  wimEmail = 'protowim@demo.gov',
  ownedBy = 'Oldman Sachs (Ideathon)',
  lastUpdated,
  showInitiativeLogos = true,
}) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const onLang = (e: any) => setLang(e.detail?.lang === 'hi' ? 'hi' : 'en');
    window.addEventListener('gov-ui:lang', onLang as EventListener);
    return () => window.removeEventListener('gov-ui:lang', onLang as EventListener);
  }, []);

  const t = (k: string) => {
    const dict: Record<string, Record<string, string>> = {
      en: {
        about: 'About',
        quick: 'Quick Links',
        contact: 'Contact Info',
        policies: 'Policies',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        security: 'Security Policy',
        accessibility: 'Accessibility',
        sitemap: 'Sitemap',
        feedback: 'Feedback',
        owned: 'Content Owned by',
        wim: 'Web Information Manager',
        updated: 'Last Updated',
        disclaimer: 'Disclaimer: Prototype for demonstration; not an official government website.'
      },
      hi: {
        about: 'परिचय',
        quick: 'त्वरित लिंक',
        contact: 'संपर्क जानकारी',
        policies: 'नीतियाँ',
        privacy: 'गोपनीयता नीति',
        terms: 'उपयोग की शर्तें',
        security: 'सुरक्षा नीति',
        accessibility: 'सुगम्यता',
        sitemap: 'साइटमैप',
        feedback: 'प्रतिक्रिया',
        owned: 'सामग्री का स्वामित्व',
        wim: 'वेब सूचना प्रबंधक',
        updated: 'अंतिम अद्यतन',
        disclaimer: 'अस्वीकरण: यह केवल डेमो हेतु प्रोटोटाइप है; आधिकारिक सरकारी वेबसाइट नहीं।'
      },
    };
    return dict[lang][k];
  };

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const updated = lastUpdated || today;

  return (
    <footer className="bg-slate-900 text-white mt-10">
      {/* Tricolour accent */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white" />
        <div className="bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-7 w-7 text-blue-300" aria-hidden="true" />
              <span className="font-bold text-xl">{orgName}</span>
            </div>
            <p className="text-slate-300 mb-4">
              Empowering Delhi's MSMEs with access to finance, markets, and technology — your gateway to sustainable growth.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4 text-emerald-400" /> {email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">{t('quick')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/finance" className="text-slate-300 hover:text-white">Finance Hub</Link></li>
              <li><Link to="/market-linkage" className="text-slate-300 hover:text-white">Market Linkage</Link></li>
              <li><Link to="/technology" className="text-slate-300 hover:text-white">Technology Hub</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">{t('contact')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <a href={`tel:${phone}`} className="text-slate-300 hover:text-white">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300">{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-xs sm:text-sm text-slate-300 space-y-1">
            <p>
              <span className="font-semibold">{t('owned')}:</span> {ownedBy}
            </p>
            <p>
              <span className="font-semibold">{t('wim')}:</span> <a href={`mailto:${wimEmail}`} className="hover:underline">{wimEmail}</a>
            </p>
            <p>
              <span className="font-semibold">{t('updated')}:</span> {updated}
            </p>
          </div>

          <div className="flex justify-center">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
              <li><Link to="/privacy" className="text-slate-300 hover:text-white">{t('privacy')}</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white">{t('terms')}</Link></li>
              <li><Link to="/security" className="text-slate-300 hover:text-white">{t('security')}</Link></li>
              <li><Link to="/accessibility" className="text-slate-300 hover:text-white">{t('accessibility')}</Link></li>
              <li><Link to="/sitemap" className="text-slate-300 hover:text-white">{t('sitemap')}</Link></li>
              <li><Link to="/feedback" className="text-slate-300 hover:text-white">{t('feedback')}</Link></li>
            </ul>
          </div>

          <div className="flex md:justify-end items-center gap-4">
            {showInitiativeLogos && (
              <>
                <img src={MAKE_IN_INDIA_LOGO} alt="Make in India" className="h-7 w-auto" />
                <img src={DIGITAL_INDIA_LOGO} alt="Digital India" className="h-6 w-auto" />
              </>
            )}
            <a href="#top" className="ml-2 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white">
              <ArrowUp className="h-4 w-4" /> Back to top
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-6 pt-6 text-center">
          <p className="text-slate-300 text-xs sm:text-sm">
            © {new Date().getFullYear()} {orgName}. All rights reserved.
          </p>
          <p className="text-slate-400 text-[11px] mt-1">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
