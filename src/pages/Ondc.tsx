import React, { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Network,
  BadgeCheck,
  Rocket,
  Search,
  Filter,
  Clock,
  Globe,
  Truck,
  Store,
  CreditCard,
  Users,
  Shield,
  Play,
  Download,
  ArrowRight,
  X,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Onboarding" | "Catalog & Listing" | "Logistics & Fulfillment" | "Payments & Settlements" | "Seller Tools";
  durationHrs: number;
  badges: string[];
  short: string;
  highlights: string[];
  ctaUrl?: string; // optional external URL to ONDC content
  heroImg: string;
};

const ALL_CATEGORIES: Course["category"][] = [
  "Onboarding",
  "Catalog & Listing",
  "Logistics & Fulfillment",
  "Payments & Settlements",
  "Seller Tools",
];

const MOCK_COURSES: Course[] = [
  {
    id: "onb-101",
    title: "ONDC Seller Onboarding 101",
    level: "Beginner",
    category: "Onboarding",
    durationHrs: 2,
    badges: ["Free", "Certificate"],
    short: "Step-by-step guide to join ONDC as a seller and connect to a Seller App.",
    highlights: [
      "Understand the ONDC network model (Buyer App ↔ Gateway ↔ Seller App)",
      "Documentation checklist for Delhi MSMEs",
      "Sandbox → Production go-live path",
    ],
    heroImg:
      "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=800&h=420&fit=crop",
  },
  {
    id: "cat-201",
    title: "Smart Catalog & Listing on ONDC",
    level: "Intermediate",
    category: "Catalog & Listing",
    durationHrs: 3,
    badges: ["Popular"],
    short: "Create compliant product catalogs, variants, and attributes that rank and convert.",
    highlights: [
      "ONDC taxonomy & attributes mapping",
      "Photos, titles & SEO for network search",
      "Bulk upload & frequent price updates",
    ],
    heroImg:
      "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800&h=420&fit=crop",
  },
  {
    id: "log-210",
    title: "Logistics & Fulfillment Playbook",
    level: "Intermediate",
    category: "Logistics & Fulfillment",
    durationHrs: 2.5,
    badges: ["Hands-on"],
    short: "Choose and integrate logistics partners; master SLAs and returns.",
    highlights: [
      "Compare intra-city vs inter-city options",
      "SLA dashboards, returns & RTO reduction",
      "Cold chain & fragile goods tips",
    ],
    heroImg:
      "https://images.pexels.com/photos/5025669/pexels-photo-5025669.jpeg?auto=compress&cs=tinysrgb&w=800&h=420&fit=crop",
  },
  {
    id: "pay-160",
    title: "Payments, Settlements & Reconciliation",
    level: "Beginner",
    category: "Payments & Settlements",
    durationHrs: 1.5,
    badges: ["Finance"],
    short: "Understand network payments, T+ settlement cycles, and automated recon.",
    highlights: [
      "UPI & PG flows in ONDC",
      "T+N settlement timelines & disputes",
      "Reconciliation templates you can reuse",
    ],
    heroImg:
      "https://images.pexels.com/photos/4968633/pexels-photo-4968633.jpeg?auto=compress&cs=tinysrgb&w=800&h=420&fit=crop",
  },
  {
    id: "tools-330",
    title: "Seller App Tools & Order Ops",
    level: "Advanced",
    category: "Seller Tools",
    durationHrs: 4,
    badges: ["Advanced", "Ops"],
    short: "Deep dive into Seller App features, order states, messaging & metrics.",
    highlights: [
      "Order lifecycle & network callbacks",
      "Serviceability, inventory, pricing APIs (vendor side)",
      "Operations dashboard & alerts",
    ],
    heroImg:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=420&fit=crop",
  },
];

