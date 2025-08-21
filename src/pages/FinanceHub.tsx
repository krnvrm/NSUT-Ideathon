import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Users, CreditCard, Building, ArrowRight, DollarSign, Info, Banknote, ExternalLink } from 'lucide-react';

interface FormData {
  turnover: string;             // numeric string
  yearsInBusiness: string;      // '0' | '1' | '3' | '5'
  industry: string;             // manufacturing | textiles | auto | electronics | food | service
  employees: string;
}

interface Result {
  eligibleAmount: number;
  loanTypes: string[];
  message: string;
}

type SchemeRow = Record<string, string>;

// --- synonyms used for fuzzy industry matching against CSV fields ---
const INDUSTRY_SYNONYMS: Record<string, string[]> = {
  manufacturing: ['manufacturing','mfg','factory','plant','production','industrial','unit','workshop'],
  textiles: ['textile','textiles','garment','apparel','fabric','weaving','knitwear','hosiery','dyeing'],
  auto: ['auto','automotive','vehicle','component','ancillary','tier','oem','parts'],
  electronics: ['electronics','electronic','device','pcb','appliance','hardware','component'],
  food: ['food','f&b','agri','agro','processing','packaging','beverage','dairy','bakery'],
  service: ['service','services','it','software','consult','repair','hospitality','restaurant','hotel','salon'],
};

