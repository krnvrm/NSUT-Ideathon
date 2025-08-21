import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Gauge,
  X,
} from 'lucide-react';
import MAKE_IN_INDIA_LOGO from '../assets/make-in-india-seeklogo.png';
import DIGITAL_INDIA_LOGO from '../assets/digital-india.svg';

// ---------------------------------------------------------------------------
// Homepage
// - Slide-in Digital Readiness Test prompt (dismissible; remembers via localStorage)
// - Removed Satyamev Jayate + Saksham logo strip from hero
// ---------------------------------------------------------------------------

const Homepage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);
  const [showTestPrompt, setShowTestPrompt] = useState(false);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Kumar Auto Components',
      quote:
        'Delhi MSME Ascend helped us secure ₹25 lakhs in working capital within 15 days. Our production has doubled!',
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Priya Sharma',
      company: 'Sharma Textiles',
      quote:
        'Through their platform, we connected with international buyers and increased our exports by 300%.',
      image:
        'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Amit Singh',
      company: 'Singh Electronics',
      quote:
        "The technology upgrade program transformed our operations. We're now fully digital and more efficient than ever.",
      image:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  const partners = [
    'State Bank of India',
    'HDFC Bank',
    'CII',
    'FICCI',
    'Microsoft',
    'Google',
    'Amazon Web Services',
    'Razorpay',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up, .pop-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    const dismissed = localStorage.getItem('dismissTechPrompt') === '1';
    if (!dismissed) {
      const id = setTimeout(() => setShowTestPrompt(true), 900);
      return () => clearTimeout(id);
    }
  }, []);

  const closePrompt = () => {
    setShowTestPrompt(false);
    localStorage.setItem('dismissTechPrompt', '1');
  };

  const t = (k: string) => {
    const dict: Record<string, Record<string, string>> = {
      en: {
        heroTitle1: "Empowering Delhi's MSMEs:",
        heroTitle2: 'Your Partner in Growth',
        heroSub:
          'Unlocking access to finance, markets and modern technology for a competitive edge.',
        getFin: 'Get Financed',
        findBuy: 'Find Buyers',
        upgrade: 'Upgrade Your Tech',
        quickLinks: 'Quick Links',
        ondc: 'ONDC',
        udyam: 'Udyam Registration',
        jans: 'JanSamarth',
        mys: 'myScheme',
        how: 'How It Works',
        howSub: 'Three simple steps to transform your business and achieve sustainable growth',
        step1: 'Create Your Profile',
        step1d:
          'Build your digital identity and showcase capabilities, certifications and track record.',
        step2: 'Access Resources',
        step2d: 'Connect with verified lenders, buyers and tech providers — tailored to your needs.',
        step3: 'Grow Your Business',
        step3d: 'Scale with confidence, track progress and unlock new opportunities.',
        success: 'Success Stories',
        successSub: "Real transformations from Delhi's growing MSME community",
        partnersTitle: 'Our Partners',
        partnersSub:
          'Trusted by leading financial institutions, corporations and technology providers',
        initiatives: 'National initiatives',
        promptH: 'Digital Readiness Test',
        promptP: 'Takes ~1 minute. Get your score & next steps.',
        promptCTA: 'Start Now',
      },
      hi: {
        heroTitle1: 'दिल्ली के एमएसएमई सशक्तिकरण:',
        heroTitle2: 'आपका विकास भागीदार',
        heroSub: 'वित्त, बाज़ार और आधुनिक तकनीक तक पहुँच — प्रतिस्पर्धात्मक बढ़त के लिए।',
        getFin: 'वित्त प्राप्त करें',
        findBuy: 'खरीदार खोजें',
        upgrade: 'तकनीक उन्नत करें',
        quickLinks: 'त्वरित लिंक',
        ondc: 'ओएनडीसी',
        udyam: 'उद्योग पंजीकरण',
        jans: 'जनसमर्थ',
        mys: 'मायस्कीम',
        how: 'कैसे काम करता है',
        howSub: 'सतत विकास के लिए तीन सरल चरण',
        step1: 'अपनी प्रोफ़ाइल बनाएं',
        step1d: 'डिजिटल पहचान बनाएं और क्षमताएँ व प्रमाण पत्र प्रदर्शित करें।',
        step2: 'संसाधन प्राप्त करें',
        step2d: 'सत्यापित ऋणदाता, खरीदार और टेक प्रदाताओं से जुड़ें।',
        step3: 'व्यवसाय बढ़ाएँ',
        step3d: 'आत्मविश्वास के साथ स्केल करें, प्रगति ट्रैक करें और नए अवसर पाएं।',
        success: 'सफलता की कहानियाँ',
        successSub: 'दिल्ली के बढ़ते MSME समुदाय से वास्तविक परिवर्तन',
        partnersTitle: 'हमारे भागीदार',
        partnersSub: 'अग्रणी वित्तीय संस्थान, निगम और प्रौद्योगिकी प्रदाता',
        initiatives: 'राष्ट्रीय पहल',
        promptH: 'डिजिटल रेडीनेस टेस्ट',
        promptP: 'लगभग 1 मिनट। स्कोर और अगले कदम पाएं।',
        promptCTA: 'शुरू करें',
      },
    };
    return dict[lang][k];
  };

  const fontClass =
    fontStep === -1 ? 'text-[15px]' : fontStep === 1 ? 'text-[19px]' : 'text-[17px]';
  const theme = contrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`min-h-screen ${theme} ${fontClass}`}>
      {/* HERO */}
      <section
        className={`relative flex items-center justify-center ${
          contrast ? 'bg-zinc-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
        } border-b`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          {/* (logos removed as requested) */}

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t('heroTitle1')}
            <br />
            <span className="text-blue-700">{t('heroTitle2')}</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">{t('heroSub')}</p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/finance"
              className="group bg-[#138808] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all inline-flex items-center gap-2"
            >
              <span>{t('getFin')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/market-linkage"
              className="group bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white px-6 py-3 rounded-lg font-semibold text-base transition-all inline-flex items-center gap-2"
            >
              <span>{t('findBuy')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/technology"
              className="group bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all inline-flex items-center gap-2"
            >
              <span>{t('upgrade')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3">{t('quickLinks')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <Link
                to="/ondc"
                className="bg-white border rounded-xl px-4 py-3 text-sm font-medium hover:shadow"
              >
                {t('ondc')}
              </Link>
              <Link
                to="/udyam"
                className="bg-white border rounded-xl px-4 py-3 text-sm font-medium hover:shadow"
              >
                {t('udyam')}
              </Link>
              <Link
                to="/jansamarth"
                className="bg-white border rounded-xl px-4 py-3 text-sm font-medium hover:shadow"
              >
                {t('jans')}
              </Link>
              <Link
                to="/myscheme"
                className="bg-white border rounded-xl px-4 py-3 text-sm font-medium hover:shadow"
              >
                {t('mys')}
              </Link>
            </div>
          </div>

          {/* Initiatives strip (logos) */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide opacity-70 mb-2">{t('initiatives')}</p>
            <div className="flex items-center justify-center gap-6 md:gap-10 opacity-90">
              <img src={MAKE_IN_INDIA_LOGO} alt="Make in India" className="h-8 md:h-10 w-auto" />
              <img src={DIGITAL_INDIA_LOGO} alt="Digital India" className="h-7 md:h-9 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main id="main">
        {/* How It Works */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('how')}</h2>
              <p className="text-base md:text-xl opacity-80 max-w-3xl mx-auto">{t('howSub')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center pop-in">
                <div className="bg-blue-700 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Users className="h-8 w-8 md:h-10 md:w-10 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{t('step1')}</h3>
                <p className="opacity-80">{t('step1d')}</p>
              </div>
              <div className="text-center pop-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-green-600 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{t('step2')}</h3>
                <p className="opacity-80">{t('step2d')}</p>
              </div>
              <div className="text-center pop-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-amber-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{t('step3')}</h3>
                <p className="opacity-80">{t('step3d')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className={`${contrast ? 'bg-zinc-950' : 'bg-white'} py-14 md:py-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('success')}</h2>
              <p className="text-base md:text-xl opacity-80">{t('successSub')}</p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div
                className={`${
                  contrast ? 'bg-zinc-900' : 'bg-white'
                } rounded-2xl shadow p-6 md:p-8 transition-all duration-500`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <blockquote className="text-lg md:text-xl mb-3 italic opacity-90">
                      “{testimonials[currentTestimonial].quote}”
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                      <p className="text-blue-700">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full shadow p-3 hover:shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full shadow p-3 hover:shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === currentTestimonial ? 'bg-blue-700' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className={`${contrast ? 'bg-black' : 'bg-slate-50'} py-12 md:py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:3xl font-bold mb-2">{t('partnersTitle')}</h2>
              <p className="text-sm md:text-lg opacity-80">{t('partnersSub')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className={`${
                    contrast ? 'bg-zinc-900' : 'bg-white'
                  } p-5 rounded-xl border hover:shadow transition-all duration-300 flex items-center justify-center`}
                >
                  <span className="opacity-60 hover:opacity-100 font-semibold text-center">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Slide-in: Digital Readiness Test prompt */}
      {showTestPrompt && (
        <div className="fixed z-50 right-4 bottom-4 md:right-6 md:bottom-6">
          <div
            className={`${
              contrast
                ? 'bg-zinc-900 text-white border border-zinc-700'
                : 'bg-white text-slate-900 border shadow-xl'
            } w-80 max-w-[90vw] rounded-2xl p-4 transition-all duration-300 translate-y-0 opacity-100`}
            role="dialog"
            aria-labelledby="drt-title"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-lg p-2 bg-blue-600 text-white">
                <Gauge className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 id="drt-title" className="font-semibold">
                  {t('promptH')}
                </h4>
                <p className="text-sm opacity-80">{t('promptP')}</p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/technology#assessment"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#138808] hover:bg-green-700 text-white text-sm font-semibold"
                    onClick={closePrompt}
                  >
                    {t('promptCTA')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    className={`px-3 py-2 rounded-md text-sm font-semibold ${
                      contrast ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                    onClick={closePrompt}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                className={`p-1 rounded-md ${
                  contrast ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'
                }`}
                onClick={closePrompt}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