const ONDCAcademy: React.FC = () => {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [showPreview, setShowPreview] = useState<null | Course>(null);
  const [advisorOpen, setAdvisorOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((c) => {
      const matchesQ =
        !q ||
        c.title.toLowerCase().includes(q.toLowerCase()) ||
        c.short.toLowerCase().includes(q.toLowerCase());
      const matchesCat = !category || c.category === category;
      const matchesLvl = !level || c.level === level;
      return matchesQ && matchesCat && matchesLvl;
    });
  }, [q, category, level]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-700" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-white">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
              <Network className="h-4 w-4" />
              <span className="text-sm opacity-90">Powered by ONDC Integration</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              ONDC Academy
              <span className="block text-green-300">Learn. Integrate. Grow.</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Bring ONDC’s established learning to your own portal. Curated courses, Delhi-MSME-focused playbooks,
              and hands-on workflows—right where your users already are.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#courses"
                className="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover-glow inline-flex items-center gap-2"
              >
                <GraduationCap className="h-5 w-5" />
                Browse Courses
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setAdvisorOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      </section>

      {/* How it plugs into your site */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Integrates</h2>
            <p className="text-lg text-gray-600">
              Seamlessly embed ONDC’s learning inside your platform while keeping your brand front-and-center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-5">
                <Store className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Single Sign-On</h3>
              <p className="text-gray-600">
                Authenticate users via your app; auto-provision learner profiles and track progress without leaving your
                ecosystem.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-5">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Embedded Courses</h3>
              <p className="text-gray-600">
                Pull course tiles, metadata, and completions into your UI via widgets/APIs; deep-link to ONDC modules.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center mb-5">
                <BadgeCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track & Certify</h3>
              <p className="text-gray-600">
                Surface completion, badges, and SLA-readiness in your dashboards; unlock Finance/Market/Tech perks on completion.
              </p>
            </div>
          </div>

          {/* Cross-app nudges */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/finance"
              className="group bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">Finish “Payments & Settlements”</p>
                <p className="text-sm text-gray-600">Auto-qualify for Finance Hub offers</p>
              </div>
              <CreditCard className="h-6 w-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/market-linkage"
              className="group bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">Ace “Smart Catalog & Listing”</p>
                <p className="text-sm text-gray-600">Boost buyer discovery & conversion</p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/technology"
              className="group bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:bg-yellow-100 transition-colors flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">Complete “Seller App Tools”</p>
                <p className="text-sm text-gray-600">Unlock tech upgrade recommendations</p>
              </div>
              <Building2 className="h-6 w-6 text-yellow-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Finder */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Courses from ONDC</h2>
            <p className="text-lg text-gray-600">Search, filter, and enroll—right from your portal.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search courses, topics, or skills…"
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Category</span>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {ALL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Level</span>
                </div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <img src={c.heroImg} alt={c.title} className="w-full h-44 object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full border">
                      {c.level}
                    </span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{c.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                  <p className="text-gray-600 mt-2">{c.short}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <div className="inline-flex items-center gap-1 text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      <Clock className="h-4 w-4" /> {c.durationHrs} hrs
                    </div>
                    {c.badges.map((b) => (
                      <span key={b} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {c.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowPreview(c)}
                      className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2.5 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Preview
                    </button>
                    <a
                      href={c.ctaUrl || "#"}
                      onClick={(e) => {
                        if (!c.ctaUrl) e.preventDefault();
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2"
                    >
                      <GraduationCap className="h-4 w-4" />
                      Enroll
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="md:col-span-2 bg-white p-10 rounded-xl shadow text-center">
                <p className="text-gray-600">No courses match your filters. Try clearing them.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Delhi MSME Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why It Matters for Delhi MSMEs</h2>
            <p className="text-lg text-gray-600">
              Practical outcomes you can unlock by completing relevant ONDC tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wider Buyer Reach</h3>
              <p className="text-gray-700">
                Tap into network demand beyond marketplaces; improve discovery through better listings.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cheaper Logistics</h3>
              <p className="text-gray-700">
                Optimize lane selection and reduce RTO with ONDC-aligned logistics partners and SLAs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Faster Settlements</h3>
              <p className="text-gray-700">
                Understand T+ cycles and streamline reconciliation—helps with Finance Hub eligibility.
              </p>
            </div>
          </div>

          {/* Resource strip */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="#"
              className="bg-white rounded-xl shadow p-6 border hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-between"
              onClick={(e) => e.preventDefault()}
            >
              <div>
                <p className="font-semibold text-gray-900">Download ONDC Readiness Checklist</p>
                <p className="text-sm text-gray-600">Docs, GST, FSSAI, packaging & more</p>
              </div>
              <Download className="h-5 w-5 text-gray-600" />
            </a>
            <Link
              to="/market-linkage"
              className="bg-white rounded-xl shadow p-6 border hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">Preferred Seller Profile Tips</p>
                <p className="text-sm text-gray-600">Get discovered by buyers faster</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
            <Link
              to="/finance"
              className="bg-white rounded-xl shadow p-6 border hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">Access Working Capital</p>
                <p className="text-sm text-gray-600">Use certificates to unlock offers</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers for your team and sellers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Do I learn on this site or on ONDC?",
                a: "You browse and track courses here, and each module opens inside our portal or deep-links to ONDC content. Progress and badges sync back.",
              },
              {
                q: "Is there a fee for the courses?",
                a: "Many foundational courses are free. Some advanced/vendor-specific tracks may be paid—your dashboard will show pricing if applicable.",
              },
              {
                q: "Will this help with finance or market access?",
                a: "Yes. Completing payments/catalog/logistics tracks improves your readiness score—used by Finance Hub and Market Linkage for perks.",
              },
              {
                q: "How long does onboarding take?",
                a: "Beginner tracks are 1–3 hours each. Most MSMEs can become ONDC-ready within 1–2 weeks with steady progress.",
              },
            ].map((f, i) => (
              <details
                key={i}
                className="bg-white rounded-xl p-6 shadow border open:shadow-lg open:-translate-y-0.5 transition-all"
              >
                <summary className="cursor-pointer font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-3 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor Modal */}
      {advisorOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setAdvisorOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Talk to an Advisor</h3>
            <p className="text-gray-600 mb-4">
              Get a tailored ONDC learning plan and go-live checklist for your business.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAdvisorOpen(false);
                alert("Thanks! Our advisor will reach out soon.");
              }}
              className="space-y-3"
            >
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                required
              />
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                required
              />
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                placeholder="Tell us about your product category and logistics setup"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover-glow"
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden">
            <div className="relative">
              <img src={showPreview.heroImg} alt="" className="w-full h-56 object-cover" />
              <button
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
                onClick={() => setShowPreview(null)}
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full border">
                  {showPreview.level}
                </span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {showPreview.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">{showPreview.title}</h3>
              <p className="text-gray-600 mt-2">{showPreview.short}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1 text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  <Clock className="h-4 w-4" /> {showPreview.durationHrs} hrs
                </div>
                {showPreview.badges.map((b) => (
                  <span key={b} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              <h4 className="mt-6 font-semibold text-gray-900">What you'll learn</h4>
              <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {showPreview.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Rocket className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={showPreview.ctaUrl || "#"}
                  onClick={(e) => {
                    if (!showPreview.ctaUrl) e.preventDefault();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all text-center"
                >
                  Enroll on ONDC
                </a>
                <button
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold transition-all"
                  onClick={() => setShowPreview(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ONDCAcademy;