const FinanceHub: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    turnover: '',
    yearsInBusiness: '',
    industry: '',
    employees: '',
  });

  const [result, setResult] = useState<Result | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });

  // CSV state
  const [schemes, setSchemes] = useState<SchemeRow[]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [bestScheme, setBestScheme] = useState<SchemeRow | null>(null);

  // i18n + UI prefs
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contrast, setContrast] = useState(false);
  const [fontStep, setFontStep] = useState<-1 | 0 | 1>(0);
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
        titleA: 'Finance Hub',
        titleB: 'Eligibility & Options',
        subtitle: 'Estimate indicative eligibility and discover suitable funding routes — including government-linked schemes.',
        calcTitle: 'Eligibility Calculator',
        calcSub: 'Fill the details below to view an indicative amount.',
        turnover: 'Annual Turnover (₹)',
        turnoverHelp: 'Enter last FY turnover (approx.).',
        years: 'Years in Business',
        yearsOpt0: 'Less than 1 year',
        yearsOpt1: '1–2 years',
        yearsOpt3: '2–5 years',
        yearsOpt5: '5+ years',
        industry: 'Industry',
        employees: 'Number of Employees',
        selectYears: 'Select years',
        selectIndustry: 'Select industry',
        selectEmployees: 'Select range',
        mfg: 'Manufacturing',
        textiles: 'Textiles',
        auto: 'Auto Components',
        electronics: 'Electronics',
        food: 'Food Processing',
        services: 'Services',
        emp1: '1–10',
        emp2: '11–50',
        emp3: '51–100',
        emp4: '100+',
        btnCalc: 'Calculate Eligibility',
        disclaimer: 'This is an indicative estimator. Final eligibility depends on lender policies, documentation, credit bureau checks, and collateral/guarantees where applicable.',
        resTitle: 'Indicative Result',
        resLine: 'You may be eligible for up to',
        recTypes: 'Recommended loan types',
        linkApply: 'Apply via JanSamarth',
        linkAdvisor: 'Connect with Advisor',
        emptyPrompt: 'Fill in the details to see your indicative eligibility.',
        optionsH: 'Financing Options',
        optionsSub: 'Explore a range of solutions that MSMEs commonly use',
        learnMore: 'Learn More',
        invalidTurnover: 'Please enter a valid annual turnover.',
        basedOn: 'Based on your details, these options may fit.',
        schemeH: 'Highlighted Government Scheme',
        schemeBest: 'Best fit based on your profile',
        schemeFallback: 'We could not match a specific scheme from the CSV. Showing a popular government option.',
        roi: 'Interest (APR approx.)',
        maxLoan: 'Max Loan Amount',
        bank: 'Bank / Scheme',
        openDetails: 'Open Details',
        industryTag: 'Industry',
      },
      hi: {
        titleA: 'वित्त केंद्र',
        titleB: 'पात्रता व विकल्प',
        subtitle: 'सरकारी जुड़ी योजनाओं सहित उपयुक्त वित्त विकल्प खोजें और अनुमानित पात्रता देखें।',
        calcTitle: 'पात्रता कैलकुलेटर',
        calcSub: 'अनुमानित राशि देखने के लिए नीचे विवरण भरें।',
        turnover: 'वार्षिक टर्नओवर (₹)',
        turnoverHelp: 'पिछले वित्त वर्ष का अनुमानित टर्नओवर दर्ज करें।',
        years: 'व्यवसाय में वर्षों की संख्या',
        yearsOpt0: '1 वर्ष से कम',
        yearsOpt1: '1–2 वर्ष',
        yearsOpt3: '2–5 वर्ष',
        yearsOpt5: '5+ वर्ष',
        industry: 'उद्योग',
        employees: 'कर्मचारियों की संख्या',
        selectYears: 'वर्ष चुनें',
        selectIndustry: 'उद्योग चुनें',
        selectEmployees: 'रेंज चुनें',
        mfg: 'मैन्युफैक्चरिंग',
        textiles: 'टेक्सटाइल्स',
        auto: 'ऑटो कंपोनेंट्स',
        electronics: 'इलेक्ट्रॉनिक्स',
        food: 'फूड प्रोसेसिंग',
        services: 'सेवाएँ',
        emp1: '1–10',
        emp2: '11–50',
        emp3: '51–100',
        emp4: '100+',
        btnCalc: 'पात्रता गणना करें',
        disclaimer: 'यह केवल एक सांकेतिक अनुमान है। अंतिम पात्रता ऋणदाता नीतियों, दस्तावेज़, क्रेडिट जाँच और गिरवी/गैरंटी पर निर्भर करेगी।',
        resTitle: 'सांकेतिक परिणाम',
        resLine: 'आप इतनी राशि तक पात्र हो सकते हैं',
        recTypes: 'अनुशंसित ऋण प्रकार',
        linkApply: 'जनसमर्थ के माध्यम से आवेदन करें',
        linkAdvisor: 'सलाहकार से संपर्क करें',
        emptyPrompt: 'अनुमानित पात्रता देखने हेतु विवरण भरें।',
        optionsH: 'वित्त विकल्प',
        optionsSub: 'एमएसएमई द्वारा सामान्यतः उपयोग किए जाने वाले समाधान',
        learnMore: 'और जानें',
        invalidTurnover: 'कृपया मान्य वार्षिक टर्नओवर दर्ज करें।',
        basedOn: 'आपके विवरण के आधार पर ये विकल्प उपयुक्त हो सकते हैं।',
        schemeH: 'सरकारी योजना (उपयुक्त)',
        schemeBest: 'आपकी प्रोफ़ाइल के अनुसार सर्वोत्तम',
        schemeFallback: 'CSV से उपयुक्त योजना नहीं मिल सकी। लोकप्रिय सरकारी विकल्प दिखाया जा रहा है।',
        roi: 'ब्याज (वार्षिक)',
        maxLoan: 'अधिकतम ऋण राशि',
        bank: 'बैंक / योजना',
        openDetails: 'विवरण खोलें',
        industryTag: 'उद्योग',
      },
    };
    return dict[lang][k];
  };

  // ---------- CSV LOADING ----------
  useEffect(() => {
    (async () => {
      try {
        let url: string | null = null;
        try {
          // Vite / modern bundlers
          // @ts-ignore
          const mod = await import('./msme_schemes_formatted.csv?url');
          url = (mod && (mod.default || mod)) as string;
        } catch {}
        if (!url) {
          try {
            // @ts-ignore
            url = new URL('./msme_schemes_formatted.csv', import.meta.url).toString();
          } catch {}
        }
        if (!url) url = '/msme_schemes_formatted.csv';

        const res = await fetch(url);
        const text = await res.text();
        const rows = parseCSV(text);
        setSchemes(rows);
      } catch (e) {
        setCsvError('Could not load schemes CSV');
      }
    })();
  }, []);

  // ---------- HELPERS ----------
  const inr = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  const parseINR = (v: string) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : NaN;
  };

  function parseMoneyLike(s?: string): number | null {
    if (!s) return null;
    let str = s.toLowerCase().replace(/[,₹\s]/g, '');
    const lakh = /([\d.]+)(?=lakh|lac)/.exec(s.toLowerCase());
    const cr = /([\d.]+)(?=crore|cr)/.exec(s.toLowerCase());
    if (lakh) return Math.round(parseFloat(lakh[1]) * 1e5);
    if (cr) return Math.round(parseFloat(cr[1]) * 1e7);
    const nums = s.replace(/[^0-9.]/g, ' ').trim().split(/\s+/).filter(Boolean);
    if (nums.length) {
      const maxi = Math.max(...nums.map((n) => parseFloat(n)).filter(Number.isFinite));
      return Number.isFinite(maxi) ? Math.round(maxi) : null;
    }
    const n = parseFloat(str);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  function parseRateLike(s?: string): number | null {
    if (!s) return null;
    const m = s.match(/(\d+(\.\d+)?)\s*%/);
    if (m) return parseFloat(m[1]);
    const n = parseFloat(s.replace(/[^\d.]/g, ''));
    return Number.isFinite(n) ? n : null;
  }

  const BANK_HINTS = ['sbi','state bank','punjab national','pnb','bank of baroda','canara','union bank','indian bank','bank of india'];
  const GOVT_HINTS = ['government','govt','cgtsme','cgtmse','mudra','pmmy','stand up india','jan samarth','jansamarth'];

  function getField(row: SchemeRow, names: string[]): string | undefined {
    const keys = Object.keys(row);
    const lowerMap: Record<string, string> = {};
    keys.forEach((k) => (lowerMap[k.toLowerCase()] = k));
    for (const n of names) {
      const f = Object.keys(lowerMap).find((k) => k.includes(n));
      if (f) return row[lowerMap[f]];
    }
    return undefined;
  }

  // --- fuzzy industry affinity (0..1) using synonyms Jaccard overlap vs combined CSV text
  function industryAffinity(formIndustry: string, row: SchemeRow): number {
    if (!formIndustry) return 0;
    const synonyms = (INDUSTRY_SYNONYMS[formIndustry] || [formIndustry]).map((s) => s.toLowerCase());
    const combined = [
      getField(row, ['sector','industry','category']),
      getField(row, ['scheme','name','title']),
      getField(row, ['type','segment']),
      getField(row, ['desc','description','about','details']),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const textTokens = new Set(combined.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean));
    const synTokens = new Set(synonyms.flatMap((s) => s.split(/\s+/)));

    const inter = [...synTokens].filter((t) => textTokens.has(t));
    const union = new Set([...synTokens, ...textTokens]);
    const jaccard = union.size ? inter.length / union.size : 0;

    // small boost if exact synonym substring appears
    const hasDirect = synonyms.some((s) => combined.includes(s)) ? 0.15 : 0;
    return Math.min(1, jaccard * 3 + hasDirect); // scale up a bit, cap at 1
  }

  function scoreScheme(row: SchemeRow, form: FormData, eligibleAmount: number): number {
    const schemeName = getField(row, ['scheme','name','title']) || '';
    const bankName = (getField(row, ['bank']) || getField(row, ['lender']) || '').toLowerCase();
    const typeText = (getField(row, ['type']) || getField(row, ['segment']) || '').toLowerCase();
    const desc = (getField(row, ['desc','description','about','details']) || '').toLowerCase();

    const maxAmt = parseMoneyLike(getField(row, ['max','limit','amount']));
    const rate = parseRateLike(getField(row, ['interest','roi','rate']));
    const yearsText = (getField(row, ['years','vintage','experience']) || '').toLowerCase();
    const yearsMinMatch = yearsText.match(/(\d+)\s*\+?\s*years?|min\s*(\d+)/);
    const yearsMin = yearsMinMatch ? parseInt(yearsMinMatch[1] || yearsMinMatch[2] || '0', 10) : 0;

    const years = parseInt(form.yearsInBusiness || '0', 10);

    let score = 0;

    // (A) Industry closeness drives the pick the most
    const indAff = industryAffinity(form.industry, row); // 0..1
    score += Math.round(indAff * 40); // up to +40

    // (B) Vintage fit
    score += years >= yearsMin ? 8 : -5;

    // (C) Amount fit
    if (maxAmt != null) score += eligibleAmount <= maxAmt ? 20 : -10;
    else score += 5;

    // (D) Rate — lower better
    if (rate != null) score += rate <= 9 ? 15 : rate <= 12 ? 10 : 5;

    // (E) Govt/Bank signal bonuses
    if (GOVT_HINTS.some((h) => typeText.includes(h) || desc.includes(h) || schemeName.toLowerCase().includes(h))) score += 10;
    if (BANK_HINTS.some((b) => bankName.includes(b))) score += 6;

    return score;
  }

  function findBestScheme(form: FormData, eligibleAmount: number): SchemeRow | null {
    if (!schemes.length) return null;
    const ranked = schemes
      .map((row) => ({ row, score: scoreScheme(row, form, eligibleAmount) }))
      .sort((a, b) => b.score - a.score);

    const top = ranked[0];
    if (!top) return null;
    if (top.score >= 15) return top.row;

    // fallback to a govt-ish option if overall scores are weak
    const fallback =
      ranked.find((s) =>
        GOVT_HINTS.some((h) => Object.values(s.row).some((v) => (v || '').toString().toLowerCase().includes(h)))
      )?.row || top.row;

    return fallback;
  }

  // ---------- CALC ----------
  const calculateEligibility = () => {
    const turnover = parseINR(formData.turnover);
    const years = parseInt(formData.yearsInBusiness || '0', 10);

    if (!Number.isFinite(turnover) || turnover <= 0) {
      setResult({ eligibleAmount: 0, loanTypes: [], message: t('invalidTurnover') });
      setBestScheme(null);
      return;
    }

    // Rule-of-thumb (kept from earlier): 25% of turnover, capped at ₹50 lakh; tenure bonus
    let baseAmount = Math.min(turnover * 0.25, 50_00_000);
    if (years >= 5) baseAmount *= 1.5;
    else if (years >= 2) baseAmount *= 1.2;

    const eligibleAmount = Math.round(Math.max(0, baseAmount));

    const loanTypes: string[] = [];
    if (turnover >= 10_00_000) loanTypes.push('Working Capital Loan');
    if (years >= 2) loanTypes.push('Term Loan');
    if (formData.industry && formData.industry !== 'service') loanTypes.push('Equipment Financing');
    loanTypes.push('Government Schemes');

    const picked = findBestScheme(formData, eligibleAmount);

    setResult({
      eligibleAmount,
      loanTypes,
      message: eligibleAmount > 0 ? t('basedOn') : t('invalidTurnover'),
    });
    setBestScheme(picked || null);
  };

  // ---------- UI data ----------
  const financingOptions = [
    {
      title: 'Invoice Discounting',
      description: 'Convert your unpaid invoices into immediate working capital',
      icon: FileText,
      details: 'Get up to ~90% of invoice value from partnered financiers. Best for B2B receivables.',
      accent: 'bg-[#0F5BA7]',
    },
    {
      title: 'Peer-to-Peer Lending',
      description: 'Connect with regulated P2P platforms and institutional lenders',
      icon: Users,
      details: 'Market-linked rates and flexible terms. Subject to platform and RBI norms.',
      accent: 'bg-[#138808]',
    },
    {
      title: 'Government Loan Schemes',
      description: 'Explore MUDRA, CGTMSE, Stand-Up India, and more',
      icon: Building,
      details: 'Discover subsidised or credit-guaranteed options via JanSamarth and other portals.',
      accent: 'bg-[#FF9933]',
    },
    {
      title: 'Working Capital Loans',
      description: 'Smooth day-to-day operations with revolving limits',
      icon: CreditCard,
      details: 'Use for inventory, payroll, and utilities. Tenors and limits vary by lender.',
      accent: 'bg-amber-500',
    },
  ];

  const fontClass = fontStep === -1 ? 'text-[15px]' : fontStep === 1 ? 'text-[19px]' : 'text-[17px]';
  const theme = contrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900';

  const industryDisplayName = (key: string) => {
    const map: Record<string, string> = {
      manufacturing: lang === 'hi' ? t('mfg') : 'Manufacturing',
      textiles: t('textiles'),
      auto: t('auto'),
      electronics: t('electronics'),
      food: t('food'),
      service: t('services'),
    };
    return map[key] || key;
  };

  const renderSchemeCard = (row: SchemeRow) => {
    const name = getField(row, ['scheme','name','title']) || 'Government Scheme';
    const bank = getField(row, ['bank']) || getField(row, ['lender']) || '—';
    const rate = parseRateLike(getField(row, ['interest','roi','rate']));
    const maxAmt = parseMoneyLike(getField(row, ['max','limit','amount']));
    const link = getField(row, ['link','url','apply','details']);

    return (
      <div className={`${contrast ? 'bg-zinc-900' : 'bg-white'} border rounded-lg p-5 mt-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-70">{t('schemeBest')}</p>
            <h4 className="text-lg font-bold">{name}</h4>
            <p className="text-sm mt-1"><span className="font-medium">{t('bank')}:</span> {bank}</p>
            {/* instead of CSV "eligibility"/"description", show the selected industry */}
            {formData.industry && (
              <div className="mt-2 inline-flex items-center gap-2 text-xs">
                <span className="opacity-70">{t('industryTag')}:</span>
                <span className="px-2 py-0.5 rounded-full border bg-slate-50">
                  {industryDisplayName(formData.industry)}
                </span>
              </div>
            )}
          </div>
          <Banknote className="h-8 w-8 text-emerald-600 shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="rounded-lg border p-3">
            <p className="text-xs opacity-70">{t('roi')}</p>
            <p className="text-base font-semibold">{rate != null ? `${rate}%` : '—'}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs opacity-70">{t('maxLoan')}</p>
            <p className="text-base font-semibold">{maxAmt != null ? `₹${inr(maxAmt)}` : '—'}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs opacity-70">{t('resLine')}</p>
            <p className="text-base font-semibold">₹{inr(result?.eligibleAmount || 0)}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/jansamarth" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 bg-white hover:bg-slate-50">
            {t('linkApply')} <ArrowRight className="h-4 w-4" />
          </Link>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white">
              {t('openDetails')} <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme} ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-center">
            <span className="block text-slate-900 ">{t('titleA')}</span>
            <span className="block text-[#0F5BA7]">{t('titleB')}</span>
          </h1>
          <p className="text-base md:text-lg opacity-80 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Calculator */}
        <section className={`${contrast ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow border p-6 md:p-8 mb-12`}>
          <div className="text-center mb-6">
            <Calculator className="h-10 w-10 text-[#0F5BA7] mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">{t('calcTitle')}</h2>
            <p className="opacity-80">{t('calcSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">{t('turnover')}</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={formData.turnover}
                  onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                  placeholder="e.g., 2500000"
                  aria-describedby="turnover-help"
                />
                <p id="turnover-help" className="text-xs opacity-70 mt-1">{t('turnoverHelp')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('years')}</label>
                <select
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('selectYears')}</option>
                  <option value="0">{t('yearsOpt0')}</option>
                  <option value="1">{t('yearsOpt1')}</option>
                  <option value="3">{t('yearsOpt3')}</option>
                  <option value="5">{t('yearsOpt5')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('industry')}</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('selectIndustry')}</option>
                  <option value="manufacturing">{t('mfg')}</option>
                  <option value="textiles">{t('textiles')}</option>
                  <option value="auto">{t('auto')}</option>
                  <option value="electronics">{t('electronics')}</option>
                  <option value="food">{t('food')}</option>
                  <option value="service">{t('services')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('employees')}</label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] focus:border-transparent bg-white text-slate-900"
                >
                  <option value="">{t('selectEmployees')}</option>
                  <option value="1-10">{t('emp1')}</option>
                  <option value="11-50">{t('emp2')}</option>
                  <option value="51-100">{t('emp3')}</option>
                  <option value="100+">{t('emp4')}</option>
                </select>
              </div>

              <button
                onClick={calculateEligibility}
                disabled={!formData.turnover || !formData.yearsInBusiness || !formData.industry}
                className="w-full bg-[#138808] hover:bg-green-700 disabled:bg-slate-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="h-5 w-5" />
                <span>{t('btnCalc')}</span>
              </button>

              <div className="flex items-start gap-2 text-xs opacity-80">
                <Info className="h-4 w-4 mt-0.5" />
                <p>{t('disclaimer')}</p>
              </div>

              {csvError && <p className="text-xs text-red-600 mt-2">{csvError}</p>}
            </div>

            {/* Right: Result */}
            <div aria-live="polite">
              {result ? (
                <div className={`${contrast ? 'bg-zinc-950' : 'bg-gradient-to-br from-blue-50 to-green-50'} p-6 md:p-8 rounded-xl border-2 border-blue-200`}>
                  <div className="text-center mb-5">
                    <DollarSign className="h-14 w-14 text-[#138808] mx-auto mb-3" />
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{t('resTitle')}</h3>
                    <p className="opacity-80">{result.message}</p>
                  </div>

                  <div className={`${contrast ? 'bg-zinc-900' : 'bg-white'} p-5 rounded-lg shadow-sm border`}>
                    <div className="text-center mb-4">
                      <p className="text-xs opacity-80">{t('resLine')}</p>
                      <p className="text-3xl font-extrabold text-[#138808]">₹{inr(result.eligibleAmount)}</p>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold mb-2">{t('recTypes')}</p>
                      <div className="flex flex-wrap gap-2">
                        {result.loanTypes.map((type, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs bg-slate-100 border">{type}</span>
                        ))}
                      </div>
                    </div>

                    {/* Highlighted Scheme from CSV */}
                    <div className="mt-6">
                      <h4 className="text-lg font-bold mb-1">{t('schemeH')}</h4>
                      {!bestScheme && <p className="text-sm opacity-80">{t('schemeFallback')}</p>}
                      {bestScheme && renderSchemeCard(bestScheme)}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <Link to="/jansamarth" className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 bg-white hover:bg-slate-50">
                        {t('linkApply')} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button onClick={() => setShowContactForm(true)} className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white">
                        {t('linkAdvisor')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${contrast ? 'bg-zinc-900' : 'bg-slate-100'} p-8 rounded-xl flex items-center justify-center h-full min-h-[220px]`}>
                  <div className="text-center">
                    <Calculator className={`h-12 w-12 ${contrast ? 'text-slate-500' : 'text-slate-400'} mx-auto mb-3`} />
                    <p className="opacity-80">{t('emptyPrompt')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('optionsH')}</h2>
            <p className="opacity-80">{t('optionsSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: 'Invoice Discounting',
                description: 'Convert your unpaid invoices into immediate working capital',
                icon: FileText,
                details: 'Get up to ~90% of invoice value from partnered financiers. Best for B2B receivables.',
                accent: 'bg-[#0F5BA7]',
              },
              {
                title: 'Peer-to-Peer Lending',
                description: 'Connect with regulated P2P platforms and institutional lenders',
                icon: Users,
                details: 'Market-linked rates and flexible terms. Subject to platform and RBI norms.',
                accent: 'bg-[#138808]',
              },
              {
                title: 'Government Loan Schemes',
                description: 'Explore MUDRA, CGTMSE, Stand-Up India, and more',
                icon: Building,
                details: 'Discover subsidised or credit-guaranteed options via JanSamarth and other portals.',
                accent: 'bg-[#FF9933]',
              },
              {
                title: 'Working Capital Loans',
                description: 'Smooth day-to-day operations with revolving limits',
                icon: CreditCard,
                details: 'Use for inventory, payroll, and utilities. Tenors and limits vary by lender.',
                accent: 'bg-amber-500',
              },
            ].map((option, index) => (
              <article key={index} className={`${contrast ? 'bg-zinc-900' : 'bg-white'} group relative rounded-xl border shadow-sm p-6 overflow-hidden`}>
                <div className={`${option.accent} absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-10`} />
                <div className="flex items-start gap-4 relative">
                  <div className={`${option.accent} w-12 h-12 rounded-full grid place-items-center shrink-0`}>
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">{option.title}</h3>
                    <p className="opacity-80 mt-1">{option.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p>{option.details}</p>
                </div>
                <div className="mt-5">
                  <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border bg-white hover:bg-slate-50">
                    {t('learnMore')} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Advisory contact modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${contrast ? 'bg-zinc-900 text-white' : 'bg-white text-slate-900'} rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl`}>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t('linkAdvisor')}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thanks! An advisor will review your details and reach out.');
                  setShowContactForm(false);
                  setContactData({ name: '', email: '', phone: '', message: '' });
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder={lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7]"
                  required
                />
                <input
                  type="email"
                  placeholder={lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7]"
                  required
                />
                <input
                  type="tel"
                  placeholder={lang === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7]"
                  required
                />
                <textarea
                  placeholder={lang === 'hi' ? 'हम कैसे मदद कर सकते हैं?' : 'How can we help you?'}
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0F5BA7] h-24 resize-none"
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowContactForm(false)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-lg font-semibold">
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button type="submit" className="flex-1 bg-[#0F5BA7] hover:bg-[#0B3B6F] text-white py-3 rounded-lg font-semibold">
                    {lang === 'hi' ? 'जमा करें' : 'Submit'}
                  </button>
                </div>
                <p className="text-[11px] opacity-70 mt-2">{t('disclaimer')}</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Minimal CSV parser (handles quotes, commas, newlines) ----------
function parseCSV(text: string): SchemeRow[] {
  const rows: string[][] = [];
  let i = 0, field = '', row: string[] = [], inQuotes = false;

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; } // escaped quote
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }

    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); field = ''; row = []; i++; continue;
    }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }

  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  const out: SchemeRow[] = [];
  for (let r = 1; r < rows.length; r++) {
    const obj: SchemeRow = {};
    headers.forEach((h, idx) => (obj[h] = (rows[r][idx] ?? '').trim()));
    if (Object.values(obj).some((v) => v && v.length)) out.push(obj);
  }
  return out;
}

export default FinanceHub;
