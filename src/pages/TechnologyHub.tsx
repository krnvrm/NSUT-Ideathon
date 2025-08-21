import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Smartphone, Monitor, CreditCard, ChevronDown, ChevronUp, CheckCircle, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// TechnologyHub — Refactored with Step Slider, Progress, Animated Score Ring
// - Step-by-step questionnaire with Next/Back + linear progress
// - Animated circular readiness score (0→score) with SVG ring
// - Outcome modal based on thresholds: <20, 20–60, >60
// - Keeps your EN/HI i18n, contrast, font-step, palette, accessibility
// ---------------------------------------------------------------------------

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
  color: string; // e.g. 'text-green-600'
}

interface SolutionItem { name: string; description: string; price: string }
interface TechCategory {
  id: string;
  title: string;
  icon: any;
  description: string;
  solutions: SolutionItem[];
  accent: string; // bg color class
}

const TechnologyHub: React.FC = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    currentSystems: '',
    digitalPresence: '',
    paymentMethods: '',
    dataManagement: '',
    automation: '',
  });

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);

  // Step slider state
  const questionKeys = useMemo<(keyof AssessmentData)[]>(() => [
    'currentSystems', 'digitalPresence', 'paymentMethods', 'dataManagement', 'automation'
  ], []);
  const totalQuestions = questionKeys.length;
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Score animation
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

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
        titleA: 'Technology Hub',
        titleB: 'Upgrade & Digital Readiness',
        subtitle: 'Assess your digital readiness and find right-fit technology to streamline operations and grow faster.',
        assessH: 'Digital Readiness Assessment',
        assessSub: 'Discover your current adoption level and get practical next steps',
        q1: 'What business management systems do you currently use?',
        q1a: 'Integrated ERP/CRM systems',
        q1b: 'Basic accounting software',
        q1c: 'Spreadsheets and manual tracking',
        q1d: 'Paper-based processes only',
        q2: 'How strong is your digital presence?',
        q2a: 'Professional website with e-commerce and SEO',
        q2b: 'Basic website and social media presence',
        q2c: 'Social media accounts only',
        q2d: 'No online presence',
        q3: 'What payment methods do you accept?',
        q3a: 'Multiple digital payments (UPI, cards, wallets)',
        q3b: 'UPI and basic digital payments',
        q3c: 'Cash and cheques only',
        q3d: 'Cash only',
        q4: 'How do you manage customer and business data?',
        q4a: 'Cloud-based CRM with analytics',
        q4b: 'Digital databases and basic tracking',
        q4c: 'Excel sheets and basic digital files',
        q4d: 'Paper records only',
        q5: 'What level of process automation do you have?',
        q5a: 'Automated workflows and AI-powered processes',
        q5b: 'Some automated reporting and notifications',
        q5c: 'Basic automated calculations',
        q5d: 'All manual processes',
        btnNext: 'Next',
        btnBack: 'Back',
        btnScore: 'Get My Digital Score',
        progress: 'Progress',
        scoreH: 'Your Digital Score',
        nextSteps: 'Recommended Next Steps:',
        solutionsH: 'Technology Solutions',
        solutionsSub: 'Explore curated solutions designed for MSMEs',
        demo: 'Request a Demo',
        consult: 'Get a Free Consultation',
        integrations: 'See Integrations',
        completePrompt: 'Complete the assessment to see your digital readiness score',
        // Modal CTA text
        modalLowH: 'Visit a SAKSHAM Help Center',
        modalLowB: 'Your score suggests you’ll benefit from in-person assistance. Our offline SAKSHAM Help Centers can guide you end to end.',
        modalMidH: 'Take Guided SAKSHAM Registration',
        modalMidB: 'Great start! Proceed with guided registration and we’ll walk you through each step.',
        modalHighH: 'Continue Online, You’re Ready!',
        modalHighB: 'You have strong readiness. You can complete the journey online at your own pace.',
        modalFindCenter: 'Find Help Center',
        modalStartGuided: 'Start Guided Registration',
        modalContinue: 'Continue Online',
        close: 'Close',
      },
      hi: {
        titleA: 'टेक्नोलॉजी हब',
        titleB: 'अपग्रेड व डिजिटल रेडीनेस',
        subtitle: 'अपनी डिजिटल तैयारी आँकें और उपयुक्त तकनीकी समाधान चुनें ताकि संचालन सुगम हों और विकास तेज़ हो।',
        assessH: 'डिजिटल रेडीनेस आकलन',
        assessSub: 'अपनी वर्तमान अपनाने की स्थिति जानें और व्यावहारिक अगले कदम पाएँ',
        q1: 'आप वर्तमान में कौन-से बिज़नेस मैनेजमेंट सिस्टम उपयोग करते हैं?',
        q1a: 'इंटीग्रेटेड ERP/CRM सिस्टम',
        q1b: 'बेसिक अकाउंटिंग सॉफ़्टवेयर',
        q1c: 'स्प्रेडशीट व मैनुअल ट्रैकिंग',
        q1d: 'केवल कागज़ी प्रक्रियाएँ',
        q2: 'आपकी डिजिटल उपस्थिति कितनी मज़बूत है?',
        q2a: 'ई-कॉमर्स व SEO सहित प्रोफ़ेशनल वेबसाइट',
        q2b: 'बेसिक वेबसाइट व सोशल मीडिया',
        q2c: 'केवल सोशल मीडिया अकाउंट्स',
        q2d: 'कोई ऑनलाइन उपस्थिति नहीं',
        q3: 'आप कौन-से भुगतान तरीक़े स्वीकार करते हैं?',
        q3a: 'कई डिजिटल भुगतान (UPI, कार्ड, वॉलेट)',
        q3b: 'UPI व बेसिक डिजिटल भुगतान',
        q3c: 'केवल नकद व चेक',
        q3d: 'केवल नकद',
        q4: 'आप ग्राहक व व्यवसाय डेटा कैसे प्रबंधित करते हैं?',
        q4a: 'एनालिटिक्स सहित क्लाउड-आधारित CRM',
        q4b: 'डिजिटल डेटाबेस व बेसिक ट्रैकिंग',
        q4c: 'एक्सेल शीट्स व बेसिक डिजिटल फ़ाइलें',
        q4d: 'केवल कागज़ी रिकॉर्ड',
        q5: 'आपके यहाँ प्रक्रिया ऑटोमेशन का स्तर क्या है?',
        q5a: 'ऑटोमेटेड वर्कफ़्लो व एआई-संचालित प्रक्रियाएँ',
        q5b: 'कुछ ऑटो रिपोर्टिंग व नोटिफ़िकेशन',
        q5c: 'बेसिक ऑटोमेटेड कैलकुलेशन्स',
        q5d: 'सभी प्रक्रियाएँ मैनुअल',
        btnNext: 'आगे',
        btnBack: 'वापस',
        btnScore: 'मेरा डिजिटल स्कोर देखें',
        progress: 'प्रगति',
        scoreH: 'आपका डिजिटल स्कोर',
        nextSteps: 'अनुशंसित अगले कदम:',
        solutionsH: 'टेक्नोलॉजी समाधान',
        solutionsSub: 'एमएसएमई के लिए चुने हुए समाधान देखें',
        demo: 'डेमो का अनुरोध करें',
        consult: 'नि:शुल्क परामर्श लें',
        integrations: 'इंटीग्रेशन देखें',
        completePrompt: 'डिजिटल रेडीनेस स्कोर देखने के लिए आकलन पूरा करें',
        modalLowH: 'SAKSHAM हेल्प सेंटर जाएँ',
        modalLowB: 'आपके स्कोर के अनुसार ऑफ़लाइन सहायता उपयोगी रहेगी। हमारे SAKSHAM हेल्प सेंटर पूरी मदद करेंगे।',
        modalMidH: 'गाइडेड SAKSHAM रजिस्ट्रेशन लें',
        modalMidB: 'अच्छी शुरुआत! गाइडेड रजिस्ट्रेशन के साथ हम हर चरण में साथ चलेंगे।',
        modalHighH: 'ऑनलाइन जारी रखें, आप तैयार हैं!',
        modalHighB: 'आपकी तैयारी मज़बूत है। आप अपनी गति से ऑनलाइन पूरी प्रक्रिया कर सकते हैं।',
        modalFindCenter: 'हेल्प सेंटर खोजें',
        modalStartGuided: 'गाइडेड रजिस्ट्रेशन शुरू करें',
        modalContinue: 'ऑनलाइन जारी रखें',
        close: 'बंद करें',
      },
    };
    return dict[lang][k];
  };

  const technologyCategories: TechCategory[] = [
    {
      id: 'erp-crm',
      title: 'ERP & CRM Systems',
      icon: Monitor,
      description: 'Streamline operations and customer relationships',
      solutions: [
        { name: 'Tally Prime', description: 'Complete business management solution', price: '₹18,000/year' },
        { name: 'Zoho CRM', description: 'Customer relationship management', price: '₹1,200/month' },
        { name: 'SAP Business One', description: 'Enterprise resource planning', price: '₹50,000/year' },
        { name: 'Microsoft Dynamics', description: 'Integrated business applications', price: '₹4,500/month' },
      ],
      accent: 'bg-[#0F5BA7]',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce & Digital Marketing',
      icon: Smartphone,
      description: 'Expand reach with online presence and campaigns',
      solutions: [
        { name: 'Shopify Plus', description: 'Enterprise e-commerce platform', price: '₹15,000/month' },
        { name: 'Google Ads Setup', description: 'Professional advertising campaigns', price: '₹25,000 setup' },
        { name: 'WhatsApp Business API', description: 'Customer communication platform', price: '₹3,000/month' },
        { name: 'Social Media Management', description: 'Complete social presence', price: '₹12,000/month' },
      ],
      accent: 'bg-[#138808]',
    },
    {
      id: 'payments',
      title: 'Digital Payment Solutions',
      icon: CreditCard,
      description: 'Accept payments seamlessly across channels',
      solutions: [
        { name: 'Razorpay Payment Gateway', description: 'Complete payment solutions', price: '2% per transaction' },
        { name: 'PayU Business', description: 'Multi-channel acceptance', price: '1.8% per transaction' },
        { name: 'Paytm for Business', description: 'QR codes and online payments', price: '1.5% per transaction' },
        { name: 'PhonePe Business', description: 'UPI and wallet integration', price: '0.9% per transaction' },
      ],
      accent: 'bg-amber-500',
    },
  ];

  // Calculate score + result
  const computeScore = (data: AssessmentData) => {
    let score = 0;
    const vals = Object.values(data);
    for (const v of vals) {
      if (v === 'advanced') score += 20;
      else if (v === 'intermediate') score += 12;
      else if (v === 'basic') score += 6;
      else score += 0;
    }

    let level = '';
    let color = '';
    let recommendations: string[] = [];

    if (score >= 80) {
      level = lang === 'hi' ? 'डिजिटल लीडर' : 'Digital Leader';
      color = 'text-green-600';
      recommendations = [
        lang === 'hi' ? 'एआई व मशीन लर्निंग समाधान लागू करें' : 'Implement AI and machine learning solutions',
        lang === 'hi' ? 'सप्लाई चेन पारदर्शिता हेतु ब्लॉकचेन खोजें' : 'Explore blockchain for supply chain transparency',
        lang === 'hi' ? 'स्मार्ट संचालन हेतु IoT इंटीग्रेशन पर विचार करें' : 'Consider IoT integration for smart operations',
      ];
    } else if (score >= 60) {
      level = lang === 'hi' ? 'डिजिटल प्रोग्रेसिव' : 'Digital Progressive';
      color = 'text-blue-600';
      recommendations = [
        lang === 'hi' ? 'एडवांस्ड एनालिटिक्स व रिपोर्टिंग शामिल करें' : 'Integrate advanced analytics and reporting',
        lang === 'hi' ? 'ऑटोमेटेड वर्कफ़्लो सिस्टम लागू करें' : 'Implement automated workflow systems',
        lang === 'hi' ? 'डिजिटल मार्केटिंग क्षमताएँ बढ़ाएँ' : 'Expand digital marketing capabilities',
      ];
    } else if (score >= 40) {
      level = lang === 'hi' ? 'डिजिटल एडॉप्टर' : 'Digital Adopter';
      color = 'text-yellow-600';
      recommendations = [
        lang === 'hi' ? 'व्यापक CRM सिस्टम लागू करें' : 'Implement a comprehensive CRM system',
        lang === 'hi' ? 'ई-कॉमर्स प्लेटफ़ॉर्म सेट करें' : 'Set up an e-commerce platform',
        lang === 'hi' ? 'डिजिटल पेमेंट प्रोसेसिंग शुरू करें' : 'Digitize payment processing',
      ];
    } else {
      level = lang === 'hi' ? 'डिजिटल बिगिनर' : 'Digital Beginner';
      color = 'text-red-600';
      recommendations = [
        lang === 'hi' ? 'बेसिक अकाउंटिंग सॉफ़्टवेयर से शुरुआत करें' : 'Start with basic accounting software',
        lang === 'hi' ? 'वेबसाइट के साथ डिजिटल उपस्थिति बनाएं' : 'Create digital presence with a website',
        lang === 'hi' ? 'डिजिटल भुगतान तरीक़े अपनाएँ' : 'Implement digital payment methods',
      ];
    }
    return { score, level, color, recommendations };
  };

  const allAnswered = useMemo(
    () => Object.values(assessmentData).every((v) => !!v),
    [assessmentData]
  );

  // Modal state based on thresholds
  const [showOutcome, setShowOutcome] = useState<boolean>(false);
  const [outcomeTier, setOutcomeTier] = useState<'low'|'mid'|'high'|'none'>('none');

  // Trigger scoring when on last step and user clicks "Get Score"
  const handleFinish = () => {
    const res = computeScore(assessmentData);
    setAssessmentResult(res);

    // Animate 0 -> target score
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setAnimatedScore(0);
    const start = performance.now();
    const duration = 900; // ms

    const step = (ts: number) => {
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(eased * res.score);
      setAnimatedScore(val);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);

    // Decide outcome banner/modal
    if (res.score < 20) setOutcomeTier('low');
    else if (res.score <= 60) setOutcomeTier('mid');
    else setOutcomeTier('high');
    setShowOutcome(true);
  };

  const toggleCategory = (id: string) => setExpandedCategory(expandedCategory === id ? null : id);

  const fontClass = fontStep === -1 ? 'text-[15px]' : fontStep === 1 ? 'text-[19px]' : 'text-[17px]';
  const theme = contrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900';

  const RadioBlock: React.FC<{
    name: keyof AssessmentData;
    options: { value: string; label: string }[];
    label: string;
  }> = ({ name, options, label }) => (
    <div>
      <label className="block text-sm font-medium mb-3">{label}</label>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={assessmentData[name] === opt.value}
              onChange={(e) => setAssessmentData({ ...assessmentData, [name]: e.target.value })}
              className="mr-3 text-[#0F5BA7] focus:ring-[#0F5BA7]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Slider controls
  const stepPercent = Math.round(((currentStep) / totalQuestions) * 100);
  const donePercent = Math.round((Object.values(assessmentData).filter(Boolean).length / totalQuestions) * 100);

  // Circle progress ring
  const CIRC_R = 56; // radius
  const CIRC_C = 2 * Math.PI * CIRC_R; // circumference
  const ringOffset = CIRC_C - (animatedScore / 100) * CIRC_C;

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

        {/* Digital Readiness Assessment */}
        <section className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow border p-6 md:p-8 mb-12`}>
          <div className="text-center mb-6">
            <Monitor className="h-10 w-10 text-[#0F5BA7] mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">{t('assessH')}</h2>
            <p className="opacity-80">{t('assessSub')}</p>
          </div>

          {/* Linear progress over questions */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">{t('progress')}</span>
              <span className="opacity-80">{donePercent}%</span>
            </div>
            <div className={`${contrast ? 'bg-zinc-800' : 'bg-slate-200'} h-2 rounded`}>
              <div
                className="h-2 rounded bg-[#138808] transition-all"
                style={{ width: `${donePercent}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={donePercent}
                role="progressbar"
              />
            </div>
          </div>

          {/* Slider: show one question at a time until finished */}
          {!assessmentResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Question slider */}
              <div className="space-y-6">
                {currentStep === 0 && (
                  <RadioBlock
                    name="currentSystems"
                    label={t('q1')}
                    options={[
                      { value: 'advanced', label: t('q1a') },
                      { value: 'intermediate', label: t('q1b') },
                      { value: 'basic', label: t('q1c') },
                      { value: 'none', label: t('q1d') },
                    ]}
                  />
                )}
                {currentStep === 1 && (
                  <RadioBlock
                    name="digitalPresence"
                    label={t('q2')}
                    options={[
                      { value: 'advanced', label: t('q2a') },
                      { value: 'intermediate', label: t('q2b') },
                      { value: 'basic', label: t('q2c') },
                      { value: 'none', label: t('q2d') },
                    ]}
                  />
                )}
                {currentStep === 2 && (
                  <RadioBlock
                    name="paymentMethods"
                    label={t('q3')}
                    options={[
                      { value: 'advanced', label: t('q3a') },
                      { value: 'intermediate', label: t('q3b') },
                      { value: 'basic', label: t('q3c') },
                      { value: 'none', label: t('q3d') },
                    ]}
                  />
                )}
                {currentStep === 3 && (
                  <RadioBlock
                    name="dataManagement"
                    label={t('q4')}
                    options={[
                      { value: 'advanced', label: t('q4a') },
                      { value: 'intermediate', label: t('q4b') },
                      { value: 'basic', label: t('q4c') },
                      { value: 'none', label: t('q4d') },
                    ]}
                  />
                )}
                {currentStep === 4 && (
                  <RadioBlock
                    name="automation"
                    label={t('q5')}
                    options={[
                      { value: 'advanced', label: t('q5a') },
                      { value: 'intermediate', label: t('q5b') },
                      { value: 'basic', label: t('q5c') },
                      { value: 'none', label: t('q5d') },
                    ]}
                  />
                )}

                {/* Slider controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t('btnBack')}
                  </button>

                  {currentStep < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((s) => Math.min(totalQuestions - 1, s + 1))}
                      disabled={!assessmentData[questionKeys[currentStep]]}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#138808] text-white font-semibold disabled:bg-slate-300"
                    >
                      {t('btnNext')}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      disabled={!allAnswered}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#138808] text-white font-semibold disabled:bg-slate-300"
                    >
                      {t('btnScore')}
                    </button>
                  )}
                </div>

                {/* Step indicator mini bar */}
                <div className="mt-4">
                  <div className={`${contrast ? 'bg-zinc-800' : 'bg-slate-200'} h-1 rounded`}>
                    <div
                      className="h-1 rounded bg-[#0F5BA7] transition-all"
                      style={{ width: `${Math.min(100, Math.round(((currentStep + 1) / totalQuestions) * 100))}%` }}
                    />
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {currentStep + 1} / {totalQuestions}
                  </div>
                </div>
              </div>

              {/* Right: Placeholder/Hint */}
              <div className={`${contrast ? 'bg-zinc-900' : 'bg-slate-100'} p-8 rounded-xl h-full grid place-items-center`}>
                <div className="text-center">
                  <Monitor className={`h-14 w-14 ${contrast ? 'text-slate-500' : 'text-slate-400'} mx-auto mb-3`} />
                  <p className="opacity-80">{t('completePrompt')}</p>
                </div>
              </div>
            </div>
          ) : (
            // Result with animated ring
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-live="polite">
              <div className={`${contrast ? 'bg-zinc-950' : 'bg-gradient-to-br from-blue-50 to-purple-50'} p-6 md:p-8 rounded-xl border-2 border-blue-200 h-full`}>
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    {/* Outer ring container */}
                    <svg width="160" height="160" className="mx-auto mb-4" role="img" aria-label={`${animatedScore} / 100`}>
                      {/* Background circle */}
                      <circle
                        cx="80" cy="80" r={CIRC_R}
                        stroke={contrast ? '#27272a' : '#e5e7eb'}
                        strokeWidth="12"
                        fill="none"
                      />
                      {/* Progress ring */}
                      <circle
                        cx="80" cy="80" r={CIRC_R}
                        stroke="#0F5BA7"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={CIRC_C}
                        strokeDashoffset={ringOffset}
                        transform="rotate(-90 80 80)"
                        className="transition-[stroke-dashoffset] duration-200"
                      />
                      {/* Inner solid circle to show score & color aura */}
                      <circle
                        cx="80" cy="80" r="44"
                        fill={assessmentResult!.color.includes('green') ? '#dcfce7'
                          : assessmentResult!.color.includes('blue') ? '#dbeafe'
                          : assessmentResult!.color.includes('yellow') ? '#fef9c3'
                          : '#fee2e2'}
                      />
                      <text x="80" y="86" textAnchor="middle" fontSize="28" fontWeight="700"
                        fill={assessmentResult!.color.includes('green') ? '#16a34a'
                          : assessmentResult!.color.includes('blue') ? '#2563eb'
                          : assessmentResult!.color.includes('yellow') ? '#ca8a04'
                          : '#dc2626'}>
                        {animatedScore}
                      </text>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{t('scoreH')}</h3>
                  <p className={`text-lg font-semibold ${assessmentResult!.color}`}>{assessmentResult!.level}</p>
                </div>

                <div className={`${contrast ? 'bg-zinc-900' : 'bg-white'} p-6 rounded-lg shadow-sm border`}>
                  <h4 className="font-semibold mb-3">{t('nextSteps')}</h4>
                  <ul className="space-y-3">
                    {assessmentResult!.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#138808] mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t text-center">
                    <Star className="h-7 w-7 text-amber-400 mx-auto mb-2" />
                    <p className="text-sm opacity-80">{lang === 'hi' ? 'अगला कदम उठाने के लिए नीचे दिए समाधान देखें।' : 'Ready to take the next step? Explore solutions below.'}</p>
                  </div>
                </div>
              </div>

              {/* Right: Summary of answers */}
              <div className={`${contrast ? 'bg-zinc-900' : 'bg-white'} p-6 md:p-8 rounded-xl border h-full`}>
                <h4 className="text-lg font-bold mb-4">Summary</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li><span className="font-semibold">Q1:</span> {assessmentData.currentSystems || '-'}</li>
                  <li><span className="font-semibold">Q2:</span> {assessmentData.digitalPresence || '-'}</li>
                  <li><span className="font-semibold">Q3:</span> {assessmentData.paymentMethods || '-'}</li>
                  <li><span className="font-semibold">Q4:</span> {assessmentData.dataManagement || '-'}</li>
                  <li><span className="font-semibold">Q5:</span> {assessmentData.automation || '-'}</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Technology Solutions */}
        <section>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('solutionsH')}</h2>
            <p className="opacity-80">{t('solutionsSub')}</p>
          </div>

          <div className="space-y-6">
            {technologyCategories.map((cat) => (
              <article key={cat.id} className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-xl border shadow-sm overflow-hidden`}>
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                  aria-expanded={expandedCategory === cat.id}
                  aria-controls={`panel-${cat.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${cat.accent} w-12 h-12 rounded-lg grid place-items-center`}>
                        <cat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold">{cat.title}</h3>
                        <p className="opacity-80">{cat.description}</p>
                      </div>
                    </div>
                    {expandedCategory === cat.id ? (
                      <ChevronUp className="h-6 w-6 opacity-60" />
                    ) : (
                      <ChevronDown className="h-6 w-6 opacity-60" />
                    )}
                  </div>
                </button>

                {expandedCategory === cat.id && (
                  <div id={`panel-${cat.id}`} className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      {cat.solutions.map((s, i) => (
                        <div key={i} className={`${contrast ? 'bg-zinc-950' : 'bg-slate-50'} p-4 rounded-lg`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{s.name}</h4>
                            <span className="text-sm font-medium text-[#0F5BA7]">{s.price}</span>
                          </div>
                          <p className="text-sm opacity-80 mb-3">{s.description}</p>
                          <button className="text-[#0F5BA7] hover:underline font-medium text-sm">
                            {cat.id === 'erp-crm' ? (lang === 'hi' ? 'डेमो का अनुरोध करें' : 'Request a Demo') : cat.id === 'ecommerce' ? (lang === 'hi' ? 'नि:शुल्क परामर्श लें' : 'Get a Free Consultation') : (lang === 'hi' ? 'इंटीग्रेशन देखें' : 'See Integrations')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Outcome Modal */}
      {showOutcome && assessmentResult && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowOutcome(false)} />
          <div className={`${contrast ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900'} relative z-[61] w-[95%] max-w-md rounded-2xl shadow-xl border p-6`}>
            <button
              aria-label={t('close')}
              className="absolute right-3 top-3 p-2 rounded hover:bg-slate-100 text-slate-600"
              onClick={() => setShowOutcome(false)}
            >
              <X className="h-4 w-4" />
            </button>

            {outcomeTier === 'low' && (
              <>
                <h3 className="text-xl font-bold mb-2">{t('modalLowH')}</h3>
                <p className="opacity-80 mb-5">{t('modalLowB')}</p>
                <div className="flex gap-3">
                  <a href="/clusters" className="px-4 py-2 rounded-lg bg-[#0F5BA7] text-white font-semibold">{t('modalFindCenter')}</a>
                  <button className="px-4 py-2 rounded-lg border font-semibold" onClick={() => setShowOutcome(false)}>{t('close')}</button>
                </div>
              </>
            )}

            {outcomeTier === 'mid' && (
              <>
                <h3 className="text-xl font-bold mb-2">{t('modalMidH')}</h3>
                <p className="opacity-80 mb-5">{t('modalMidB')}</p>
                <div className="flex gap-3">
                  <a href="/udyam" className="px-4 py-2 rounded-lg bg-[#138808] text-white font-semibold">{t('modalStartGuided')}</a>
                  <button className="px-4 py-2 rounded-lg border font-semibold" onClick={() => setShowOutcome(false)}>{t('close')}</button>
                </div>
              </>
            )}

            {outcomeTier === 'high' && (
              <>
                <h3 className="text-xl font-bold mb-2">{t('modalHighH')}</h3>
                <p className="opacity-80 mb-5">{t('modalHighB')}</p>
                <div className="flex gap-3">
                  <a href="/journey" className="px-4 py-2 rounded-lg bg-[#0F5BA7] text-white font-semibold">{t('modalContinue')}</a>
                  <button className="px-4 py-2 rounded-lg border font-semibold" onClick={() => setShowOutcome(false)}>{t('close')}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnologyHub;
